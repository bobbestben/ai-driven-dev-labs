## Why

The `pomodoro-lab5` folder is a learning lab for building a client-side Pomodoro timer application using plain HTML and JavaScript. This change delivers a fully functional, visually polished Pomodoro timer without any backend or build tooling — just open the HTML file and go.

## What Changes

- Add a Pomodoro timer UI to `pomodoro-lab5/index.html` (currently empty/placeholder)
- Implement a 25-minute focus session and 10-minute rest session cycle
- Add Start, Pause, and Reset controls
- Style the app inspired by the Chupa Chups brand (bright, playful, lollipop-themed color palette)
- Add an audible or visual cue when a session ends and the next begins

## Capabilities

### New Capabilities

- `pomodoro-timer`: Core countdown timer with focus/rest session cycling, start/pause/reset controls, and session-end notifications
- `pomodoro-ui`: Chupa Chups-inspired visual design — bright colors, bold typography, lollipop motifs, responsive single-page layout

### Modified Capabilities

_(none — this is a greenfield page)_

## Impact

- **Files changed**: `pomodoro-lab5/index.html` (primary), optionally inline `<style>` and `<script>` tags (client-side only, no external build step)
- **No backend, no dependencies**: Everything ships in the single HTML file
- **No existing specs affected**: New standalone capability
