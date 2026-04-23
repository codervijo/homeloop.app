# AI Agent Context — homeloop.app

## What this project is
A homeschool management web app for parents to track daily tasks, children's progress, compliance records, and generate transcripts.

## Stack
- **Build:** Vite + pnpm (runs inside Docker via `make buildsh` from the `sites/` parent)
- **Frontend:** React 18, TypeScript, Vite
- **UI:** MUI (Material UI v9) + shadcn/ui (Radix UI primitives) + Tailwind CSS
- **Routing:** React Router DOM v6
- **State:** Custom React Context store (`src/store.jsx`)
- **Data fetching:** TanStack React Query
- **PDF export:** jsPDF
- **Charts:** Recharts
- **Testing:** Vitest + Testing Library

## Project structure
```
homeloop.app/
  src/
    pages/            # Route-level page components
    components/       # Shared UI components (Layout, NavLink, shadcn/ui)
    hooks/            # Custom React hooks
    lib/              # Utility functions
    store.jsx         # Global app state (parent, children, tasks, streaks)
  public/             # Static assets
  docs/               # PRD and prompt history
  genai/              # Original Lovable-generated scaffold (can be deleted)
```

## How to run
All commands run inside the Docker container. From the `sites/` parent directory:

```bash
make buildsh                      # enter the container
# then inside the container:
cd homeloop.app && pnpm install   # install deps (generates pnpm-lock.yaml)
pnpm dev                          # start Vite dev server on :5173
pnpm build                        # production build
pnpm test                         # run Vitest tests
```

Or use the Makefile shortcut (installs + starts dev server):
```bash
make run proj=homeloop.app
```

## Dev environment
- **Package manager:** pnpm (managed by Volta inside Docker — never use npm or bun)
- **Container:** Debian-based Docker image defined at `../Dockerfile` (parent `sites/` dir)
- **Mount:** The container mounts the entire `sites/` directory to `/usr/src/app/`, so this project is at `/usr/src/app/homeloop.app/` inside the container
- **Entry:** `make buildsh` from `sites/` builds and enters the container interactively
- **Makefile shortcut:** `make run proj=homeloop.app` runs install + dev server in one step

## Key conventions
- Pages live in `src/pages/`, mixed JSX and TSX files
- State is managed via a single context store in `store.jsx`; use `useStore()` hook to access
- MUI is the primary component system; shadcn/ui components live in `src/components/ui/`
- jsPDF is used for transcript PDF generation

## Out of scope / don't touch
- <!-- leave blank for user to fill -->
