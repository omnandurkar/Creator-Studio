# Creator Studio — Design Direction

## Three Initial Directions

### 1. Pastel Afterimage Archive
**Very Brief Intro:** A maximalist digital scrapbook that blends art-school risograph posters, faded cinema stills, annotated lyric sheets, and soft analog grain. It feels like a creator has opened a personal archive of sound, words, and favourite frames.

**Probability:** 0.07

### 2. Velvet Listening Room
**Very Brief Intro:** An intimate, deeply dark listening space with warm spotlighting, album-scale imagery, and elegant editorial typography. The mood is nocturnal and cinematic rather than futuristic.

**Probability:** 0.04

### 3. Sun-Washed Field Notes
**Very Brief Intro:** A bright, tactile travel-journal world inspired by old paperbacks, pressed flowers, handwritten marginalia, and imperfect halftone photography. It makes every creative work feel like a found object.

**Probability:** 0.09

## Selected Direction: Pastel Afterimage Archive

### Design Movement

The site will use a contemporary **risograph editorial scrapbook** aesthetic with influences from independent music zines, New Wave film posters, 1970s paperback covers, and annotated creative journals. It will use decorative vector illustration intentionally, not as empty ornament.

### Core Principles

1. **Every page is its own room.** Each content category receives a distinct color world, graphic language, and tiny interaction ritual, while shared type, grain, and navigation retain a recognizable identity.
2. **Texture over gloss.** Light paper fibers, halftone dots, offset shadows, brush marks, tape, punched holes, and irregular borders create physical character without reducing legibility.
3. **Content is the artwork.** Songs, shayaris, film thoughts, and personal notes get generous space, high contrast reading surfaces, and deliberate hierarchy.
4. **Discovery is playful but clear.** Visitors should find surprises through cards, hover states, hidden details, and routes—never through confusing navigation.

### Color Philosophy

The shared foundation is warm archival paper and a deep ink outline, a visual thread that makes the different page themes feel collected in one creative universe. Each page uses one dominant pastel and one deeper contrasting ink, resembling separately printed pages from the same zine. Loud colors are reserved for calls to action, status labels, and purposeful visual punctuation.

### Layout Paradigm

The layout will feel like a sequence of oversized editorial spreads rather than a centralized landing-page grid. Full-bleed color fields will interrupt paper surfaces, text can sit asymmetrically beside graphics, and selected cards can overlap or be pinned at small angles. Core reading content will still use stable, comfortable columns.

### Signature Elements

1. **The cutout frame:** Rounded-rectangle frames with heavy ink outlines, misregistered shadows, and small crop-mark corners.
2. **The studio stamp:** A circular, hand-drawn starburst symbol used for the logo, favicon, buttons, and page markers.
3. **The paper trail:** Fine grain, scribbles, sticker stars, film perforations, waveform squiggles, and tape accents that adapt to each page category.

### Interaction Philosophy

Interactions should feel physical and immediate. Cards lift a few pixels and reveal a layer below; buttons depress slightly like printed labels; a hidden page detail responds to a deliberate cue, such as clicking a clapperboard or a record edge. Navigation remains simple and predictable at all times.

### Animation

Motion will be brief and tactile: 140–220 ms press/hover transitions with a crisp ease-out, short staggered card reveals, and subtle drifting shapes only when reduced-motion preferences allow it. Decorative graphics may shift, rotate by one or two degrees, or slide a few pixels. No looping motion will interfere with reading; keyboard-triggered actions will stay immediate.

### Typography System

**DM Serif Display** will create expressive, literary display moments; **Space Grotesk** will handle navigation, labels, and body content; and **Caveat** will provide minimal handwritten annotations. Headings use large, tightly set serif forms. Interface text is clean, compact, and letter-spaced. Handwriting appears only as an accent, never for long reading passages.

### Brand Essence

**Creator Studio is an open archive for a music maker whose songs, words, passing thoughts, and favourite films belong to the same evolving creative universe.**

Personality adjectives: **observant, warm, and idiosyncratic.**

### Brand Voice

