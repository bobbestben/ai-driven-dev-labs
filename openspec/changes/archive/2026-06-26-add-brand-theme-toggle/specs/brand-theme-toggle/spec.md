## ADDED Requirements

### Requirement: Theme toggle control
The application SHALL provide a toggle button that lets the user switch between the Chupa Chups theme and the Coca-Cola theme.

#### Scenario: Toggle visible at all times
- **WHEN** the user views the page in any state
- **THEN** the theme toggle button SHALL be visible and clearly labelled with the name of the *inactive* theme (e.g., "🥤 Coca-Cola" when Chupa Chups is active)

#### Scenario: Activating Coca-Cola theme
- **WHEN** the user clicks the toggle while the Chupa Chups theme is active
- **THEN** the page SHALL immediately switch to the Coca-Cola theme and the toggle label SHALL update to "🍭 Chupa Chups"

#### Scenario: Activating Chupa Chups theme
- **WHEN** the user clicks the toggle while the Coca-Cola theme is active
- **THEN** the page SHALL immediately switch to the Chupa Chups theme and the toggle label SHALL update to "🥤 Coca-Cola"

### Requirement: Theme persistence
The application SHALL persist the user's selected theme across page reloads using `localStorage`.

#### Scenario: Theme saved on toggle
- **WHEN** the user toggles the theme
- **THEN** the selected theme SHALL be written to `localStorage` under the key `pomodoroTheme`

#### Scenario: Theme restored on reload
- **WHEN** the user reloads or reopens the page
- **THEN** the previously saved theme SHALL be applied before first render (no flash of the default theme)

#### Scenario: No saved theme
- **WHEN** no `pomodoroTheme` key exists in `localStorage`
- **THEN** the application SHALL default to the Chupa Chups theme

### Requirement: Coca-Cola theme palette
The application SHALL apply a Coca-Cola-inspired colour palette when the Coca-Cola theme is active.

#### Scenario: Coca-Cola focus mode colours
- **WHEN** the Coca-Cola theme is active AND the session mode is "Focus"
- **THEN** the accent colour SHALL be Coca-Cola red (`#F40009`), the page background SHALL be cream white (`#FFFAF0`), and ring/button colours SHALL use the red accent

#### Scenario: Coca-Cola rest mode colours
- **WHEN** the Coca-Cola theme is active AND the session mode is "Rest"
- **THEN** the accent colour SHALL shift to a lighter complementary red or dark red tone while retaining the cream white background

### Requirement: Theme-specific decoration
The application SHALL display a brand-appropriate SVG decoration that matches the active theme.

#### Scenario: Coca-Cola decoration visible
- **WHEN** the Coca-Cola theme is active
- **THEN** a Coca-Cola-inspired SVG decoration (bottle silhouette or ribbon wave) SHALL be visible and the Chupa Chups decoration SHALL be hidden

#### Scenario: Chupa Chups decoration restored
- **WHEN** the Chupa Chups theme is active
- **THEN** the Chupa Chups flower/lollipop SVG decoration SHALL be visible and the Coca-Cola decoration SHALL be hidden
