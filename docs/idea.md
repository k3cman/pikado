# Pikado MVP Architecture & Planning

## Goal

Build a darts scoring + tournament management platform. Tablets at each board run a React scoreboard app; club admins manage tournaments, matches, players, and devices. Data is grouped by "club" while access is controlled by roles (not classic multi-tenancy isolation requirements for MVP).

---

## MVP Scope

1. Scorekeeping for 501 Double Out (single match, multiple legs)
2. Club-based grouping (each club has its own players, tournaments, boards)
3. Device (tablet) registration & assignment to boards
4. Tournament creation (single-elimination knockout) and match progression
5. Real-time score updates to spectators/admin dashboard
6. Basic player management (create players, assign to matches)

---

## Frontend (React)

- SPA with routing:
  - `/<club>/score/:matchId` – scoreboard kiosk
  - `/<club>/admin/tournaments` – list & create tournaments
  - `/<club>/admin/tournaments/:id` – bracket view & match control
  - `/<club>/admin/devices` – register & monitor tablets
  - `/<club>/admin/players` – player CRUD
  - `/login` – authentication
- Component Groups:
  - Scoreboard: large remaining score, keypad (0-9, CLR, preset totals), throw history, checkout suggestions, undo.
  - Tournament Dashboard: bracket, match states, board assignment.
  - Device Registration: input / QR code, status heartbeat.
  - Admin Console: players, devices, tournaments overview.
- State Management:
  - Local UI state via hooks.
  - Remote server state via React Query (TanStack Query) for caching, retries, optimistic dart throw updates.
  - Small global store (Zustand or Redux Toolkit) for auth/session & websocket connection.
- Real-Time:
  - WebSocket client subscribing to `club:{id}:tournament:{id}:match:{id}` channels.
  - Automatic reconnection; ephemeral presence pings.
- Performance: Debounce keypad inputs; optimistic leg score update before server confirmation.

---

## Backend Recommendation

### Option A (Primary): NestJS (TypeScript) + PostgreSQL + Prisma

- Pros: Same language as frontend, quick iteration, decorator-based modules, structured DI, built-in WebSocket gateway.
- Prisma: Typed schema, migrations, introspection, developer velocity.
- Scales horizontally with stateless pods (WebSocket scaling via Redis pub/sub later).

### Option B: Go (Gin/Fiber) + PostgreSQL + sqlc

- Pros: High performance, single static binary, strong concurrency.
- Cons: Additional language learning curve; manual boilerplate for auth, DI, websockets, testing.

### Pick for MVP: NestJS + Prisma (fastest path with strong type safety).

---

## Club & Role Model Strategy

- Shared schema with `club_id` column on all club-scoped tables.
- MVP does NOT require hard isolation between clubs beyond role checks; RLS optional (can be added later for stronger guarantees).
- Roles are assigned per user (global admin for platform operations, club admin for management inside one or more clubs, scorer for entering throws on assigned matches/boards).
- Future: add viewer, stats analyst, player login.

---

## Core Data Model (Initial)

-- Clubs: `id`, `name`, `slug`, `settings_json`, `created_at`.
-- Users: `id`, `email`, `password_hash`, `global_role` (platform_admin|none), `created_at`.
-- UserClubRoles: `user_id`, `club_id`, `role` (club_admin|scorer). (Allows a user to belong to multiple clubs.)
-- Devices: `id`, `club_id`, `board_id (nullable)`, `registration_code`, `status` (active|inactive), `last_seen_at`.
-- Boards: `id`, `club_id`, `label` (e.g. Board 1), `device_id (nullable)`.
-- Players: `id`, `club_id`, `display_name`, `notes`, `stats_json`.
-- Tournaments: `id`, `club_id`, `name`, `status` (draft|active|completed), `format` (knockout), `start_at`, `config_json`.
-- Matches: `id`, `tournament_id`, `board_id (nullable)`, `playerA_id`, `playerB_id`, `status` (pending|in_progress|completed), `best_of_sets`, `best_of_legs`, `sequence`, `winner_player_id (nullable)`.
- Legs: `id`, `match_id`, `sequence`, `status` (in_progress|completed), `starting_score` (501), `winner_player_id (nullable)`.
- Throws: `id`, `leg_id`, `player_id`, `dart_number` (1..3), `value` (1..20 or 25 or 50), `multiplier` (1|2|3), `score` (computed value), `bust` (bool), `created_at`.
- Events (optional later): audit/log table for key actions.

---

## Scoring Logic (501 Double Out)

- Each leg starts at 501 remaining.
- Input sequence of darts per turn (up to 3 unless leg ends earlier).
- Validate bust: If remaining - turn total < 0 OR == 1 OR (== 0 but last dart not double/bull double) => bust; revert remaining to pre-turn.
- Double-out enforcement: finishing dart must have `multiplier=2` (or bull value 50 considered double).
- Undo strategy: undo last dart or entire last turn (to confirm).
- Checkout Suggestions: Lookup table keyed by remaining (<= 170 typical) returning optimal sequence.

---

## API Surface (Draft)

REST Endpoints:

