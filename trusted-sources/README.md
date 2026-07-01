# CultivAIte Trusted Sources

This folder is the source library and rulebook for CultivAIte's AI guidance.

The goal is simple: when CultivAIte gives garden advice, it should prefer reliable gardening sources over general internet-style guesses.

## Approved Sources Only

Only approved sources belong here.

Approved source types:

- USDA
- University Extension Offices
- Land-grant universities
- Peer-reviewed gardening or agriculture papers
- Expert-reviewed CultivAIte guides

Do not include blogs, Reddit, Pinterest, random websites, unreviewed social media posts, or AI-written articles.

## Source Priority

Use trusted sources in this order:

1. User-entered garden information, including ZIP code, plot size, plants, planted dates, sun, soil, layout goal, and seed packet details.
2. USDA resources, especially for hardiness zones and broad climate context.
3. Local university extension guidance, especially for planting dates, pests, disease, soil, and region-specific crop advice.
4. Seed packet labels for variety-specific details such as spacing, planting depth, days to maturity, and sun needs.
5. Built-in CultivAIte plant library logic.

## Guardrail Rules

- Do not invent sources, dates, crop facts, or pest guidance.
- If a trusted source is missing, say what is uncertain and recommend checking the user's local extension office.
- Treat companion planting as helpful but lower-confidence unless backed by a reliable source.
- Do not guarantee harvests, pest prevention, disease control, or exact planting success.
- Do not present pesticide, herbicide, food safety, medical, toxic plant, or legal advice as final authority.
- For pesticides or disease treatment, remind users to follow product labels and local extension guidance.
- Use the user's specific seed packet information when it conflicts with generic plant library guidance.
- Keep advice practical, beginner-friendly, and tied to the user's actual garden.

## Suggested Source Record Format

When adding a source, include:

- Title
- Organization
- Link or file name
- Region
- Crop or topic
- Last reviewed date
- Notes about when CultivAIte should use it

## Important

This folder creates the trusted-source structure. The Ask AI backend is ready to use this library once the OpenAI vector store ID is added in Vercel.
