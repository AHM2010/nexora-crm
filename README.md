# Nexora CRM Dashboard

Nexora is a modern, responsive CRM dashboard for managing customers, deals, tasks, sales activity, and workspace preferences. It provides a polished demonstration interface backed by typed local data and browser-based demo authentication.

## Features

- Business dashboard with KPIs, sales charts, recent activity, and upcoming tasks
- Searchable, sortable, filterable, and paginated customer directory
- Detailed customer profiles with activity, notes, statistics, and deals
- Kanban-style sales pipeline with stage and priority filtering
- Task management with status, priority, search, and sorting controls
- Profile, notification, appearance, language, and security settings
- Responsive desktop sidebar and accessible mobile navigation drawer
- Light and dark themes
- Loading, empty, validation, error, and 404 states
- Reduced-motion support and keyboard-accessible controls

## Tech Stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Base UI](https://base-ui.com/) and shadcn components
- [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)
- [Recharts](https://recharts.org/) for data visualization
- [Motion](https://motion.dev/) for animations
- [Lucide React](https://lucide.dev/) for icons

## Folder Structure

```text
nexora/
├── app/                    # Routes, layouts, metadata, and route states
│   ├── (dashboard)/        # Protected CRM routes
│   └── login/              # Authentication screen
├── components/
│   ├── auth/               # Demo authentication components
│   ├── brand/              # Nexora branding
│   ├── customers/          # Customer directory and detail views
│   ├── dashboard/          # Dashboard widgets and charts
│   ├── deals/              # Sales pipeline components
│   ├── layout/             # Sidebar, navbar, and application shell
│   ├── settings/           # Profile and preference forms
│   ├── shared/             # Reusable product-level components
│   ├── tasks/              # Task management components
│   └── ui/                 # Reusable UI primitives
├── data/                   # Typed demonstration datasets
├── lib/                    # Shared utilities and auth constants
├── messages/               # English and Arabic message catalogs
├── public/                 # Brand assets and favicon
└── proxy.ts                # Route protection and authentication redirects
```

## Installation

### Prerequisites

- Node.js 20.9 or newer
- npm

### Setup

```bash
git clone <repository-url>
cd nexora
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Demo credentials are displayed on the sign-in page.

## Environment Setup

No environment variables are required for the current demo. Authentication and CRM data are stored locally for interface demonstration purposes.

When connecting a production backend:

1. Store local secrets in `.env.local`.
2. Keep all environment files containing secrets out of version control.
3. Prefix only intentionally public browser variables with `NEXT_PUBLIC_`.
4. Validate authentication and authorization on the server.

Example:

```env
DATABASE_URL=
AUTH_SECRET=
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint across the project |
| `npm run build` | Create and validate an optimized production build |
| `npm run start` | Serve the production build locally |

## Quality Verification

Before opening a pull request or deploying, run:

```bash
npm run lint
npm run build
```

The application has been reviewed at mobile, tablet, laptop, desktop, and ultra-wide viewport sizes.

## Screenshots

Add final repository screenshots in a `docs/screenshots` directory:

- `dashboard-desktop.png`
- `customers-tablet.png`
- `deals-mobile.png`
- `settings-dark.png`

## Deployment on Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Keep the automatically detected Next.js build settings.
4. Add production environment variables when backend services are introduced.
5. Deploy and verify protected routes, metadata, and authentication redirects.

If the deployment domain differs from the configured URL, update `metadataBase` in `app/layout.tsx`.

> [!IMPORTANT]
> The included authentication is a client-side demonstration. Replace it with secure, server-validated sessions and authorization before storing real customer information or exposing privileged operations.

## Future Improvements

- Connect a production database and CRM API through a server-only data layer
- Replace demo authentication with a secure identity provider
- Add automated unit, integration, and end-to-end tests to CI
- Add audit logging, application monitoring, and Web Vitals reporting
- Add localized routing for the English and Arabic message catalogs
- Add role-based access control and team management

## License

Add the appropriate project license before public distribution.
