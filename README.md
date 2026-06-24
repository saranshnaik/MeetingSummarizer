# Meeting Summarizer & Action Items Extractor

## About

An AI-powered meeting assistant that:

* transcribes meetings
* generates structured meeting summaries
* extracts actionable items
* validates AI-generated outputs
* provides real-time execution status updates
* plans execution using LLM agents
* executes actions using Google Workspace tools
* evaluates execution quality through reflection and validation agents

The system currently supports:

* Gmail
* Google Calendar
* Google Tasks
* Action Assignment Workflows (through Google Calendar)

and uses a multi-stage agentic architecture for planning, execution, reflection, evaluation, and real-time monitoring.

---

## Features

### Meeting Processing Pipeline

```text
Audio / Video / URL
        ↓
Transcription
        ↓
Summarization
        ↓
Summary Validation
        ↓
Action Extraction
        ↓
Action Validation
        ↓
User Reviews & Edits Actions
        ↓
Planning Pipeline
        ↓
Plan Validation
        ↓
Execution Pipeline
        ↓
Execution Validation
        ↓
Reflection Pipeline
        ↓
Reflection Validation
        ↓
Final Result
```

---

## Current Capabilities

### Meeting Processing

* Audio file ingestion
* Video file ingestion
* Direct video URL ingestion
* Long meeting transcript chunking
* Structured meeting summaries
* Action item extraction
* Editable action cards
* End-to-end meeting validation

### Agentic Execution

* Planner Agent
* Execution Agent
* Reflection Agent
* Multi-stage orchestration pipeline
* Tool selection and execution planning
* Reflection-based execution review

### Google Workspace Integrations

* Gmail
* Google Calendar
* Google Tasks

### Validation & Evaluation

* Summary validation
* Action extraction validation
* Planning validation
* Execution validation
* Reflection validation

### Authentication & User Management

* JWT authentication
* User registration
* User login
* Protected frontend routes
* Password hashing
* Authentication middleware

### Prompt Management

* Dynamic prompt management
* Prompt versioning
* Admin prompt editor
* Runtime prompt updates

### Real-Time Status Updates

* WebSocket-based status streaming
* Live meeting processing progress
* Live action execution progress
* Automatic frontend reconnection
* User-scoped event delivery
* Real-time pipeline monitoring
* Automatic Alembic migrations

### Observability

* Structured logging
* Application tracing
* Execution monitoring
* Real-time pipeline status tracking
* WebSocket event monitoring
* Log viewing endpoints

---

## Tech Stack

### Backend

* FastAPI
* Python
* UV
* Pydantic
* SQLAlchemy
* PostgreSQL
* Alembic
* Ollama
* Faster-Whisper
* Google APIs
* WebSockets
* Docker

### Frontend

* Next.js 15
* TypeScript
* TailwindCSS
* shadcn/ui
* Zustand
* Axios
* Docker

---

## Running the Project

### Prerequisites

Required

* Docker Desktop
* Docker Compose

Optional (for local development)

* Python 3.12
* UV
* Node.js
* npm

---

### Environment Setup

Copy

.env.example

to

.env

and configure the required environment variables.

---

### Google Workspace Setup

#### 1. Create A Google Cloud Project

Enable:

* Gmail API
* Google Calendar API
* Google Tasks API

#### 2. Download Credentials

Download and place the `credentials.json` file inside `backend/config/`.

`token.json` will be generated automatically after authentication.

#### 3. Configure Access

When app runs for the first time, grant access required for:

* Gmail
* Google Calendar
* Google Tasks

---

### Docker Setup

Run

```bash
docker compose up --build
```

Wait until terminal logs show `Models ready`.

Application runs on:

* Frontend      `http://localhost:3000`
* Backend API   `http://localhost:8000`
* Swagger Docs  `http://localhost:8000/docs`

To stop

```bash
docker compose down
```

To Rebuild:

```bash
docker compose up --build
```

---

### Local Development (Optional)

### Backend Setup

In a new terminal

#### 1. Navigate to backend

```bash
cd backend
```

#### 3. Install dependencies

```bash
uv sync
```

#### 4. Create required directories

