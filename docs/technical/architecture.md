# Technical Architecture

## 1. High-Level Stack Recommendation

Your proposed stack (**Go + PostgreSQL + React**) is **excellent** for this use case. It balances performance, type safety, and developer velocity.

*   **Backend**: **Go (Golang)**.
    *   *Why*: High concurrency (perfect for WebSockets/Live Scoring), single binary deployment, strong typing.
    *   *Framework*: **Echo** or **Chi** (Lightweight, fast).
*   **Database**: **PostgreSQL**.
    *   *Why*: Complex relationships (Users <-> Clubs <-> Tournaments) require a relational DB. JSONB columns allow flexible storage for game stats.
*   **Frontend**: **React (Vite)**.
    *   *Why*: Industry standard, rich ecosystem.
    *   *Strategy*: Build as a **Progressive Web App (PWA)**. This allows the app to be "installed" on tablets and work offline, without the complexity of managing a separate Flutter codebase for MVP.
*   **Infrastructure**: **Docker**.
    *   *Why*: Consistent dev/prod environment.

### What about Flutter?
*   **Recommendation**: Start with **React PWA** for the MVP.
*   *Reasoning*: Maintaining two codebases (React for Web Admin, Flutter for App) doubles the frontend work. A well-built React PWA works great on tablets.
*   *Future*: Since the Backend (Go) will be a standard REST/WebSocket API, you can easily build a Flutter app later that consumes the same API.

## 2. System Components

### A. The API Server (Go)
*   **Role**: The brain. Handles Auth, Game Logic, and Data Persistence.
*   **Key Modules**:
    *   `auth`: JWT handling, Role checks (Admin vs User).
    *   `game`: The Scoring Engine (501/Cricket logic). *Crucial: Keep this pure logic, separate from HTTP handlers.*
    *   `socket`: Hub for real-time updates (using `gorilla/websocket` or `melody`).
    *   `sync`: Handles "Offline Sync" reconciliation when a tablet reconnects.

### B. The Database (PostgreSQL)
*   **Core Tables**: `users`, `clubs`, `tournaments`, `matches`, `legs`, `throws`.
*   **Optimization**: Indexes on `player_id` and `club_id` for fast dashboard lookups.

### C. The Frontend (React)
*   **Role**: The unified interface.
*   **Contexts**:
    *   **Admin View**: Desktop-optimized tables and dashboards.
    *   **Kiosk View**: Tablet-optimized, large buttons, "Always On" mode.
    *   **Mobile View**: Responsive layout for personal phones.
*   **State Management**: `TanStack Query` (Server State) + `Zustand` (Client/Game State).
*   **Offline Support**: `vite-plugin-pwa` to cache assets and queue API requests (via `IndexedDB`) when offline.

### D. Real-Time Layer (Redis - Optional for MVP)
*   For a single-server MVP, Go's in-memory channels work fine.
*   **Scale-Up**: Add **Redis** later to broadcast WebSocket messages across multiple server instances.

## 3. Data Flow (Live Scoring)

1.  **Tablet**: User hits "T20".
2.  **Frontend**:
    *   Updates local state immediately (Optimistic UI).
    *   Sends `POST /throw` to Backend.
3.  **Backend**:
    *   Validates throw (Is it a bust?).
    *   Saves to DB.
    *   Broadcasts `match_update` event via WebSocket.
4.  **Spectator (TV)**:
    *   Receives `match_update`.
    *   Updates the Big Screen display instantly.

## 4. Project Structure (Separated)

We will separate the concerns completely to allow each stack to use its native tooling.

```text
pikado/
├── server/         # Go Workspace
│   ├── cmd/        # Entry points (main.go)
│   ├── internal/   # Private App Logic
│   ├── go.mod      # Go dependencies
│   └── Makefile    # Backend-specific tasks
├── web/            # React Workspace
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── Makefile        # Global Orchestration
```

### Tooling Decision: Why not Nx?
While Nx is great for JavaScript monorepos, wrapping Go tooling in Nx often adds unnecessary complexity.
*   **The "Go Way"**: Go has its own powerful toolchain (`go build`, `go test`, `go mod`).
*   **Orchestration**: We will use a simple root **Makefile** to coordinate the two projects (e.g., `make dev` starts both). This keeps the barrier to entry low and lets you learn the native Go tools directly.
