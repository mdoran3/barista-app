# On My Grind ☕

A barista training game: you're shown a random drink name and have to guess its recipe — temperature, milk, syrup, and whether it's blended — by picking from the options in each category. Hit "Check Answer" to see how you did, with a popup and per-category ✅/❌ feedback.

## Features

- Random drink + recipe generator, revealed with a typewriter intro
- Four ingredient categories (Temperature, Milk, Syrup, Blended) laid out as equally-sized cards
- Per-category correct/wrong feedback with emoji indicators
- Custom in-page results popup (no native browser alerts)
- Dark, coffee-inspired visual theme

## Tech stack

- [React](https://react.dev/) (function components + hooks: `useState`, `useEffect`, `useRef`)
- [Vite](https://vite.dev/) for dev server and build tooling
- Plain CSS (custom properties for theming, no CSS framework)
- [ESLint](https://eslint.org/) for linting

## Project structure

- `src/components/BaristaForm.jsx` — main game logic and layout
- `src/components/RecipeChoices.jsx` — radio-button choice list for a single ingredient category
- `src/data/drinks.json` — drink names and their correct recipes
- `src/App.css` / `src/index.css` — app styling and theme variables

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Available scripts

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