- Auth: `POST /auth/login`, `POST /auth/refresh`.
- Clubs: `GET /clubs/:id`.
- Devices: `POST /devices/register` (registration_code), `POST /devices/:id/heartbeat`.
- Players: `POST /players`, `GET /players/:id`, `GET /players`.
- Tournaments: `POST /tournaments`, `GET /tournaments/:id`, `POST /tournaments/:id/start`.
- Matches: `POST /matches` (create within tournament), `GET /matches/:id`, `POST /matches/:id/assign-board`, `POST /matches/:id/start`, `POST /matches/:id/advance`.
- Legs: `GET /legs/:id`, `POST /legs/:id/throw`, `POST /legs/:id/undo`.

WebSocket Events:

- `match.state` – full match + current leg snapshot.
- `score.update` – after each valid dart / bust.
- `match.complete` – winner + stats.
- `device.status` – last_seen & board assignment.
- `tournament.bracket` – bracket updates.

Auth Model:

- JWT Access Token (short-lived) containing `sub`, array of `club_roles` (club_id + role), `global_role`, `device_id (optional)`.
- Refresh token rotation stored server-side (or in Redis) hashed.
- Device token: limited-scope JWT minted after registration (scoring & heartbeat only).

---

## Security & Isolation

- Optional RLS (if enabled): `USING (club_id = ANY(current_setting('app.club_ids')::uuid[]))`.
- On request start (if RLS chosen): set `app.club_ids` from token club membership.
- Otherwise enforce access at application layer via role checks.
- Input validation via Zod or class-validator.
- Rate limiting on auth & throw endpoints (prevent spam clicks).

---

## Deployment & DevOps

- Containers: `frontend`, `backend`, `postgres`.
- Local dev: docker-compose with hot reload.
- Production: Single region initially (e.g. Fly.io / Railway / Render). Add Redis later for pub/sub horizontal scaling.
- Observability: Basic request logging + p99 latency, error tracking (Sentry) Phase 2.

---

## Testing Strategy

- Unit: Scoring engine (bust scenarios, double-out edge cases, undo). Checkout suggestion correctness.
- Integration: Match lifecycle (create -> assign board -> start -> finish). Device registration flow.
- WebSocket: Snapshot message contract tests.
- E2E later: Cypress/Playwright scoreboard interactions.

---

## Initial Milestones

1. Auth & Club role scoping (JWT + membership checks / optional RLS).
2. Device registration & heartbeat.
3. Player CRUD.
4. Tournament + match creation (knockout bracket generation).
5. Scoring engine + leg progression with WebSocket updates.
6. Admin dashboard & scoreboard UI.
7. Basic stats (three-dart average, highest checkout) after match completion.

---

## Future (Post-MVP)

- Additional games: 301, Cricket.
- Advanced tournament formats: Round-robin, double elimination.
- Player accounts & personal dashboards.
- Leaderboards & historical analytics.
- Offline tablet caching & sync.
- Multi-language support.
- Branding/theme per club.
- Spectator public live view.

---

## Open Questions (Need Your Input)

1. Club isolation: Is soft logical isolation (app-layer checks) sufficient or do you want RLS now?
2. Roles: Confirm MVP roles (platform_admin, club_admin, scorer). Any need for viewer role now?
3. Device environment: Pure browser (PWA) or native wrapper? Do tablets need offline scoring capability now?
4. Registration flow: Preferred method (QR code, numeric code entry, admin pre-provision)?
5. Additional game variants: Include any besides 501 Double Out in MVP?
6. Undo rule: Undo single dart vs entire last turn? Depth of undo allowed?
7. Checkout assistance: Display recommended finishes now or defer?
8. Match format complexity: Need sets (best-of-sets with legs per set) or just legs best-of for MVP?
9. Seeding: How are tournament brackets seeded (random, manual, ranking-based)?
10. Player accounts: Do players have credentials or only admins manage them?
11. Scale expectations: Max concurrent matches per club & projected number of clubs year 1?
12. Offline requirement: Must scoring continue if temporarily disconnected (queue & later sync)?
13. Internationalization: Any immediate multilingual needs?
14. Data retention: Retain all throw-level data indefinitely or archive/aggregate after completion?
15. Stats priority: Which metrics are top priority early (3-dart avg, first 9, checkout %, highest finish)?
16. Security/compliance: Any regulatory/gdpr logging & deletion requirements at MVP stage?
17. Alerts: Need real-time alerts for offline devices or stalled matches now?
18. UI adaptability: Must scoreboard support mobile phones or only tablets landscape?
19. Theming: Club-specific colors/logos required in MVP?
20. Deployment preference: Target cloud provider or constraints (cost cap, region)?
21. Undo after finish: Allow corrections after leg/match marked complete (reopen) or lock?
22. Spectator view: Public read-only bracket/score page needed at launch?
23. Authentication strength: Email/password only or add magic links/OTP?
24. Data export: CSV/JSON export needed for matches/tournaments?
25. Accessibility: Any a11y requirements (high contrast, screen reader support)?

---

## Next Steps After Answers

- Refine data model (add/remove fields).
- Draft Prisma schema & NestJS module layout.
- Define scoring service interface + unit test cases.
- Detail WebSocket event contracts (TypeScript types shared with frontend).

Please provide answers or preferences for the open questions; then I will refine and move to concrete schema & service design.
