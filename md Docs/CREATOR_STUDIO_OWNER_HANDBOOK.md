# Creator Studio Owner Handbook

This handbook is for **Om Nandurkar**. It explains how to update the public Creator Studio archive in VS Code, add your own music and writing, replace images, and extend the frontend-only site without needing a database, login, or a hosted backend.

> **The safe workflow is always the same:** edit the right JSON or asset file, run the website locally, check the page, run the validation commands, then push to GitHub and deploy through Vercel.

## 1. Start here

Open the project folder in VS Code. In the terminal, run the following once to install the packages, then start the website.

```bash
pnpm install
pnpm dev
```

The terminal will show a local address, usually `http://localhost:3000`. Open it in a browser while you edit. Press `Ctrl + C` in the terminal when you want to stop it.

| What you want to change | Where to edit |
| --- | --- |
| Your name, bio, portrait, current project, availability | `client/src/content/site.json` |
| Home-page featured release and note | `client/src/content/home.json` |
| Songs and demos | `client/src/content/songs.json` |
| Albums, EPs, and track lists | `client/src/content/albums.json` |
| Shayari | `client/src/content/shayari.json` |
| Long writings | `client/src/content/writings.json` |
| Thoughts and sticky notes | `client/src/content/notes.json` |
| Cinephile entries and watchlist | `client/src/content/films.json`, `client/src/content/watchlist.json` |
| Hobbies | `client/src/content/hobbies.json` |
| Contact links and collaboration details | `client/src/content/contact.json` |
| Mind Garden wording and interest petals | `client/src/content/adhd-garden.json` |
| Images, cover art, portrait, and audio files | `client/public/assets/` |

## 2. Your rules for JSON files

JSON is the website’s editable content format. A JSON file uses curly brackets `{ }`, square brackets `[ ]`, commas, and quotation marks. The easiest and safest method is to copy an existing complete item and edit its values.

> Keep every key in quotation marks, use a comma after every line except the final line in a block, and never leave a trailing comma after the final item.

Use VS Code’s **Format Document** command if the file becomes hard to read. If the page disappears after an edit, undo the last change with `Ctrl + Z` and look for a missing comma or quote.

## 3. Add a song or audio sketch

First, place your audio file inside `client/public/assets/`. For example:

```text
client/public/assets/khamoshi-ke-baad.mp3
```

Then open `client/src/content/songs.json`, copy a whole song object, and change it to your own information. Each song needs a unique `id` and a unique URL-friendly `slug`.

```json
{
  "id": "khamoshi-ke-baad-001",
  "slug": "khamoshi-ke-baad",
  "title": "Khamoshi Ke Baad",
  "type": "single",
  "releaseDate": "2026-09-12",
  "coverImage": "/assets/khamoshi-ke-baad-cover.jpg",
  "audioPreview": "/assets/khamoshi-ke-baad.mp3",
  "duration": "03:28",
  "description": "Write a short, honest description in your own voice.",
  "mood": ["late-night", "warm", "acoustic"],
  "links": {
    "Spotify": "https://open.spotify.com/...",
    "YouTube": "https://youtube.com/..."
  },
  "lyricFragments": ["one short line", "one more short line"],
  "lyricContext": "A note about these lines.",
  "story": "The story behind the song.",
  "storyPlace": "where the idea began",
  "credits": [{ "role": "writing, production", "name": "Om Nandurkar" }],
  "versions": [{ "id": "khamoshi-first", "label": "first mix", "description": "A note about this mix.", "audioPreview": "/assets/khamoshi-ke-baad.mp3" }],
  "timeline": [{ "date": "September 12", "title": "released", "detail": "The song enters the archive." }],
  "relatedIds": [],
  "published": true,
  "featured": false
}
```

The `slug` becomes the song page address, such as `/music/khamoshi-ke-baad`. Use lowercase letters, numbers, and hyphens only. Set `featured` to `true` only for the one song you want to place at the front of the Music room.

## 4. Add an album or EP

