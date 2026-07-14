# Arup Singha Roy — Personal Site

A premium, single-page personal brand site: engineer & automation enthusiast by day, gamer (**iLAZY**) by night. Built with plain HTML/CSS/JS — no build step, no framework — so it runs as-is on GitHub Pages.

## Structure

```
portfolio/
  index.html              → the entire site (Home, About, Experience, Projects, Beyond Work, Contact)
  assets/
    css/style.css         → design tokens + all styling
    js/main.js             → theme toggle, scroll-spy, reveal fallback, nav shrink/hide, contact form logic
    js/motion.js           → GSAP/ScrollTrigger premium motion layer (progressive enhancement)
    images/                → hero/about photos, gaming banner, gallery, project thumbnails
    resume.pdf             → your resume, linked from the hero "Resume" button
```

## Before you publish

1. **Resume** — ✅ already added at `assets/resume.pdf`.
2. **Email** — ✅ already set to `arupsinghroy@gmail.com`.
3. **GitHub link** — ✅ already points to `https://github.com/iarupsingharoy007`.
4. **Contact form — action required.** The form in `index.html` posts to `https://formspree.io/f/YOUR_FORM_ID`, which is a placeholder. Static sites (GitHub Pages) can't run server code, so the form needs a third-party form backend:
   - Create a free account at [formspree.io](https://formspree.io), create a form, and copy the endpoint it gives you (looks like `https://formspree.io/f/xxxxxxxx`).
   - Replace the `action="..."` value on the `<form data-contact-form>` element in `index.html` with that URL.
   - Until you do this, the form will show a friendly "not connected yet" message instead of silently failing.
5. **Experience** — timeline is populated from your LinkedIn export; add more roles by duplicating a `.timeline-item` block (remember to keep the `.timeline-dot` span).
6. **Projects** — all three cards are filled in. Add a fourth by duplicating a `.project-card` block.

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

## What changed in the premium motion pass

- **GSAP + ScrollTrigger** (loaded from a CDN) now drive the hero entrance, scroll-linked parallax, section-heading reveals, skill-node pop-ins, the timeline's scroll-synced progress line, and smoother magnetic buttons.
- **Everything degrades gracefully.** If the CDN is blocked or offline, `assets/js/motion.js` exits immediately at the top and the site falls back to the plain CSS/IntersectionObserver reveal system in `main.js` — nothing breaks, it's just less animated.
- **Skills** are now an interactive node grid (`.skill-grid`) instead of a plain bulleted list.
- **Projects** got expandable "Key highlights" (native `<details>`, no JS required, fully keyboard/screen-reader accessible).
- **Nav** now shrinks and hides on scroll-down, reappears on scroll-up.
- **Accessibility**: added a skip-to-content link, visible focus rings (`:focus-visible`) site-wide, and `prefers-reduced-motion` is respected by every GSAP animation (checked explicitly, not just via CSS).
- **Performance**: below-the-fold images now use `loading="lazy" decoding="async"`.

## Deliberately out of scope for this pass

A few asks from the redesign brief don't fit a static, no-build, GitHub-Pages-hosted site, or need real content/assets not available yet — flagged here rather than faked:

- **Device mockups / architecture diagrams per project** — would need real product screenshots or diagrams; the current SVG mockups are a stand-in.
- **Code-splitting / tree-shaking** — these are bundler concepts (Webpack/Vite); this site intentionally has no build step, so they don't apply as written. A build pipeline is a bigger architectural change worth discussing on its own if wanted later.
- **Fully custom smooth-scroll (Lenis-style)** — GSAP's own smooth-scroll plugin is a paid add-on; native `scroll-behavior: smooth` plus the ScrollTrigger-driven parallax gets most of the feel for free.
- **Animated particle/noise canvas background** — the aurora-blob gradient system was kept rather than adding a canvas particle system, to protect performance/Lighthouse score.

## Design notes

- **Type**: Space Grotesk (headings), Inter (body), JetBrains Mono (labels, tags, eyebrows) — loaded via Google Fonts.
- **Color**: near-black base with a blue → purple → orange gradient used sparingly as the one recurring accent — cool tones dominate the professional sections, warming up only in Beyond Work.
- **Signature element**: the drifting aurora blobs behind the hero portrait, and the same gradient reappearing as a quiet thread through both the "professional" and "gamer" halves of the site — one visual identity, two moods.
