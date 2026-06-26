## ADDED Requirements

### Requirement: Chupa Chups-inspired color palette
The application SHALL use a bold, candy-inspired color palette derived from Chupa Chups branding for all visual elements.

#### Scenario: Focus mode colors
- **WHEN** the application is in "Focus" mode
- **THEN** the background SHALL use a warm orange (`#FF6B00`) accent color and the page background SHALL be a complementary warm cream or yellow tone

#### Scenario: Rest mode colors
- **WHEN** the application is in "Rest" mode
- **THEN** the accent color SHALL switch to candy pink (`#FF69B4`) and the background SHALL use a soft cream tone (`#FFF5E4`)

### Requirement: Mode label display
The application SHALL prominently display the current session mode ("Focus" or "Rest") so the user always knows which phase is active.

#### Scenario: Mode label visible
- **WHEN** the user views the timer in any state (running, paused, stopped)
- **THEN** the mode label SHALL be clearly visible above or near the countdown display

#### Scenario: Mode label updates on transition
- **WHEN** the session transitions from Focus to Rest (or vice versa)
- **THEN** the mode label SHALL update immediately to reflect the new mode

### Requirement: Countdown display formatting
The application SHALL display the remaining time in `MM:SS` format in a large, bold, readable font.

#### Scenario: Correct time format
- **WHEN** the timer displays any time value
- **THEN** minutes and seconds SHALL each be zero-padded to two digits (e.g., `05:03` not `5:3`)

### Requirement: Control buttons
The application SHALL provide three clearly labeled control buttons: Start, Pause, and Reset.

#### Scenario: Buttons visible at all times
- **WHEN** the user views the page
- **THEN** all three control buttons (Start, Pause, Reset) SHALL be visible

#### Scenario: Active/inactive visual state for Start and Pause
- **WHEN** the timer is running
- **THEN** the Start button SHALL appear visually inactive (dimmed or disabled style) and the Pause button SHALL appear active

#### Scenario: Active/inactive visual state when stopped
- **WHEN** the timer is stopped or paused
- **THEN** the Start button SHALL appear visually active and the Pause button SHALL appear visually inactive (dimmed)

### Requirement: Lollipop decorative element
The application SHALL include an inline SVG lollipop decoration that reinforces the Chupa Chups brand aesthetic.

#### Scenario: Lollipop visible on page
- **WHEN** the user opens the page
- **THEN** a lollipop SVG illustration SHALL be visible in the header or decorative area of the UI

### Requirement: Single-page responsive layout
The application SHALL render correctly on common desktop screen sizes and be usable on mobile without horizontal scrolling.

#### Scenario: Desktop layout
- **WHEN** viewed on a screen wider than 600px
- **THEN** all UI elements SHALL be centered and legible without overflow

#### Scenario: Mobile layout
- **WHEN** viewed on a screen 375px wide (common mobile viewport)
- **THEN** the timer, mode label, and buttons SHALL remain visible and usable without horizontal scrolling