```bash
mkdir -p data/raw data/processed data/temp logs
```

#### 5. Start backend

```bash
uvicorn main:app --reload
```

* Backend: `http://localhost:8000`
* Swagger Docs: `http://localhost:8000/docs`

---

### Database Initialization

Database tables are created automatically on application startup through SQLAlchemy metadata initialization.

Admin user and seed prompts are automatically inserted on application startup.

---

### Frontend Setup

In a new terminal

#### 1. Navigate to frontend

```bash
cd frontend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start development server

```bash
npm run dev
```

* Frontend: `http://localhost:3000`

---

## Admin Prompt Management

```text
http://localhost:3000/admin
```

Administrators can:

* Create prompts
* Edit prompts
* Rollback to prompt versions
* View system logs

---

## Project Structure

```text
backend/
│
├── agents/              # Planner, execution, and reflection agents
├── alembic/             # Database migration related files
├── auth/                # JWT authentication and authorization
├── config/              # Application settings and credentials
├── data/                # Temporary test files and non-persistent uploaded files
├── db/                  # Database models, repositories, sessions
├── evaluation/          # Validators and evaluation framework
├── integrations/        # External service integrations
├── llms/                # Prompt templates, management and database seeding prompts
├── logs/                # Application logs
├── observability/       # Logging and tracing
├── pipelines/           # Meeting and execution pipelines
├── routes/              # Application routes
├── schemas/             # Application schemas
├── scripts/             # Utility and seeding scripts
├── services/            # Business logic services
├── test/                # Files for testing backend components
├── tools/               # Tool implementations and registry
├── utils/               # Shared utilities
│
├── .dockerignore        # Files to ignore for Dockerfile 
├── alembic.ini          # Alembic initialization 
├── Dockerfile           # Container creation commands 
├── main.py              # Application entrypoint
└── pyproject.toml       # Project backend dependencies


frontend/
│
├── app/                 # Next.js application routes
├── components/          # UI components
│   ├── actions/
│   ├── admin/
│   ├── execution/
│   ├── feedback/
│   ├── layout/
│   ├── providers/
│   ├── results/
│   ├── summary/
│   ├── ui/
│   └── upload/
│
├── hooks/               # Custom React hooks
├── lib/                 # Shared frontend utilities
├── public/              # Static assets
├── services/            # API and WebSocket services
├── store/               # Zustand stores
├── types/               # TypeScript type definitions
│
├── .dockerignore        # Files to ignore for Dockerfile 
├── Dockerfile           # Container creation commands 
├── package-lock.json    # For npm
├── package.json         # Frontend dependencies
│
├── other-configuration-files
...
```

---

## Backend Highlights

* **Agents** — Planner, Execution, and Reflection agents responsible for action planning and execution review.
* **Pipelines** — End-to-end meeting processing, planning, execution, and reflection workflows.
* **Evaluation** — Validation framework for summaries, actions, plans, execution results, and reflections.
* **Integrations** — Google Workspace, Ollama, Whisper, and authentication integrations.
* **Observability** — Structured logging, tracing, and monitoring.

---

## Frontend Highlights

* **Next.js App Router** architecture.
* **Zustand** for global state management.
* **WebSocket-powered** real-time status updates.
* **Admin dashboard** for prompt management.
* **Modular UI components** for actions, summaries, execution results, and uploads.

---

## Database

Current persistence layer:

* PostgreSQL
* SQLAlchemy ORM
* Repository Pattern

Database schema is version-controlled using Alembic migrations.

Models currently include:

* User
* Prompt

---

## Deployment Architecture

docker-compose

├── frontend     (Next.js)
├── backend      (FastAPI)
├── postgres     (PostgreSQL)
├── ollama       (Local LLM server)
└── ollama-init  (Download models)

---

## State Management

Frontend global state is managed using Zustand.

Stores include:

* Action Store
* Authentication Store
* Meeting Store
* Prompt Store
* WebSocket Store

---

## Current Limitations

* No meeting history persistence
* No user-specific Google OAuth
* Limited evaluation analytics dashboard
* WebSocket events are currently in-memory and non-persistent
