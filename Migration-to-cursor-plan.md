## Migration Plan — Cursor Stack Transition

This plan follows the 12-step Framework and includes a dedicated phase: DB Migration & Reconnection. Each task is a tickable item to track progress.

Legend and execution rules
- [Cursor]: Done inside this repo by me (code/migrations/policies/config files).
- [External]: You do this outside Cursor (dashboards/CLI/secrets). After every [External] item there is a validation gate. I will explicitly ask you to confirm completion. We will not proceed until you confirm.

### Phase 1: FOUNDATIONS
- [ ] Confirm project scope, users, and MVP boundaries [External]
- [ ] Freeze current no-code system changes until cutover plan exists [External]
- [ ] Decide target hosting: Netlify [External]
- [ ] Decide target DB/Auth/Storage: Supabase (Postgres + GoTrue + Storage) [External]
- [ ] Choose API runtime: Netlify Functions (Node) with Hono router [External]
- [ ] Define cutover strategy: <zero|minimal|window> [External]
- [ ] Create Supabase project and select region; record `VITE_SUPABASE_URL` [External]
- [ ] Validation gate (Foundations): Confirm all above are done before proceeding [External]

Variables to fill
- Source DB: <type|version> (expected: D1/SQLite)
- Supabase Region: <EU|US>
- Repository: <URL>

Next steps
- [ ] Confirm D1 export access and data volume [External]
- [ ] Validation gate: Confirm D1 export access details shared (DB name, account) [External]

### Phase 2: UI FOUNDATION (No backend wiring)
- [ ] Inventory pages and routes in `src/react-app` [Cursor]
- [ ] Ensure UI renders with mock data only where needed [Cursor]
- [ ] Identify components that depend on live APIs (mark for refactor) [Cursor]

Variables to fill
- Frontend Framework: React + Vite

Next steps
- [ ] List UI areas currently calling `/api/*`

### Phase 3: DESIGN SYSTEM & BRANDING
- [ ] Confirm design tokens (colors, typography) and Tailwind config [Cursor]
- [ ] Verify modals, transitions, mobile gestures [Cursor]
- [ ] Validate accessibility basics (contrast, focus states) [Cursor]
- [ ] Provide branding assets (logo, favicon) if changes are required [External]
- [ ] Validation gate: Confirm assets provided/approved [External]

Variables to fill
- Branding assets: <logo|favicon>

Next steps
- [ ] Document any pending UI polish post-migration

### Phase 4: DATABASE STRUCTURE (Target Schema)
- [ ] Reverse-engineer current schema from `migrations/*.sql` [Cursor]
- [ ] Design Postgres schema with proper types, PKs, FKs, indexes [Cursor]
- [ ] Define RLS strategy (table-by-table, minimal allow rules) [Cursor]
- [ ] Validation gate: Approve target schema and policies before applying [External]

Variables to fill
- Tables: `users`, `plans`, `diagramas`, `versiones_diagrama`, `diagram_variants`, `diagram_usage`, `webhook_log`

Next steps
- [ ] Prepare initial SQL migration for Supabase

### Phase 4B: DB MIGRATION & RECONNECTION
- [ ] Create `stack-transition/data-migration-plan.md` with sections A–J [Cursor]
- [ ] Create `db/migrations/0001_init.sql` (schema, RLS, policies) [Cursor]
- [ ] Create `scripts/etl/` and choose ETL method (psql \copy / CLI / scripts) [Cursor]
- [ ] Source DB discovery (type/version, credentials) [External]
- [ ] Validation gate: Confirm source DB details shared (D1 name/ID, access method) [External]
- [ ] Schema extraction from D1 (export SQL/CSV via `wrangler d1 export`) [External]
- [ ] Validation gate: Confirm export files are available to load [External]
- [ ] Transform schema to Postgres types and constraints [Cursor]
- [ ] Apply migrations to Supabase (CLI `supabase db push` or SQL execution) [External]
- [ ] Validation gate: Confirm schema applied successfully in Supabase [External]
- [ ] Load order defined for FKs: plans → users → diagramas → versiones → variants → usage → webhooks [Cursor]
- [ ] Execute ETL load into Supabase following order [External]
- [ ] Validation gate: Confirm row counts and integrity checks match (≥99.99%) [External]
- [ ] AUTH migration policy (re-hash/reset/magic-link) [Cursor]
- [ ] STORAGE migration plan (audio/files if applicable) [Cursor]
- [ ] Validation plan (row counts, constraints, checksums) [Cursor]
- [ ] Cutover plan (read-only window, delta sync, switch envs) [Cursor]
- [ ] Rollback plan (criteria, steps, timing) [Cursor]

Variables to fill
- Export Access: <wrangler d1 export | SQL dump | CSV>
- Volume: <rows|GB>
- Downtime Strategy: <zero|minimal|window>

Next steps
- [ ] Run dry-run migration on a Supabase preview DB

