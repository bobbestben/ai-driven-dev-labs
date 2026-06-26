## Why

The Pomodoro app currently ships with a single fixed theme (Chupa Chups). Adding a brand theme toggle gives users a fun, personalised experience — Chupa Chups fans keep their candy palette while Coca-Cola fans can switch to an iconic red-and-white look. It's a low-effort, high-delight feature that demonstrates CSS custom property theming at its best.

## What Changes

- Add a theme toggle button/switch to the UI that lets the user switch between **Chupa Chups** mode and **Coca-Cola** mode
- Define a Coca-Cola theme palette: classic red (`#F40009`), cream white (`#FFFAF0`), and dark label text — applied globally via `body[data-theme]`
- Swap the lollipop SVG decoration for a Coca-Cola bottle/wave SVG when Coca-Cola theme is active
- Persist the selected theme to `localStorage` so the preference survives a page reload
- The existing Chupa Chups palette, polka-dot background, and lollipop SVG remain the default

## Capabilities

### New Capabilities

- `brand-theme-toggle`: UI control and logic for switching between Chupa Chups and Coca-Cola themes, including localStorage persistence and decoration swap

### Modified Capabilities

- `pomodoro-ui`: The colour palette requirement changes — colours are now **theme-dependent** rather than fixed to Chupa Chups; the decorative element requirement changes to accommodate theme-specific artwork

## Impact

- **`pomodoro-lab5/index.html`**: Add toggle button HTML, new CSS theme block (`body[data-theme="coca-cola"]`), Coca-Cola SVG decoration, and JS for toggle + localStorage
- **No new files, no dependencies**: everything stays in the single HTML file
- **Existing Chupa Chups colours are unchanged** — they remain the default
