# Agent Guidance

- Use **pnpm** for all package management commands. Run `pnpm install` before tests or development.
- Start local development with `pnpm dev` from the repository root. This runs all workspaces in parallel.
- Run tests using `pnpm test` at the root. API tests use Vitest; web e2e tests use Playwright.
- Docker compose files are in `infra/` for local and dev usage.
- Worker scaling details are documented in `docs/agents.md`.