### Phase 5: CONNECTIONS (Frontend ↔ API ↔ DB)
- [ ] Replace `@getmocha/users-service` with Supabase Auth in the UI [Cursor]
- [ ] Implement `supabase-js` client and session handling [Cursor]
- [ ] Create `.env.example` with required vars [Cursor]
- [ ] Provide local `.env` values for development (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) [External]
- [ ] Validation gate: Confirm local dev auth works (login, session) [External]
- [ ] Port `/api/*` endpoints to Netlify Functions using Hono [Cursor]
- [ ] Connect API to Supabase (service role for server-side, anon for client) [Cursor]
- [ ] Secure routes with RLS plus server-side checks for privileged ops [Cursor]

Variables to fill
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE`

Next steps
- [ ] Ship minimal endpoint parity for: generate diagram, diagrams CRUD, credit status

### Phase 6: CORE FEATURES
- [ ] Implement diagram generation with AI provider via server functions [Cursor]
- [ ] Provide AI provider keys as server env (OpenAI/Anthropic) [External]
- [ ] Validation gate: Confirm server can call AI API successfully [External]
- [ ] Implement credits flow (consume, status) transactionally in Postgres [Cursor]
- [ ] Implement diagram variants save/fetch [Cursor]
- [ ] Implement versions restore/list endpoints [Cursor]

Variables to fill
- AI provider keys: `OPENAI_API_KEY`/`ANTHROPIC_API_KEY`

Next steps
- [ ] Add integration tests for core flows

### Phase 7: MONETIZATION (Stripe)
- [ ] Configure Stripe products/prices to match `plans` [External]
- [ ] Validation gate: Confirm product/price IDs available [External]
- [ ] Create webhook function; verify signatures; update `users` and `plans` [Cursor]
- [ ] Set Stripe secrets in server env (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`) [External]
- [ ] Validation gate: Confirm webhook receives events in test mode [External]
- [ ] Sync `stripe_price_id` with DB; test plan upgrades/downgrades [Cursor]

Variables to fill
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

Next steps
- [ ] End-to-end tests in test mode

### Phase 8: ADVANCED FEATURES
- [ ] Realtime or background processing if needed [Cursor]
- [ ] Optional: Supabase Edge Functions for latency-critical paths [Cursor]

Variables to fill
- Feature flags: <names>

Next steps
- [ ] Performance budget and profiling targets

### Phase 9: MARKETING & LANDING
- [ ] Ensure landing content and SEO meta [Cursor]
- [ ] Add privacy and pricing pages parity [Cursor]

Variables to fill
- Domain: <custom domain>

Next steps
- [ ] QA pass on responsive/SEO

### Phase 10: OPTIMIZATION
- [ ] Audit bundle (Mermaid chunking already optimized in `vite.config.ts`) [Cursor]
- [ ] Add query indexes and analyze slow queries [Cursor]
- [ ] Apply caching where safe [Cursor]

Variables to fill
- Perf KPIs: <TTI, LCP, p95 latency>

Next steps
- [ ] Track metrics baseline vs post-migration

### Phase 11: DEPLOYMENT
- [ ] Create Netlify site and connect Git repository [External]
- [ ] Validation gate: Confirm first build succeeds on Netlify [External]
- [ ] Add `netlify.toml` with SPA redirects: `/* → /index.html 200` [Cursor]
- [ ] Set env vars in Netlify UI (client/server separation) [External]
- [ ] Validation gate: Confirm environment variables present in runtime [External]
- [ ] Protect server secrets (service-role, Stripe, AI) from client [Cursor]
- [ ] Set up preview deploys for PRs [External]
- [ ] Validation gate: Confirm preview deployments functional [External]

Variables to fill
- Netlify site ID: <id>

Next steps
- [ ] Smoke test staging before production

### Phase 12: ANALYTICS & MONITORING
- [ ] Add error tracking (Sentry) and analytics [Cursor]
- [ ] Enable Supabase DB monitoring and alerts in dashboard [External]
- [ ] Validation gate: Confirm alerts/metrics visible [External]
- [ ] Usage dashboards for credits and generation volume [Cursor]

Variables to fill
- Monitoring tools: <Sentry|Logflare|Netlify analytics>

Next steps
- [ ] Define alert thresholds and on-call procedure

### Cross-cutting Deliverables
- [ ] `stack-transition/data-migration-plan.md` (A–J details)
- [ ] `db/migrations/*.sql` (Postgres schema + policies)
- [ ] `scripts/etl/*` (export/transform/load)
- [ ] `CHANGELOG.md` (atomic edits log)

### Initial Execution Order (minimal changes first)
- [ ] Freeze current no-code changes [External]
- [ ] Create Supabase project and select region [External]
- [ ] Validation gate: Confirm Supabase URL available [External]
- [ ] Create `stack-transition/data-migration-plan.md` scaffold [Cursor]
- [ ] Author `db/migrations/0001_init.sql` (tables + RLS + minimal policies) [Cursor]
- [ ] Prepare `.env.example` and local `.env` with Supabase keys [Cursor/External]
- [ ] Validation gate: Confirm local dev can reach Supabase [External]
- [ ] Defer Netlify site creation to Phase 11 to avoid early CI noise [Note]