Headlines are poetic but concrete, never vague or over-promotional. Calls to action invite a specific act of discovery. Microcopy is lightly conversational and observant.

Example headline: “Songs for the long way home.”

Example CTA: “Open the notebook.”

### Wordmark & Logo

The wordmark uses a compact custom-style serif arrangement: **Creator Studio** appears like a stamped library card title, with the “o” replaced or paired with the studio stamp. The logo mark is a bold, text-free **eight-point starburst inside an imperfect circular ink ring**—recognizable in small spaces and suitable for a transparent PNG favicon.

### Signature Brand Color

**Afterimage Coral — #FF6E6C.** A warm, distinctive coral used for the studio stamp, important interactions, and editorial highlights.

## Page-by-Page Theme System

| Page | Theme name | Dominant pastel world | Vector language | Small easter-egg direction |
|---|---|---|---|---|
| Home / Studio | Sunset soundcheck | Peach, coral, butter, warm paper | Waveforms, starburst stamp, sun discs | Tap the spinning record label to swap the hero line. |
| Music | Blue-room frequency | Powder blue, deep navy, silver | Vinyl grooves, equalizer bars, abstract instrument strings | A record sleeve flips to reveal a hidden track note. |
| Shayari | Rose-letter press | Blush, faded red, parchment | Ink vines, crescent moons, stamped punctuation | Tap a wax seal to reveal one additional couplet. |
| Writings | Mint-margin journal | Sage, mint, off-white, bottle green | Underlines, bookmark tabs, paper clips, chapter brackets | A margin annotation reveals a quiet reading prompt. |
| Notes | Lemon wall | Butter yellow, pale lilac, sky blue | Tape strips, pins, scribbles, note corners | A pinned note reshuffles the visible thought. |
| Cinephile | Projector daydream | Lavender, cinema teal, pale apricot, charcoal | Film perforations, subtitles, ticket stubs, light cones | Click the clapperboard to reveal a “director’s cut” note. |
| About / Hobbies | Green-room collage | Pistachio, peach, cream, forest ink | Cutout shapes, cameras, books, tiny objects | A collectible sticker reveals a personal favourite. |
| Contact | Closing credits | Soft black, butter, coral | Credit rolls, envelope marks, star icons | The stars form a small thank-you message on hover. |

## Build Sequence and Review Gates

1. **Foundation:** Establish shared navigation, typography, texture, studio stamp, data model, and responsive frame.
2. **Part 1 — Home / Studio:** Build and review the entry experience before any other content page.
3. **Part 2 — Music:** Build the songs, albums, and release detail system, then review it.
4. **Part 3 — Shayari:** Build the poetry archive and detail reading ritual, then review it.
5. **Part 4 — Writings:** Build long-form archive and reading pages, then review it.
6. **Part 5 — Notes:** Build the sticky-note thought board, then review it.
7. **Part 6 — Cinephile:** Build the movie journal, favourites, and review structure, then review it.
8. **Part 7 — About, Hobbies, Contact:** Build the personal collage and connection pages, then review it.
9. **Finish:** Add editorial validation, documentation for JSON editing, accessibility polish, responsive checks, and the final set of hidden details.

The shared foundation is completed once. Every numbered content part after that will be completed and presented independently before continuing, as requested.

## Style Decisions

- Public-facing content will use in-world editorial language such as **studio sketch**, **archive draft**, **pressed note**, **desk scrap**, **screening folder**, and **catalogued for later**. It will never expose implementation language such as “sample,” “template,” “replace,” or “JSON.”
- **Afterimage Coral — #FF6E6C** is the enduring Creator Studio signal. It marks the studio stamp, primary invitations, key quotation punctuation, important archive labels, and selected-action shadows in every page theme.
- Every room must include a small authored-feeling fragment from Om’s world: an observed line, an object, a late-night title, a personal prompt, or an archive label. The site should read as Om’s developing archive rather than a generic portfolio layout.
- Each page’s core metaphor governs its content behavior as well as its palette: pressed letters for Shayari, a loosening pinboard for Notes, screening tickets and film strips for Cinephile, a collected personal collage for About, and correspondence plus closing credits for Contact.
