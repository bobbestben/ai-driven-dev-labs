## 1. Theme CSS

- [x] 1.1 Add `data-theme="chupa-chups"` as the default attribute on `<body>` in `index.html`
- [x] 1.2 Add a `body[data-theme="coca-cola"]` CSS block that redefines `--red`, `--yellow`, `--pink`, `--bg`, and `--ring-focus` to the Coca-Cola palette (`#F40009` red, `#FFFAF0` cream)
- [x] 1.3 Add `body[data-theme="coca-cola"][data-mode="rest"]` override for the rest-mode accent within the Coca-Cola theme (darker red `#C0000A`)
- [x] 1.4 Verify all existing `body[data-mode]` rules still apply correctly when nested inside the Coca-Cola theme (check polka-dot background, ring colour, button colour)

## 2. Coca-Cola SVG Decoration

- [x] 2.1 Add an inline SVG Coca-Cola decoration (ribbon wave or bottle silhouette) in the logo area of the HTML, alongside the existing Chupa Chups flower SVG
- [x] 2.2 Add CSS: `.logo-flower { display: block; }` under `body[data-theme="chupa-chups"]` and `display: none` under `body[data-theme="coca-cola"]`
- [x] 2.3 Add CSS: `.logo-cola { display: none; }` under `body[data-theme="chupa-chups"]` and `display: block` under `body[data-theme="coca-cola"]`
- [x] 2.4 Update the lollipop stick decoration similarly — hide under Coca-Cola theme, show under Chupa Chups

## 3. Toggle Button

- [x] 3.1 Add a `<button id="btn-theme-toggle">` element in the HTML, positioned near the logo/header area
- [x] 3.2 Style the toggle button as a small pill (consistent with existing button styles) — position it top-right of the logo wrap or below the subtitle
- [x] 3.3 Add CSS transition for smooth theme switch (`transition: background 0.3s, color 0.3s` on `body`)

## 4. JavaScript: Theme Logic

- [x] 4.1 Add `let currentTheme` state variable, initialised to `'chupa-chups'`
- [x] 4.2 Implement `applyTheme(theme)` — sets `document.body.setAttribute('data-theme', theme)`, updates `#btn-theme-toggle` label (`🥤 Coca-Cola` or `🍭 Chupa Chups`), and saves to `localStorage.setItem('pomodoroTheme', theme)`
- [x] 4.3 Implement `toggleTheme()` — flips `currentTheme` between `'chupa-chups'` and `'coca-cola'`, calls `applyTheme(currentTheme)`
- [x] 4.4 Wire `#btn-theme-toggle` click → `toggleTheme()`

## 5. LocalStorage Persistence

- [x] 5.1 Add an inline `<script>` block in `<head>` (before `</head>`) that reads `localStorage.getItem('pomodoroTheme')` and sets `document.body.setAttribute('data-theme', ...)` synchronously to prevent FOUC
- [x] 5.2 In the bootstrap section of the main `<script>`, initialise `currentTheme` from `localStorage.getItem('pomodoroTheme') || 'chupa-chups'` and call `applyTheme(currentTheme)` to sync the button label

## 6. Verification

- [x] 6.1 Open `index.html`, confirm Chupa Chups theme is active by default with the flower SVG visible
- [x] 6.2 Click the toggle — confirm Coca-Cola red palette applies, Cola decoration appears, Chupa Chups SVG hides
- [x] 6.3 Toggle back — confirm Chupa Chups palette and decoration restore
- [x] 6.4 While in Coca-Cola theme, let a session end — confirm rest mode colours work correctly within the Coca-Cola palette
- [x] 6.5 Reload the page while Coca-Cola theme is active — confirm no flash of Chupa Chups theme on load
- [x] 6.6 Open DevTools, clear `localStorage`, reload — confirm Chupa Chups theme is the default
