# Arup Singha Roy — Personal Site

A premium, single-page personal brand site: engineer & automation enthusiast by day, gamer (**iLAZY**) by night. Built with plain HTML/CSS/JS — no build step, no framework — so it runs as-is on GitHub Pages.

## Structure

```
portfolio/
  index.html              → the entire site (Home, About, Experience, Projects, Beyond Work, Contact)
  assets/
    css/style.css         → design tokens + all styling
    js/main.js             → theme toggle, scroll-spy, reveal animations, magnetic buttons
    images/                → hero/about photos, gaming banner, gallery
    resume.pdf             → ⬅ add your resume here (linked from the hero "Resume" button)
```

## Before you publish

1. **Resume** — drop a `resume.pdf` into `assets/`. The hero "Resume" button already points to `assets/resume.pdf`.
2. **Email** — replace `hello@example.com` in the Contact section (`index.html`) with your real address.
3. **GitHub link** — the hero and contact "GitHub" buttons currently point to `https://github.com/`. Update to your profile URL.
4. **Experience** — the two timeline cards in the Experience section are placeholders. Copy the `.timeline-item` block to add more roles.
5. **Projects** — the three project cards are placeholders (image/title/description/tags/link). Copy `.project-card` to add more, and swap in real screenshots.
6. **Beyond Work banner** — `assets/images/gaming-banner.png` is used as the background of the Beyond Work section. Swap it for an updated banner any time — no code changes needed.

## Running locally

No build tools needed. Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder's contents to the root of a repo (e.g. `arupsingharoy.github.io`, or any repo + enable Pages on the `main` branch / `root` folder).
2. In the repo's **Settings → Pages**, set the source to that branch and `/ (root)`.
3. Your site will be live at `https://<username>.github.io/` (or the repo's Pages URL).

## Extending later (Phase 2)

The CSS uses design tokens (`:root` variables in `style.css`) and the JS is modular (small independent functions in `main.js`), so it's straightforward to layer on:

- A blog or resume page (add `blog.html`, link it in the nav)
- GitHub/YouTube API integration (fetch real repo/video data into the Projects and Beyond Work sections)
- A contact form, command palette, or terminal-mode easter egg
- Light mode is already wired up (the moon/sun toggle in the nav) — only dark mode has been designed in detail so far; adjust the `[data-theme="light"]` block in `style.css` to refine it further.

## Design notes

- **Type**: Space Grotesk (headings), Inter (body), JetBrains Mono (labels, tags, eyebrows) — loaded via Google Fonts.
- **Color**: near-black base with a blue → purple → orange gradient used sparingly as the one recurring accent — cool tones dominate the professional sections, warming up only in Beyond Work.
- **Signature element**: the drifting aurora blobs behind the hero portrait, and the same gradient reappearing as a quiet thread through both the "professional" and "gamer" halves of the site — one visual identity, two moods.
