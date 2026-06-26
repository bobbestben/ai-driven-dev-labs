---
name: user-guide-writer
description: "Use when: writing or updating the user guide for the PetClinic application; documenting how to use the app; generating end-user documentation by browsing the running application. Do NOT use for reading source code or technical docs."
argument-hint: "Optional: target file path (default: docs/user-guide/user-guide.md)"
---

# User Guide Writer

Generates a concise Markdown user guide for the brownfield PetClinic application by **browsing the live app at `http://localhost:5173/`** using the browser tool, not by reading source code.

## When to Use
- Creating or refreshing `docs/user-guide/user-guide.md`
- Documenting features after a new release
- Writing end-user-facing documentation

## Requirements
- The brownfield frontend must be running on `http://localhost:5173`
- The brownfield backend must be running on `http://localhost:8080`

## Procedure

### 1. Open the application
Use the browser tool to navigate to `http://localhost:5173/`. Read the page content and note the landing page layout and main navigation.

### 2. Discover all pages and features
Visit each section of the app. For each page, note:
- What the page is called
- What the user can see (list, detail, form, etc.)
- What actions are available (create, delete, search, etc.)

Sections to cover:
- Pets (list, detail, create)
- Visits (list per pet, detail)
- Vets (list)
- Invoices (list per visit)

### 3. Write the guide
Produce a Markdown file with the following structure:

```markdown
# PetClinic User Guide

## Overview
One-paragraph description of what the app does.

## Getting Started
How to navigate the app (main menu / landing page).

## Pets
### Viewing Pets
### Adding a Pet

## Visits
### Viewing Visits
### Visit Details

## Vets
### Viewing Vets

## Invoices
### Viewing Invoices
```

### 4. Style rules
- Keep it **succinct** — no more than 2–3 sentences per section
- Use plain language, no technical jargon
- No screenshots (text only)
- Use bullet points for lists of actions
- Use `**bold**` for UI element names (buttons, labels)

### 5. Save the file
Write the output to `docs/user-guide/user-guide.md` (or the path provided as argument).
