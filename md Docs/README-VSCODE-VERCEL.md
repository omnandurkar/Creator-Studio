# Creator Studio — frontend-only source package

This is the fully static, frontend-only version of Om Nandurkar’s Creator Studio. It has **no database, login system, API server, OAuth flow, secret keys, or Manus runtime dependency**. It is designed for VS Code, GitHub, and Vercel.

## Run locally

Install Node.js 20+ and pnpm 10+, open the project folder in VS Code, and run:

```bash
pnpm install
pnpm dev
```

The local site URL appears in the terminal. Before pushing any edit, run:

```bash
pnpm check
pnpm test
pnpm validate:content
pnpm build
```

## Edit content and media

The public archive content is JSON-managed under `client/src/content/`. Every image and audio file needed by the site is included locally in `client/public/assets/`. To replace an asset, put the new file in that folder and use a path starting with `/assets/` in the relevant JSON file.

Read **`CREATOR_STUDIO_OWNER_HANDBOOK.md`** for full examples covering songs, albums, Shayari, writings, notes, Cinephile, Mind Garden, images, audio, new sections, GitHub, and Vercel.

## Publish with GitHub and Vercel

Create a new GitHub repository and push this project:

```bash
git init
git add .
git commit -m "Initial Creator Studio archive"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Then import the repository at [vercel.com/new](https://vercel.com/new). Vercel automatically detects `vercel.json`, builds the static Vite project, and serves the `dist` directory. No environment variables are required.

## Included local assets

| Asset | Purpose |
| --- | --- |
| `om-portrait-watercolor.png` | Active painted portrait integrated into the Home collage |
| `om-portrait-source.png` | Original supplied portrait, retained for reference |
| `om-illustrative-audio-sketch.mp3` | Starter audio sketch in the Music room |
| `creator-studio-stamp.png` | Shared Creator Studio mark |
| `home-sunset-soundcheck.svg` | Home featured-release artwork |

The original portrait is included for reference but is not directly displayed. The watercolor version is the active portrait layer.
