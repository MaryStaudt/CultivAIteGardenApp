# CultivAIte Trusted Source Search Setup

This is the step that connects the `trusted-sources` idea to the Ask AI page.

## What This Does

When a user asks CultivAIte a gardening question:

1. CultivAIte sends the question to OpenAI.
2. OpenAI searches your approved trusted-source library.
3. The AI receives the best matching source chunks.
4. The AI answers using the garden context and those trusted source chunks.
5. The answer should include a short `Sources checked:` line when sources were used.

## What To Upload

Only upload approved sources, such as:

- USDA files
- University Extension files
- Land-grant university files
- Peer-reviewed gardening or agriculture papers
- Expert-reviewed CultivAIte guides

Do not upload blogs, Reddit, Pinterest, random websites, AI-written articles, or unreviewed social media posts.

## OpenAI Setup

1. Go to the OpenAI Platform.
2. Open Storage or Vector Stores.
3. Create a new vector store named:

```text
CultivAIte Trusted Sources
```

4. Upload your approved PDFs, text files, or source documents.
5. Copy the vector store ID. It should start with:

```text
vs_
```

## Vercel Setup

Add this environment variable to the CultivAIte app in Vercel:

```text
OPENAI_TRUSTED_SOURCES_VECTOR_STORE_ID
```

Paste the `vs_...` ID as the value.

Then redeploy CultivAIte.

## Optional Strict Mode

If you want CultivAIte to refuse AI answers unless trusted source search is connected, add this Vercel environment variable:

```text
OPENAI_REQUIRE_TRUSTED_SOURCES=true
```

Do not turn strict mode on until the vector store is working.

## How To Test

Ask a question like:

```text
How should I start tomato seeds in my zone?
```

You should see a useful answer. If the vector store has matching trusted material, the answer should include a `Sources checked:` line.

If the trusted source library does not cover the topic yet, CultivAIte should say that clearly instead of pretending it has a source.
