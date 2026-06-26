## MODIFIED Requirements

### Requirement: Chupa Chups-inspired color palette
The application SHALL use a bold, candy-inspired color palette derived from Chupa Chups branding for all visual elements **when the Chupa Chups theme is active** (default).

#### Scenario: Focus mode colors
- **WHEN** the Chupa Chups theme is active AND the application is in "Focus" mode
- **THEN** the background SHALL use a warm orange (`#FF6B00`) accent color and the page background SHALL be a complementary warm cream or yellow tone

#### Scenario: Rest mode colors
- **WHEN** the Chupa Chups theme is active AND the application is in "Rest" mode
- **THEN** the accent color SHALL switch to candy pink (`#FF69B4`) and the background SHALL use a soft cream tone (`#FFF5E4`)

### Requirement: Lollipop decorative element
The application SHALL include an inline SVG decoration that reinforces the **active brand** aesthetic.

#### Scenario: Lollipop visible when Chupa Chups theme is active
- **WHEN** the user opens the page with the Chupa Chups theme active
- **THEN** the Chupa Chups flower/lollipop SVG illustration SHALL be visible in the header or decorative area of the UI

#### Scenario: Brand decoration updates on theme switch
- **WHEN** the user switches themes
- **THEN** the decoration SHALL immediately update to reflect the newly active brand (Chupa Chups ↔ Coca-Cola)
