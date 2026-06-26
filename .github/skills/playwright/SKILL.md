---
name: playwright
description: "Use when: running browser automation, end-to-end testing, UI interaction, navigating pages, clicking elements, filling forms, taking screenshots, or asserting page content using Playwright. Activates the Playwright MCP server and built-in browser tools."
argument-hint: "Describe the browser task or URL to test"
tools:
  - playwright/*
  - browser
---

# Playwright Browser Automation

Enables full browser automation using the **Playwright MCP server** (`playwright/*`) and the **built-in browser** (`#tool:browser`) tools.

## When to Use
- Navigating to a URL and interacting with the page
- Clicking elements, filling forms, submitting data
- Taking screenshots or asserting visible content
- End-to-end testing of frontend features
- Generating user-facing documentation by browsing the live app

## Available Tools
- `playwright/*` — Playwright MCP server: navigate, click, fill, screenshot, assert
- `#tool:browser` — VS Code built-in browser: open pages, read snapshots

## Procedure

### 1. Open the target page
Use the Playwright MCP or built-in browser tool to navigate to the target URL.

### 2. Interact with the page
Use Playwright tools to:
- Click buttons and links
- Fill in form fields
- Wait for elements to appear
- Assert text or element presence

### 3. Capture results
Take a screenshot or read the page snapshot to confirm the outcome.

### 4. Report findings
Summarise what was observed or tested, including any errors or unexpected behaviour.
