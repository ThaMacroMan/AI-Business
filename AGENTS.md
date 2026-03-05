# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js App Router project.
- `app/`: Route modules and global UI entry points (`layout.tsx`, `page.tsx`, `globals.css`).
- `public/`: Static assets served at the site root (icons, SVGs, images).
- Root config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.

Use `@/*` imports (configured in `tsconfig.json`) for shared modules, for example: `import Hero from "@/components/Hero"`.

## Build, Test, and Development Commands
- `npm run dev`: Start local development server at `http://localhost:3000`.
- `npm run build`: Create a production build.
- `npm run start`: Serve the production build locally.
- `npm run lint`: Run ESLint with Next.js + TypeScript rules.

Run `npm install` before first use. Prefer `npm` to keep `package-lock.json` authoritative.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts`/`.tsx`) with `strict` mode enabled.
- Indentation: 2 spaces; keep imports grouped and use double quotes (match existing files).
- Components: `PascalCase` filenames for reusable components (example: `components/ServiceCard.tsx`).
- Routes/folders in `app/`: lowercase and descriptive (example: `app/services/page.tsx`).
- Styling: Tailwind utilities in JSX and shared tokens in `app/globals.css`.

Lint before opening a PR and resolve all warnings that indicate correctness or accessibility issues.

## Testing Guidelines
There is currently no test runner configured. For now:
- Treat `npm run lint` and `npm run build` as required validation checks.
- For UI changes, manually verify key paths in desktop and mobile breakpoints.

When adding tests, colocate them near features (`app/**/__tests__`) and use `*.test.ts(x)` naming.

## Commit & Pull Request Guidelines
Git history is minimal (`Initial commit from Create Next App`), so use clear, imperative commit subjects:
- Example: `Add services landing page hero section`
- Keep subject lines concise (about 50-72 chars).

PRs should include:
- What changed and why.
- Screenshots/GIFs for visual changes.
- Manual verification steps and lint/build results.
- Linked issue/ticket when applicable.

## Security & Configuration Tips
- Never commit secrets; keep credentials in `.env.local` (ignored by Git).
- Review third-party scripts/assets before adding them to `public/` or runtime code.
