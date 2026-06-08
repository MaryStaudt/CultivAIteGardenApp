const OPENAI_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-5.2";

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
    usdaZone: climate.zone,
    lastFrost: climate.frost,
    localGuidanceSource: extension.source,
    localGuidanceNote: extension.note,
    plot: {
      name: plot.name,
      sizeFeet: `${plot.width} x ${plot.length}`,
      goal: plot.goal,
      plants: plants.slice(0, 30)
    },
    gardenChecks: {
      density: assessment.density,
      warnings: Array.isArray(assessment.warnings) ? assessment.warnings.slice(0, 8) : [],
      strengths: Array.isArray(assessment.wins) ? assessment.wins.slice(0, 8) : []
    }
  };
}

async function callOpenAI(payload, apiKey, includeWebSearch = true) {
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(includeWebSearch ? payload : { ...payload, tools: undefined })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error?.message || `OpenAI request failed with status ${response.status}`;
    throw new Error(message);
  }
  return data;
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Use POST to ask SOL a question." });
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
    const payload = {
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
      instructions: [
        "You are SOL, an AI gardening assistant for a web app called Sustainable, Organized Layout.",
        "Use plain, practical language for home gardeners.",
        "Base advice first on the provided garden context: ZIP, USDA zone, frost timing, plot dimensions, plant list, spacing, crop families, soil demand, and warnings.",
        "When discussing regional facts, prefer USDA and university extension style guidance. If exact local extension data is not available, say what should be verified locally.",
        "Do not give medical, pesticide-label, or legal certainty. For pesticide use, tell the user to follow the product label and local extension guidance.",
        "Keep answers concise: 1 to 4 short paragraphs, with specific next actions."
      ].join(" "),
      tools: [{ type: "web_search" }],
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Garden context:\n${JSON.stringify(gardenContext, null, 2)}\n\nUser question:\n${question}`
            }
          ]
        }
      ]
    };

    let data;
    try {
      data = await callOpenAI(payload, apiKey, true);
    } catch (error) {
      data = await callOpenAI(payload, apiKey, false);
    }

    sendJson(response, 200, {
      answer: data.output_text || "I could not create an answer this time. Try asking again with a little more detail."
    });
  } catch (error) {
    sendJson(response, 500, { error: error.message || "SOL AI could not answer right now." });
  }
};
