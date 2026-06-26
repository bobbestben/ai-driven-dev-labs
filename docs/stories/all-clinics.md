# User Story — All Clinics Page

## User Story

As a **Pet Owner**, I want to see a dedicated list of all veterinary clinics so that I can discover available clinic locations and their directors before booking a visit for my pet.

---

## Acceptance Criteria

**AC1 — Navigation**
Given the application is open, when the user clicks the **Clinics** tab in the navigation, then the **All Clinics** page is displayed.

**AC2 — Clinic list is rendered**
Given the All Clinics page is open, when clinic data is loaded, then each row displays the clinic's **ID**, **address**, and **director's name**.

**AC3 — Read-only page**
Given the All Clinics page is displayed, when the user views the list, then no create, edit, or delete actions are available.

**AC4 — Visit references clinic entity**
Given a visit exists in the system, when the All Visits page is displayed, then the **Clinic** column shows the clinic's address sourced from the Clinic entity (not a plain text field).

**AC5 — Empty state**
Given no clinics exist in the database, when the All Clinics page is loaded, then a message indicating no clinics are available is displayed.

---

## Definition of Done

- [ ] All acceptance criteria are met
- [ ] `Clinic` entity created with `id`, `address`, and `director` (OneToOne → `Vet`)
- [ ] `Visit` entity updated with a `ManyToOne` relation to `Clinic` (replacing the `clinic` string field)
- [ ] Backend exposes a `GET /api/v1/clinics` endpoint returning all clinics
- [ ] Frontend `ClinicsPage` component renders the clinic list (read-only)
- [ ] **Clinics** tab added to the navigation header
- [ ] Unit tests written and passing for the new service and component
- [ ] The code is committed to the repository
- [ ] Changes are verified as working in a local environment

---

## Notes

- **Data model changes:**
  - New `Clinic` entity: `id` (PK), `address` (string), `director` (OneToOne → `Vet`)
  - `Visit.clinic` field changes from `string` to a `ManyToOne` relation to `Clinic`
  - No database migration is required (application is not yet in production — re-seeding is acceptable)
- The **director** field is a reference to an existing `Vet` — no new Vet entity changes are needed.
- The Clinics page is intentionally read-only for this story; admin CRUD can be a future story.
