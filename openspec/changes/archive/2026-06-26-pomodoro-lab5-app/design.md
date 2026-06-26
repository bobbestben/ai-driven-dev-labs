## Context

The `pomodoro-lab5/index.html` file is an empty placeholder in the repo. The goal is to build a complete Pomodoro timer as a single self-contained HTML file — no build tools, no npm, no frameworks. Everything (markup, styles, logic) lives in one file so learners can open it directly in a browser.

The Chupa Chups brand is defined by: saturated candy colors (bold orange, yellow, pink, white), rounded playful shapes, strong bold typography, and a fun lollipop mascot feel. The UI should feel like a candy wrapper in the best possible way.

## Goals / Non-Goals

**Goals:**
- Single `index.html` file, no external dependencies (fonts via Google Fonts CDN is acceptable)
- 25-minute focus timer and 10-minute rest timer cycling automatically
- Start, Pause, and Reset controls
- Visual distinction between Focus and Rest modes (color theme swap)
- End-of-session notification (browser `Notification` API with graceful fallback to a visual flash)
- Chupa Chups-inspired design: bold palette, rounded card, lollipop SVG decoration
- Responsive enough to work on desktop and mobile browsers

**Non-Goals:**
- Custom session durations (settings UI)
- Persistence (localStorage, session count tracking)
- Backend, service workers, or PWA features
- Accessibility audit beyond basic semantic HTML

## Decisions

### Single-file HTML with inline CSS + JS
**Decision**: All CSS and JavaScript go inside `<style>` and `<script>` tags in `index.html`.  
**Rationale**: Zero friction — open the file, it works. No Node, no bundler. Consistent with the "lab" learning context.  
**Alternative considered**: Separate `.css` and `.js` files with relative imports. Rejected because multi-file setups require a local server to avoid CORS issues and add unnecessary complexity for a simple lab.

### Vanilla JavaScript `setInterval` for the countdown
**Decision**: Use `setInterval(fn, 1000)` with a correction mechanism (`Date.now()` drift tracking) to tick the clock.  
**Rationale**: No external library needed. Drift correction keeps the display accurate even if the browser throttles the interval (e.g., background tab).  
**Alternative considered**: `requestAnimationFrame` loop — overkill for a 1-second resolution timer.

### CSS custom properties for mode theming
**Decision**: Define `--primary`, `--bg`, `--text` etc. as CSS custom properties on `:root`, and swap them by toggling a `data-mode="focus"` / `data-mode="rest"` attribute on `<body>`.  
**Rationale**: Clean separation of theme logic — JS only flips one attribute, CSS handles all visual changes. Easy to extend with more modes.

### Browser Notification API for end-of-session alert
**Decision**: Request notification permission on first Start click; fire a `Notification` when a session ends. Fall back to a CSS ring-flash animation on the timer card if permission is denied.  
**Rationale**: Audio alerts require a hosted audio file or base64-encoded blob; visual alternatives avoid asset dependencies while still giving the user a meaningful cue.

### Chupa Chups color palette implementation
**Decision**: Focus mode → warm orange `#FF6B00` + yellow `#FFD700`. Rest mode → candy pink `#FF69B4` + soft cream `#FFF5E4`. Lollipop SVG decoration in the header (inline SVG, no image file).  
**Rationale**: Directly inspired by Chupa Chups packaging. Inline SVG keeps the single-file constraint.

## Risks / Trade-offs

- **Browser tab throttling**: Browsers throttle `setInterval` in background tabs (down to ~1/second minimum, but sometimes more aggressive). `Date.now()` drift correction mitigates visual inaccuracy but won't wake a fully suspended tab. → Acceptable for a lab app; document the known limitation.
- **Notification permission UX**: Users must grant permission; if they decline, the fallback flash is subtle. → Flash is bright enough to notice; not a hard requirement.
- **Single-file maintenance**: Inline CSS/JS is harder to lint or test individually. → Acceptable trade-off for zero-dependency simplicity in a lab.
