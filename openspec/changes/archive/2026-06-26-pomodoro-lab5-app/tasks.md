## 1. HTML Structure

- [x] 1.1 Replace placeholder content in `pomodoro-lab5/index.html` with a semantic HTML skeleton (header, main timer card, controls)
- [x] 1.2 Add a `data-mode="focus"` attribute to `<body>` for CSS theme switching
- [x] 1.3 Add the mode label element (`<div id="mode-label">`) and timer display (`<div id="timer">`)
- [x] 1.4 Add three control buttons: Start (`id="btn-start"`), Pause (`id="btn-pause"`), Reset (`id="btn-reset"`)
- [x] 1.5 Add an inline SVG lollipop decoration in the header area

## 2. CSS Styling (Chupa Chups Theme)

- [x] 2.1 Define CSS custom properties on `:root` for focus mode colors (`--primary: #FF6B00`, `--bg: #FFF8E7`, `--accent: #FFD700`)
- [x] 2.2 Define overriding CSS custom properties on `body[data-mode="rest"]` for rest mode colors (`--primary: #FF69B4`, `--bg: #FFF5E4`)
- [x] 2.3 Style the page background, center layout, and body font (use Google Fonts CDN for a bold rounded font like Nunito or Poppins)
- [x] 2.4 Style the timer card (large rounded rectangle, white background with shadow, centered)
- [x] 2.5 Style the `#mode-label` (uppercase, bold, colored with `var(--primary)`)
- [x] 2.6 Style the `#timer` display (large font size ~6rem, bold, monospace or bold sans-serif)
- [x] 2.7 Style the three control buttons (pill-shaped, bold text, `var(--primary)` background on active, muted on inactive)
- [x] 2.8 Add `.inactive` CSS class for dimming inactive buttons (Start when running, Pause when stopped)
- [x] 2.9 Add a `@keyframes flash` animation for the end-of-session fallback alert (card background pulses bright)
- [x] 2.10 Add responsive styles (`@media (max-width: 600px)`) to scale down font sizes and padding for mobile

## 3. JavaScript Timer Logic

- [x] 3.1 Define constants: `FOCUS_DURATION = 25 * 60` and `REST_DURATION = 10 * 60` (seconds)
- [x] 3.2 Implement state variables: `mode` ("focus"/"rest"), `remaining` (seconds), `isRunning` (bool), `intervalId`, `startTimestamp`, `startRemaining`
- [x] 3.3 Implement `formatTime(seconds)` → `"MM:SS"` with zero-padding
- [x] 3.4 Implement `updateDisplay()` — writes `formatTime(remaining)` to `#timer` and updates `#mode-label` text
- [x] 3.5 Implement drift-corrected tick: on each `setInterval` tick, compute elapsed via `Date.now() - startTimestamp`, set `remaining = startRemaining - elapsed / 1000`, call `updateDisplay()`
- [x] 3.6 Implement `startTimer()` — sets `isRunning = true`, records `startTimestamp` and `startRemaining`, calls `setInterval`, updates button states
- [x] 3.7 Implement `pauseTimer()` — clears interval, sets `isRunning = false`, updates button states
- [x] 3.8 Implement `resetTimer()` — clears interval, resets `remaining` to current mode's default duration, sets `isRunning = false`, calls `updateDisplay()`, updates button states
- [x] 3.9 Implement `switchMode()` — toggles `mode`, sets `remaining` to next mode's default, updates `body[data-mode]` attribute, calls `updateDisplay()`, fires notification/flash, auto-starts next session
- [x] 3.10 In the tick handler, check if `remaining <= 0` and call `switchMode()` instead of decrementing further

## 4. Notifications & Alerts

- [x] 4.1 Implement `requestNotificationPermission()` — calls `Notification.requestPermission()` if not yet granted; call this on the first Start click
- [x] 4.2 Implement `notify(message)` — fires `new Notification(message)` if permission is `"granted"`, otherwise triggers the CSS flash animation on the timer card
- [x] 4.3 Call `notify()` inside `switchMode()` with appropriate messages ("Rest time! 10 minutes." / "Focus time! 25 minutes.")

## 5. Button State Management

- [x] 5.1 Implement `updateButtonStates()` — adds/removes `.inactive` class on Start and Pause based on `isRunning`
- [x] 5.2 Wire `btn-start` click → `startTimer()` (no-op if already running)
- [x] 5.3 Wire `btn-pause` click → `pauseTimer()` (no-op if not running)
- [x] 5.4 Wire `btn-reset` click → `resetTimer()`

## 6. Verification

- [x] 6.1 Open `index.html` in browser and confirm 25:00 displayed with "Focus" label on load
- [x] 6.2 Verify Start begins countdown and Pause freezes it at the correct remaining time
- [x] 6.3 Verify Reset returns timer to session default without changing mode
- [x] 6.4 Verify automatic transition: let timer run to 00:00 (or manually set a short duration in JS for testing) and confirm mode switches and next session starts
- [x] 6.5 Verify color theme swaps between Focus and Rest modes
- [x] 6.6 Verify layout is usable on a 375px wide viewport (browser DevTools mobile emulation)
