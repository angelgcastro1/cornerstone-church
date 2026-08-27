# Cornerstone Church — Website Template

A modern, fully self-contained multi-page church website. Structure and layout are
inspired by [Cottage Grove Church](https://www.cottagegrovedsm.com/), rebuilt as a
reusable template with placeholder content and **no external image or video dependencies**
(the hero uses a pure-CSS animated gradient).

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, mission statement, latest sermon, get-connected, CTA |
| `about.html` | Who We Are — story, beliefs (accordion), mission & values, team |
| `connect.html` | Let's Connect — Sundays, ways to serve, prayer, events |
| `contact.html` | Contact form + church info + map placeholder |
| `ministries.html` | Kids, Youth, Connection Groups, College, Local & Global Missions |
| `sermons.html` | Featured sermon + archive grid + podcast links |
| `give.html` | Ways to give + giving FAQ |

Shared assets live in `assets/css/styles.css` and `assets/js/main.js`.

## Quick start

Just open `index.html` in any browser. There is no build step. To publish, upload the whole
folder to any static host (Netlify, GitHub Pages, Cloudflare Pages, Vercel, or plain web hosting).

## Customize it

**Church name / details** — Search-and-replace across the `.html` files:
- `Cornerstone` → your church name
- Service times in the top announcement bar (`.topbar`) and `connect.html`
- Address, phone, and email in the footer and `contact.html`

**Colors & fonts** — Edit the `:root` variables at the top of `assets/css/styles.css`.
The two accent colors (`--accent`, `--accent-2`) and the dark/cream backgrounds drive the
whole palette. Fonts are set with `--font-display` and `--font-sans`.

**Add real photos** — Every gradient placeholder is a `<div class="... grad-x">` with a
`<span class="card__media-fallback">` label. Replace the block with an `<img>` and it will fill
the same slot. For the hero, swap the `<div class="hero__bg">` for a `<video>` or `<img>` element.

**Forms** — The newsletter and contact forms are front-end stubs (`data-newsletter`,
`data-contact` in `main.js`). Point them at your provider (Mailchimp, Planning Center,
Formspree, etc.) by adding an `action`/`method` to the `<form>` tags.

## Features

- Sticky navigation that turns solid on scroll, with hover mega-menus
- Full mobile menu with collapsible sections
- Animated CSS gradient hero (with a pause/play control)
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Accessible accordions for beliefs and FAQ
- Responsive down to small phones
