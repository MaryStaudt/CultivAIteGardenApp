const OPENAI_URL = "https://api.openai.com/v1/responses";
const OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4.1-mini";
const FALLBACK_MODEL = "gpt-4o-mini";

function sendJson(response, status, body) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 120000) {
        reject(new Error("Request is too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function compactContext(context = {}) {
  const plot = context.activePlot || {};
  const climate = context.climate || {};
  const extension = context.extension || {};
  const assessment = context.assessment || {};
  const plants = Array.isArray(plot.plants) ? plot.plants : [];

  return {
    zip: context.zip,
    plannerZip: context.plannerZip,
    zipSource: context.zipSource,
    usdaZone: climate.zone,
    lastFrost: climate.frost,
    localGuidanceSource: extension.source,
    localGuidanceNote: extension.note,
    plot: {
      name: plot.name,
      sizeFeet: `${plot.width} x ${plot.length}`,
      goal: plot.goal,
      sunExposure: plot.sunExposure,
      sunDirection: plot.sunDirection,
      soilProfile: plot.soilProfile,
      plants: plants.slice(0, 30)
    },
    gardenChecks: {
      density: assessment.density,
      warnings: Array.isArray(assessment.warnings) ? assessment.warnings.slice(0, 8) : [],
      strengths: Array.isArray(assessment.wins) ? assessment.wins.slice(0, 8) : []
    }
  };
}

function extractAnswer(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  if (typeof data.text === "string" && data.text.trim()) return data.text.trim();
  if (Array.isArray(data.choices)) {
    const chatText = data.choices.map((choice) => choice.message?.content || choice.text || "").filter(Boolean).join("\n").trim();
    if (chatText) return chatText;
  }
  return collectText(data).join("\n").trim();
}

function collectText(value, results = []) {
  if (!value) return results;
  if (typeof value === "string") return results;
  if (Array.isArray(value)) {
    value.forEach((item) => collectText(item, results));
    return results;
  }
  if (typeof value !== "object") return results;

  if ((value.type === "output_text" || value.type === "text") && typeof value.text === "string") {
    results.push(value.text);
  }
  if (typeof value.output_text === "string") results.push(value.output_text);
  if (value.text && typeof value.text.value === "string") results.push(value.text.value);
  Object.entries(value).forEach(([key, child]) => {
    if (!["text", "output_text"].includes(key)) collectText(child, results);
  });
  return results;
}

async function callOpenAI(payload, apiKey, model) {
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...payload, model, max_output_tokens: 650 })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error?.message || `OpenAI request failed with status ${response.status}`;
    throw new Error(message);
  }
  return data;
}

async function callOpenAIChat(systemPrompt, userPrompt, apiKey, model) {
  const response = await fetch(OPENAI_CHAT_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 650,
      temperature: 0.4
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error?.message || `OpenAI chat request failed with status ${response.status}`;
    throw new Error(message);
  }
  return data;
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Use POST to ask CultivAIte a question." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(response, 503, { error: "OPENAI_API_KEY is not set in Vercel yet." });
    return;
  }

  try {
    const rawBody = await readBody(request);
    const { question, context } = JSON.parse(rawBody || "{}");
    if (!question || typeof question !== "string") {
      sendJson(response, 400, { error: "Question is required." });
      return;
    }

    const gardenContext = compactContext(context);
    const modelCandidates = [...new Set([process.env.OPENAI_MODEL, DEFAULT_MODEL, FALLBACK_MODEL].filter(Boolean))];
    const systemPrompt = [
      "You are CultivAIte, an AI gardening assistant for a sustainable garden planning web app.",
      "Use plain, practical language for home gardeners.",
      "Base advice first on the provided garden context: ZIP, ZIP source, USDA zone, frost timing, plot dimensions, plant list, spacing, crop families, soil demand, and warnings.",
      "If the user's question includes a ZIP code that differs from the planner ZIP, prioritize the ZIP from the question and briefly say so.",
      "When discussing regional facts, prefer the USDA zone and extension-style guidance already provided in the garden context. If exact local extension data is not available, say what should be verified locally.",
      "Do not give medical, pesticide-label, or legal certainty. For pesticide use, tell the user to follow the product label and local extension guidance.",
      "Do not present garden recommendations as guaranteed outcomes. Weather, soil, pest pressure, varieties, and local regulations can change the right action.",
      "When the user asks about pests, disease, chemicals, edibility, toxicity, or safety, include a brief verification note and encourage local extension or product-label confirmation.",
      "Keep answers concise: 1 to 4 short paragraphs, with specific next actions."
    ].join(" ");
    const userPrompt = `Garden context:\n${JSON.stringify(gardenContext, null, 2)}\n\nUser question:\n${question}`;
    const payload = {
      instructions: systemPrompt,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: userPrompt
            }
          ]
        }
      ]
    };

    let answer = "";
    let lastError;
    for (const model of modelCandidates) {
      try {
        const data = await callOpenAI(payload, apiKey, model);
        answer = extractAnswer(data);
        if (answer) break;
        lastError = new Error("OpenAI returned an empty Responses API answer.");
      } catch (error) {
        lastError = error;
      }
    }
    if (!answer) {
      for (const model of modelCandidates) {
        try {
          const data = await callOpenAIChat(systemPrompt, userPrompt, apiKey, model);
          answer = extractAnswer(data);
          if (answer) break;
          lastError = new Error("OpenAI returned an empty Chat Completions answer.");
        } catch (error) {
          lastError = error;
        }
      }
    }
    if (!answer) throw lastError || new Error("OpenAI request failed.");

    sendJson(response, 200, {
      answer
    });
  } catch (error) {
    sendJson(response, 500, { error: error.message || "CultivAIte AI could not answer right now." });
  }
};
