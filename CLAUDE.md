# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website with CV, blog, and portfolio. Angular SSR frontend + ASP.NET Core Minimal API backend, deployed to Azure (Static Web Apps + App Service).

## Architecture

```
apps/
  api/        ASP.NET Core 10 Minimal API (C#)
  frontend/   Angular 21 SSR app (TypeScript/Tailwind CSS)
infra/
  terraform/  Azure infrastructure (App Service, Static Web Apps, CDN)
docs/
  adr/        Architecture Decision Records
  runbooks/   Local setup, deployment, env vars, monitoring, testing strategy
```

## CI/CD

GitHub Actions runs on PRs to `main`:
- `.github/workflows/ci.yml` — builds and tests both API and frontend
- `.github/workflows/terraform-plan.yml` — validates Terraform on infra changes

## Sub-Agents

Specialized agents are defined in `.claude/agents/`. Delegate work to them rather than handling everything in the main context.

| Agent | Trigger |
|-------|---------|
| `backend-dev` | Any work in `apps/api/` — endpoints, services, EF Core models, middleware |
| `frontend-dev` | Any work in `apps/frontend/` — components, routing, SSR, Tailwind CSS |
| `qa-engineer` | Writing or running tests, investigating test failures, verifying features |
| `infra-dev` | Any work in `infra/terraform/` or `.github/workflows/` |
| `code-reviewer` | After implementing any feature or fix, before committing |
| `adr-writer` | When a significant architectural decision needs to be recorded in `docs/adr/` |

### Orchestration rules

- **Single-area tasks** → delegate entirely to the relevant agent.
  _Example: "Add a blog endpoint" → `backend-dev`_

- **Cross-cutting features** → sequence agents: implement first, then validate.
  _Example: "Add blog feature" → `backend-dev` (API) + `frontend-dev` (UI) → `qa-engineer` (tests) → `code-reviewer` (review)_

- **Architectural decisions** → always end with `adr-writer` when a choice has long-term consequences.
  _Example: "Should we use Cosmos DB or Azure SQL?" → decide → `adr-writer`_

- **Infrastructure changes** → `infra-dev` for Terraform/CI, then `code-reviewer` before pushing.

- **Always run `code-reviewer` before committing** non-trivial changes.
