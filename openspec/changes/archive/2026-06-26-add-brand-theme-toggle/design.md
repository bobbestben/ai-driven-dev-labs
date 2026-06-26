## Context

The Pomodoro app (`pomodoro-lab5/index.html`) is a single-file, zero-dependency client-side app. It already uses CSS custom properties (`--red`, `--yellow`, `--bg`, etc.) and a `data-mode` attribute on `<body>` for focus/rest theming. The visual identity is Chupa Chups — candy colours, polka-dot background, flower SVG logo, lollipop stick decoration.

This change introduces a second brand theme (Coca-Cola) selectable by the user via a toggle. Both themes must co-exist seamlessly, and the selection must persist across page reloads.

## Goals / Non-Goals

**Goals:**
- Toggle between exactly two themes: Chupa Chups (default) and Coca-Cola
- Coca-Cola theme: classic red (`#F40009`), cream white (`#FFFAF0`), wavy ribbon decoration
- Theme persists in `localStorage` under key `pomodoroTheme`
- Decoration swaps: Chupa Chups logo/lollipop SVG ↔ Coca-Cola bottle/ribbon SVG
- Toggle button is always visible and clearly labelled (shows the *other* brand as the target)
- Both themes fully respect the existing focus/rest mode colour switching

**Non-Goals:**
- More than two themes
- Server-side persistence
- Custom user-defined colours
- Changing the timer behaviour in any way

## Decisions

### `body[data-theme]` attribute for CSS theming
**Decision**: Add a `data-theme="chupa-chups"` (default) / `data-theme="coca-cola"` attribute to `<body>`. CSS blocks for each theme redefine the same custom properties.  
**Rationale**: Consistent with the existing `data-mode` pattern already in the codebase. One attribute flip from JS drives all visual changes — no class juggling.  
**Alternative**: Separate CSS classes — rejected, adds selector complexity with no benefit.

### Toggle button placement and labelling
**Decision**: Place a small pill toggle button in the top-right corner of the page (fixed or relative to the logo area). Label it with the *inactive* brand name so it reads as "switch to X" (e.g., "🥤 Coca-Cola" when Chupa Chups is active, "🍭 Chupa Chups" when Coca-Cola is active).  
**Rationale**: Users immediately see what they'll switch *to*, which is more intuitive than showing the current state.

### Swappable SVG decoration via `display` toggling
**Decision**: Render both the Chupa Chups flower SVG and a Coca-Cola wave/bottle SVG in the HTML. Show/hide them with `display: none` controlled by `body[data-theme]` CSS rules.  
**Rationale**: Avoids JS DOM manipulation for the decoration — CSS handles visibility automatically when the `data-theme` attribute changes.  
**Alternative**: Inject SVG via JS — rejected, harder to maintain and mixes concerns.

### `localStorage` persistence
**Decision**: On toggle, write `localStorage.setItem('pomodoroTheme', theme)`. On page load, read and apply it before first render.  
**Rationale**: Zero-dependency, available in all modern browsers. Reading on load (before first paint) avoids a flash of the wrong theme.

## Risks / Trade-offs

- **FOUC (Flash of Unstyled Content)**: If `localStorage` is read after CSS renders, there may be a brief flash of the default Chupa Chups theme on reload when Coca-Cola is saved. → Apply `data-theme` in an inline `<script>` in `<head>` before the closing `</head>` tag, which runs synchronously before paint.
- **Two decorations in DOM**: Both SVGs are always in the DOM (just hidden). → Negligible cost for inline SVGs of this size.
- **Theme vs. mode interaction**: `data-theme` and `data-mode` are independent attributes; CSS selectors need to handle combinations (e.g., `body[data-theme="coca-cola"][data-mode="rest"]`). → Define rest-mode overrides nested under each theme selector.