Open `client/src/content/albums.json`. Album entries work like songs, but they also connect to songs already listed in `songs.json` through `trackIds`.

```json
{
  "id": "blue-window-ep",
  "slug": "blue-window",
  "title": "Blue Window",
  "type": "ep",
  "releaseDate": "2026-10-03",
  "coverImage": "/assets/blue-window-cover.jpg",
  "description": "A short description of the EP.",
  "trackIds": ["khamoshi-ke-baad-001", "another-song-id"],
  "links": { "Spotify": "https://open.spotify.com/..." },
  "published": true,
  "featured": true
}
```

The text in each `trackIds` item must match an `id` in `songs.json` exactly. Add every song first, then add the album.

## 5. Add Shayari

Open `client/src/content/shayari.json` and copy a complete entry. Use the `text` field for the original script, `romanizedText` only when helpful, and `translation` only when you genuinely want a translation displayed.

```json
{
  "id": "baarish-ke-baad-01",
  "slug": "baarish-ke-baad",
  "title": "Baarish Ke Baad",
  "text": "अपनी असली शायरी यहाँ लिखें।",
  "romanizedText": "Apni asli shayari yahan likhen.",
  "translation": "Write an optional translation here.",
  "hiddenLine": "An optional margin line.",
  "language": "Hindi",
  "series": "Monsoon Margins",
  "seriesOrder": 1,
  "shareable": true,
  "readingTrackId": "khamoshi-ke-baad-001",
  "tags": ["rain", "memory"],
  "date": "2026-09-15",
  "published": true,
  "featured": false
}
```

Your `readingTrackId`, when used, must match an existing song `id`. If there is no music connection, delete that line or use an empty string only if the existing pattern in the file allows it.

## 6. Add a long writing

Open `client/src/content/writings.json`. Use `excerpt` for the small preview on the archive page. Use `body` for a simple piece, or `sections` for a structured essay with headings.

```json
{
  "id": "room-with-a-window",
  "slug": "room-with-a-window",
  "title": "A Room with a Window",
  "category": "essay",
  "date": "2026-09-20",
  "excerpt": "A short introduction for the writing shelf.",
  "body": [
    "First paragraph.",
    "Second paragraph."
  ],
  "sections": [
    {
      "heading": "A small beginning",
      "paragraphs": ["Section paragraph one.", "Section paragraph two."]
    }
  ],
  "tags": ["music", "process"],
  "shareable": true,
  "printable": true,
  "published": true,
  "featured": false
}
```

Use either short `body` entries, structured `sections`, or both. The reader turns each array item into a paragraph, so put one paragraph per line inside the array.

## 7. Add a thought or sticky note

Open `client/src/content/notes.json`. Notes are intentionally short. Choose a colour and pin style already used by another item.

```json
{
  "id": "note-window-light",
  "text": "A small thought worth keeping.",
  "label": "September margin",
  "color": "butter",
  "rotation": -3,
  "pinStyle": "red-pin",
  "date": "2026-09-21",
  "tags": ["process", "morning"],
  "printable": true,
  "published": true,
  "featured": false
}
```

Use only these current colours: `butter`, `lilac`, `peach`, `mint`, and `sky`. Use only these current pin styles: `red-pin`, `blue-pin`, and `tape`.

## 8. Update Cinephile honestly

Film opinions must stay yours. Open `client/src/content/films.json` only when you are ready to write your own response to a film. Do not publish ratings, reactions, favourites, or reviews that are not yours.

Use `title`, `director`, `year`, `watchedOn`, `whatStayedWithMe`, `review`, `sceneToRemember`, `motifs`, and `tags`. Add a poster to `client/public/assets/`, then use an asset path such as `"posterImage": "/assets/film-poster.jpg"`.

For titles you only want to remember, use the neutral list in `client/src/content/watchlist.json`.

## 9. Update the Mind Garden

Open `client/src/content/adhd-garden.json`. This room is for a compassionate, personal reflection on attention, many interests, and creative practice. Update the `interestPetals` array to your actual interests—for example, songwriting, football, cinema, poetry, photography, or gaming.

