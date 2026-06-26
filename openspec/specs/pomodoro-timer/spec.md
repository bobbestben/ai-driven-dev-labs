# pomodoro-timer

**Purpose:** Core countdown timer for the Pomodoro application — manages focus and rest session cycles, start/pause/reset controls, automatic session transitions, and end-of-session notifications.

## Requirements

### Requirement: Default session durations
The application SHALL default to a 25-minute focus session and a 10-minute rest session upon load with no user configuration required.

#### Scenario: Page loads with correct default times
- **WHEN** the user opens `index.html` in a browser
- **THEN** the timer SHALL display `25:00` and the mode SHALL be set to "Focus"

### Requirement: Start the timer
The application SHALL allow the user to start the countdown timer.

#### Scenario: User starts a focus session
- **WHEN** the user clicks the Start button while the timer is stopped
- **THEN** the countdown SHALL begin from the current displayed time, decrementing every second

#### Scenario: Timer resumes after pause
- **WHEN** the user clicks the Start button while the timer is paused
- **THEN** the countdown SHALL resume from the time remaining at the point of pause

### Requirement: Pause the timer
The application SHALL allow the user to pause an in-progress countdown without resetting the remaining time.

#### Scenario: User pauses a running timer
- **WHEN** the user clicks the Pause button while the timer is running
- **THEN** the countdown SHALL stop and the displayed time SHALL remain at the paused value

### Requirement: Reset the timer
The application SHALL allow the user to reset the current session timer back to its default duration.

#### Scenario: User resets during focus session
- **WHEN** the user clicks the Reset button during a focus session (running or paused)
- **THEN** the timer SHALL stop and display `25:00`, and the mode SHALL remain "Focus"

#### Scenario: User resets during rest session
- **WHEN** the user clicks the Reset button during a rest session
- **THEN** the timer SHALL stop and display `10:00`, and the mode SHALL remain "Rest"

### Requirement: Automatic session transition
The application SHALL automatically transition from focus to rest (and rest back to focus) when the countdown reaches zero.

#### Scenario: Focus session ends
- **WHEN** the focus timer reaches `00:00`
- **THEN** the application SHALL switch the mode to "Rest", reset the display to `10:00`, and begin counting down automatically

#### Scenario: Rest session ends
- **WHEN** the rest timer reaches `00:00`
- **THEN** the application SHALL switch the mode to "Focus", reset the display to `25:00`, and begin counting down automatically

### Requirement: End-of-session notification
The application SHALL notify the user when a session ends.

#### Scenario: Notification permission granted
- **WHEN** a session ends AND the browser has granted notification permission
- **THEN** the application SHALL fire a browser Notification with the name of the next session (e.g., "Rest time!" or "Focus time!")

#### Scenario: Notification permission not granted
- **WHEN** a session ends AND notification permission has not been granted
- **THEN** the application SHALL display a visible flash animation on the timer card as a fallback alert

#### Scenario: First Start click requests permission
- **WHEN** the user clicks Start for the first time in the session
- **THEN** the application SHALL request browser Notification permission if not already granted or denied
