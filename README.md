# homeloom.app

Homeschool management app — track tasks, children, compliance, and generate transcripts.

## Getting started

Runs inside Docker. From the `sites/` parent directory:

```bash
make buildsh                      # enter the dev container
cd homeloom.app && pnpm install   # install deps
pnpm dev                          # start Vite dev server on :5173
```

Or use the Makefile shortcut:
```bash
make run proj=homeloom.app
```
