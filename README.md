# kacperpilkowski.pl

> Personal website — CV, blog, and showcase. Built with Angular and .NET on Azure.

[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular)](https://angular.dev)
[![.NET](https://img.shields.io/badge/.NET-9-512BD4?logo=dotnet)](https://dotnet.microsoft.com)
[![Azure](https://img.shields.io/badge/Azure-Hosted-0078D4?logo=microsoftazure)](https://azure.microsoft.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

This is my personal website — a full-stack application serving as an interactive CV, technical blog, and portfolio. It's designed to be fast, SEO-friendly, and fully responsive across all devices.

The site demonstrates real-world engineering decisions: build-time prerendering for SEO and performance, a clean REST API, CI/CD on Azure, and a component-driven Angular frontend.

---

## Features

- **CV / About** — Experience, skills, certifications (AZ-204, AZ-900), and contact info
- **Blog** — Technical articles with Markdown support and syntax highlighting
- **Portfolio** — Project showcases with tech stack breakdowns
- **Dark / Light theme** — System preference detection with manual toggle
- **SEO-optimised** — build-time prerendering, structured data (JSON-LD), Open Graph, canonical URLs
- **Performance-first** — Lazy loading, image optimisation, Core Web Vitals focused

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Angular 19 | SPA framework with build-time prerendering |
| Angular Material / Custom design system | UI components |
| TypeScript | Type-safe client code |
| SCSS | Styling with design tokens |
| PWA | Offline support, installable |

### Backend

| Technology | Purpose |
|---|---|
| ASP.NET Core 9 | REST API |
| Entity Framework Core | ORM |
| Azure SQL / Cosmos DB | Data storage |
| Azure Blob Storage | Media & asset hosting |

### Infrastructure

| Technology | Purpose |
|---|---|
| Azure App Service | API hosting |
| Azure Static Web Apps | Frontend hosting — Free tier (prerendered static files) |
| Azure CDN | Static asset distribution |
| GitHub Actions | CI/CD pipelines |
| Azure Application Insights | Monitoring & telemetry |

---

## Project Structure

```
/
├── frontend/                  # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/          # Auth, interceptors, guards
│   │   │   ├── features/      # CV, blog, portfolio pages
│   │   │   ├── shared/        # Reusable components, pipes, directives
│   │   │   └── app.routes.ts
│   │   ├── assets/
│   │   └── styles/            # Global SCSS, design tokens
│   ├── prerender.config.ts    # Routes to prerender at build time
│   └── angular.json
│
├── backend/                   # ASP.NET Core API
│   ├── src/
│   │   ├── Api/               # Controllers, middleware, configuration
│   │   ├── Application/       # Use cases, DTOs, interfaces
│   │   ├── Domain/            # Entities, domain logic
│   │   └── Infrastructure/    # EF Core, external services, repos
│   └── tests/
│       ├── Unit/
│       └── Integration/
│
├── .github/
│   └── workflows/             # CI/CD pipelines
│       ├── frontend.yml
│       └── backend.yml
│
└── infra/                     # IaC (Bicep / Terraform)
```

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org)
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Angular CLI](https://angular.dev/tools/cli) — `npm install -g @angular/cli`
- [Azure CLI](https://learn.microsoft.com/cli/azure/) _(optional, for infrastructure)_

### Local Development

**1. Clone the repository**

```bash
git clone https://github.com/kacperpilkowski/kacperpilkowski.pl.git
cd kacperpilkowski.pl
```

**2. Configure environment**

```bash
# Backend
cp backend/src/Api/appsettings.Development.example.json \
   backend/src/Api/appsettings.Development.json
# Fill in connection strings and secrets

# Frontend
cp frontend/src/environments/environment.development.example.ts \
   frontend/src/environments/environment.development.ts
```

**3. Start the backend**

```bash
cd backend/src/Api
dotnet run
# API available at https://localhost:7000
```

**4. Start the frontend**

```bash
cd frontend
npm install
ng serve
# App available at http://localhost:4200
```

### Building prerendered output locally

```bash
cd frontend
ng build --configuration production
# Prerendered HTML files output to dist/browser/
```

---

## Testing

### Backend

```bash
cd backend
dotnet test                      # All tests
dotnet test --filter Category=Unit          # Unit tests only
dotnet test --filter Category=Integration   # Integration tests only
```

### Frontend

```bash
cd frontend
ng test                          # Unit tests (Karma / Jest)
ng e2e                           # E2E tests (Playwright)
```

---

## Deployment

Deployments are triggered automatically via GitHub Actions:

| Branch | Environment | Trigger |
|---|---|---|
| `main` | Production | Push / merge |
| `develop` | Staging | Push |
| `feature/*` | PR preview | Pull request |

Manual deployment to Azure:

```bash
# Backend — Azure App Service
cd backend
dotnet publish -c Release
az webapp deploy ...

# Frontend — Azure Static Web Apps
cd frontend
ng build --configuration production
az staticwebapp deploy ...
```

---

## Dynamic Prerendering

Blog article pages are prerendered dynamically at build time — Angular fetches all published slugs from the API during the build and generates a static HTML file per article.

### How it works

**1. `prerender.config.ts` — route discovery**

```typescript
export default {
  routes: [
    {
      path: '/blog/:slug',
      async getPrerenderParams() {
        const response = await fetch('https://api.kacperpilkowski.pl/articles/slugs');
        const slugs = await response.json();
        return slugs.map((slug: string) => ({ slug }));
      }
    }
  ]
} satisfies ApplicationConfig;
```

**2. API endpoint — slug list**

```csharp
[HttpGet("slugs")]
public async Task<IActionResult> GetSlugs()
{
    var slugs = await _db.Articles
        .Where(a => a.IsPublished)
        .Select(a => a.Slug)
        .ToListAsync();

    return Ok(slugs);
}
```

**3. Build output**

```
dist/browser/
├── index.html
├── blog/
│   ├── my-first-article/index.html     ← fully prerendered, SEO ready
│   ├── azure-tips-2024/index.html
│   └── ...
```

### Publish → rebuild flow

Publishing a new article automatically triggers a frontend rebuild via GitHub Actions `repository_dispatch`:

```
POST /articles/publish
  → Save to DB
  → Call GitHub API (repository_dispatch: article-published)
    → GitHub Actions: ng build --configuration production
      → prerender.config.ts fetches /articles/slugs
      → New article page prerendered
    → Deploy to Azure Static Web Apps
```

The workflow uses `concurrency` to avoid parallel builds if multiple articles are published in quick succession:

```yaml
on:
  push:
    branches: [main]
  repository_dispatch:
    types: [article-published]

concurrency:
  group: frontend-build
  cancel-in-progress: true
```

---

## SEO & Performance

This site is built with discoverability and speed in mind:

- **Build-time prerendering** — all routes rendered to static HTML at deploy time; no server needed to serve pages
- **Database-driven route discovery** — `getPrerenderParams` fetches slugs from the API at build time, generating one HTML file per article
- **Rebuild on publish** — the .NET API dispatches a GitHub Actions event on article publish, keeping content fresh automatically
- **Lazy-loaded routes** — only the code needed for the current page is loaded
- **`<meta>` & Open Graph tags** — set per page using Angular's `Meta` service, baked into prerendered HTML
- **JSON-LD structured data** — Person, BlogPosting, and BreadcrumbList schemas
- **Sitemap & robots.txt** — generated at build time and deployed alongside static files
- **Image optimisation** — responsive images with `srcset`, served via Azure CDN
- **Core Web Vitals** monitored via Application Insights and reported in CI

---

## Architecture Decisions

Key decisions are documented as Architecture Decision Records (ADRs) in [`docs/adr/`](docs/adr/).

Notable decisions:

- [ADR-001: Prerendering over SSR for a CV/blog workload](docs/adr/001-rendering-strategy.md)
- [ADR-002: Clean Architecture for the API layer](docs/adr/002-api-architecture.md)
- [ADR-003: Azure Static Web Apps for frontend hosting](docs/adr/003-hosting-strategy.md)
- [ADR-004: Database-driven route discovery for prerendering](docs/adr/004-dynamic-prerender-routes.md)
- [ADR-005: API-triggered rebuild via GitHub repository_dispatch](docs/adr/005-publish-trigger.md)

---

## Roadmap

- [ ] Full-text search on blog posts
- [ ] Comment system (GitHub Discussions integration)
- [ ] RSS feed for blog
- [ ] Multi-language support (EN / PL)
- [ ] Admin panel for blog post management

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

*Built by [Kacper Pilkowski](https://kacperpilkowski.pl) — Solutions Architect & Senior .NET Developer*