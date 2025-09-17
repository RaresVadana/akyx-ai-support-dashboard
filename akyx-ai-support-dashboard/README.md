# AKYX AI Support Dashboard

## Overview

This project is a lightweight customer‑support dashboard tailored for the **Junior Software Engineer Intern** position at **AKY X**. It demonstrates how to build a modern full‑stack application that fetches support tickets from a database, displays them in a responsive UI and uses an AI service to propose reply suggestions. The front‑end is built with **Next.js**, the gateway API runs on **Node/Express**, and the suggestion service is implemented with **Python FastAPI**. Data is stored in **Supabase**/**PostgreSQL**.

## Features

* **Ticket list & filters** — view open, pending and closed support tickets with quick filters by status.
* **AI reply suggestions** — the app calls a Python API (FastAPI) that wraps the OpenAI API to generate context‑aware reply templates.
* **Real‑time updates** — web sockets (via Socket.IO) broadcast ticket changes to all connected clients.
* **Multi‑service architecture** — separate frontend, API gateway and AI microservice to illustrate API composition and isolation.
* **Authentication (optional)** — plug in Supabase auth to restrict access to authenticated users.

## Architecture

```text
┌──────────────┐        HTTP        ┌──────────────────┐
|  Next.js UI  | ───────────────▶ |  Node/Express API |
└──────────────┘  fetch tickets    └──────────────────┘
        │                                │
        │ WebSocket (tickets)            │ HTTP
        ▼                                ▼
  Supabase/Postgres  ◀─────────────  Python FastAPI
       (Tickets)        Suggestions     (OpenAI)
```

The **Next.js** front‑end talks to the **Node/Express** API to fetch tickets and post new replies. When an agent asks for a reply suggestion, the API forwards the request to the **Python FastAPI** service, which calls an AI API (e.g. OpenAI) to produce a draft. All services share a Supabase/Postgres database for tickets and user metadata.

## Tech Stack

| Layer      | Technology      |
|----------- |-----------------|
| Front‑end  | React, Next.js, TailwindCSS |
| Gateway    | Node.js, Express, Supabase client |
| AI Service | Python 3, FastAPI, httpx |
| Database   | Supabase/PostgreSQL |
| Testing    | Jest, React Testing Library, Supertest, Pytest |
| CI         | GitHub Actions (node and python runners) |

## Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/RaresVadana/akyx-ai-support-dashboard.git
   cd akyx-ai-support-dashboard
   ```
2. **Install dependencies**
   ```sh
   # Node dependencies
   npm install
   # Python service dependencies
   (cd python_service && pip install -r requirements.txt)
   ```
3. **Configure environment variables**
   Copy `.env.example` to `.env` and fill in the required values:
   ```env
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   OPENAI_API_KEY=your-openai-api-key
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   ```
4. **Run the services**
   ```sh
   # Start the Node/Express API gateway
   npm run dev:api
   # Start the FastAPI AI service
   cd python_service && uvicorn main:app --reload
   # Start the Next.js development server
   npm run dev
   ```

5. **Run tests**
   ```sh
   # Lint and unit tests for JS/TS
   npm test
   # Python tests
   cd python_service && pytest
   ```

## Deployment

Deploy the front‑end and API to Vercel or Netlify, and the Python service to a small VM or serverless function. Update your `.env` files accordingly. For production, set `NODE_ENV=production` and run `npm run build && npm start` for the Next.js site.

## Live Demo / Figma

* **Live Demo:** _Coming soon – deploy your own instance and link it here_
* **Figma Design:** _Designer collaboration link goes here_

## Screenshots (Placeholders)

| Ticket dashboard | AI suggestion |
|-----------------|---------------|
| _screenshot here_ | _screenshot here_ |

## Contributing

This repository follows the [Conventional Commits](https://www.conventionalcommits.org/) specification and uses **Prettier**, **ESLint**, **Black** and **Ruff** to ensure consistent code style. Pull requests should include tests where applicable and update the documentation if behavior changes.
