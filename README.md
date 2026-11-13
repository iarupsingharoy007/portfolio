# Arup Singha Roy - Personal Site

A  single-page personal brand site it runs as-is on GitHub Pages.

## Structure

```
portfolio/
  index.html              → the entire site (Home, About, Experience, Projects, Beyond Work, Contact)
  assets/
    css/style.css         
    js/main.js             
    images/                
    resume.pdf             
```



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
