# CultivAIte

CultivAIte is an AI-assisted garden planner for sustainable, organized layouts.

This is the cleaned-up website version of the CultivAIte garden planner. It keeps the working app simple while separating the pieces that matter before adding Firebase.

## Folder Map

```text
index.html              Main website screen
src/styles.css          Visual design
src/standalone.js       App behavior, saving, layout, calendar, Ask page
api/ask.js              Vercel backend for Ask CultivAIte and OpenAI
icons/                  Installable app icons
manifest.webmanifest    Installable web app settings
sw.js                   Offline/install cache helper
vercel.json             Vercel deployment settings
```

## Local Preview

```bash
npm run start
```

Then open:

```text
http://127.0.0.1:5173/
```

## Check Before Uploading

```bash
npm run check
npm run build
```

## Vercel Settings

Use these settings:

```text
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
```

Add this environment variable in Vercel, not GitHub:

```text
OPENAI_API_KEY
```

Optional:

```text
OPENAI_MODEL=gpt-4.1-mini
```

## Firebase Comes Next

Firebase should be added after this cleanup so CultivAIte can support accounts, cloud-saved gardens, and syncing across phone and computer.
