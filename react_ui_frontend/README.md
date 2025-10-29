# Viz AI React Frontend

Modern React UI for the Anteater Behavior Analytics Platform (Viz AI). Implements Ocean Professional theme, routing, global state via Context + useReducer, API client with mock fallbacks, and core screens.

## Quick Start

- Install dependencies
  - npm install
- Configure environment
  - Copy .env.example to .env and set REACT_APP_API_BASE_URL if you have a backend. If left empty, the app uses local mock data.
- Run
  - npm start

## Environment

- REACT_APP_API_BASE_URL
  - Base URL for the backend API (e.g., https://api.example.com)
  - If unset, the API layer falls back to mock responses for development.

## Routes

- /dashboard
- /upload
- /videos
- /reports
- /settings

The app entry is src/AppShell.jsx, wired in src/index.js.

## Architecture

- State: src/state/AppContext.jsx with Context + useReducer
- API: src/api/client.js reads REACT_APP_API_BASE_URL and provides mock fallbacks
- Screens: src/screens/* for feature pages
- Theme: src/theme.css implements the Ocean Professional theme

## Styling

Ocean Professional palette:
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Base components (buttons, cards, inputs) and layout (sidebar, topbar, content) are implemented in theme.css with subtle shadows and rounded corners.