Keep the health information balanced and non-diagnostic. The room should describe your experience without claiming that any trait guarantees creativity or achievement.

## 10. Change your portrait, logo, or other media

Put your replacement file in `client/public/assets/`. Use clear names without spaces, such as:

```text
om-portrait-2026.png
paper-boat-single-cover.jpg
late-night-demo.mp3
```

Then update the relevant JSON path to start with `/assets/`.

```json
"portraitImage": "/assets/om-portrait-2026.png"
```

The active Home portrait is controlled in `client/src/content/site.json`. The current watercolor version was made to blend into the Home collage; it is not displayed as a separate photo card.

## 11. Update contact details

Open `client/src/content/contact.json`. Add the email address you want to publish, social links, availability, and collaboration types. For a simple frontend-only site, an email address and a `mailto:` link are enough for enquiries.

Do not include a private phone number, home address, personal identification details, or a login password in any JSON file.

## 12. Add a new archive section

When you want a completely new room—such as **Photography**, **Live Sets**, **Sketchbook**, or **Travel Notes**—make it in this order.

1. Create a JSON data file in `client/src/content/`, such as `photography.json`.
2. Import and type it in `client/src/lib/content.ts`.
3. Create a page in `client/src/pages/`, such as `Photography.tsx`.
4. Add a route in `client/src/App.tsx`, for example `<Route path="/photography" component={Photography} />`.
5. Add a navigation link in `client/src/components/SiteHeader.tsx`.
6. Add its room-specific visual style in `client/src/index.css` or a dedicated imported CSS file.
7. Test the page on desktop and mobile, then run the commands in the next section.

Start by copying the structure of the closest existing room. For example, copy `Notes.tsx` for short visual fragments, `Writings.tsx` for reading content, `Music.tsx` for filters and collections, or `Cinephile.tsx` for a journal structure.

> Every new room should have its own visual world, but preserve the shared Creator Studio stamp, coral accent, accessible text contrast, keyboard-friendly controls, and reduced-motion support.

## 13. Check your work before publishing

Run these commands from the project folder after any meaningful edit:

```bash
pnpm check
pnpm test
pnpm validate:content
pnpm build
```

| Command | What it checks |
| --- | --- |
| `pnpm check` | TypeScript errors in pages and data connections |
| `pnpm test` | Automated behaviour and content-contract tests |
| `pnpm validate:content` | Required fields and valid archive JSON |
| `pnpm build` | Whether Vercel can build the site for production |

If all commands finish successfully, commit your changes to GitHub and let Vercel deploy the new commit.

## 14. GitHub and Vercel routine

Use this simple repeatable routine after each update:

```bash
git add .
git commit -m "Add new song to Creator Studio"
git push
```

Vercel will normally create a deployment from the pushed commit. Open the Vercel deployment preview, listen to the audio, open the new page on mobile, and then promote the deployment when you are satisfied.

## 15. Quick troubleshooting

| Problem | Check this first |
| --- | --- |
| A page is blank | Undo the most recent JSON edit; look for a missing comma or quotation mark. |
| New song does not appear | Confirm `published` is `true`, the JSON is valid, and the `id` and `slug` are unique. |
| Audio does not play | Confirm the file is in `client/public/assets/` and its path begins with `/assets/`. |
| Image is broken | Check capital letters, spelling, and the file extension in both the folder and JSON. |
| Album track is missing | Confirm the album’s `trackIds` value exactly matches the song’s `id`. |
| Vercel build fails | Run `pnpm build` locally and fix the first error shown. |
| I want a stronger visual change | Edit the room CSS only after making a backup or Git commit. |

## 16. Before you publish real work

Replace or unpublish starter proof content that does not represent your released work. Keep your own song credits accurate, use artwork you have permission to publish, and write Cinephile opinions in your own voice. The site is designed to grow slowly; it is better to publish fewer real pieces than to fill it with things that are not yours.
