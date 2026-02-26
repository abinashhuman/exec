# Manish Mittal — Personal Website

Minimalist tech executive personal website for Manish Mittal, VP Engineering.

## Stack
- Pure HTML5, CSS3, Vanilla JavaScript
- Google Fonts: Inter + Playfair Display
- No frameworks, no dependencies — just fast, clean code

## Structure
```
exec/
├── index.html      # Main single-page site
├── style.css       # All styles (dark theme, responsive)
├── script.js       # Interactions, animations, IntersectionObserver
└── README.md
```

## Sections
1. **Hero** — Name, title, bio, social links, profile photo
2. **Work** — Visa, Microsoft, Walmart highlights
3. **Biography** — Timeline from India roots → today
4. **Philosophy** — 8 beliefs on tech, teams & building
5. **Contact** — LinkedIn + email CTA

## Profile Photo
The site attempts to load Manish's LinkedIn profile photo. Due to LinkedIn's hotlink protection, it falls back to a styled avatar via `ui-avatars.com` if the direct image is unavailable. Replace the `src` on the `#profilePhoto` `<img>` tag with any hosted image URL.

## Deployment
Push to GitHub Pages or any static host. The site is a single HTML page.

```bash
# GitHub Pages
# Go to Settings → Pages → Source: main branch → /root
```

## LinkedIn
[linkedin.com/in/manishhdmittal](https://www.linkedin.com/in/manishhdmittal/)
