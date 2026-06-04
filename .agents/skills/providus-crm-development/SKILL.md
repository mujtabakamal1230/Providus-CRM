---
name: providus-crm-development
description: Guide development in the Providus CRM Next.js app. Use when modifying this repository, building UI, adding sections/components, changing TypeScript, debugging build issues, planning features, reviewing code, or verifying work against the project design system.
---

# Providus CRM Development

## Purpose

Use this skill as the project-specific operating guide for `C:\Providus\providus-crm`. It combines the repo rules in `AGENTS.md` with senior engineering workflows from production-grade agent skills: gather context, plan only as much as needed, implement in small slices, verify with evidence, and keep the design system intact.

## First Moves

1. Read `AGENTS.md` and the relevant files before changing code.
2. Identify whether the task is UI, API/interface, debugging, planning, review, or verification work.
3. Name any assumptions that could affect behavior, design, or scope.
4. Keep edits tightly scoped to the user request and existing project structure.
5. Prefer existing components and local patterns over new abstractions.

## Project Stack

- Next.js 15 App Router with TypeScript strict mode.
- React 19.
- Tailwind CSS v4 using custom properties in `src/styles/globals.css`.
- Fonts are loaded through `next/font/google` in `src/app/layout.tsx`.
- Source folders follow:
  - `src/app` for App Router pages and layouts.
  - `src/components/ui` for atomic reusable UI.
  - `src/components/sections` for page sections.
  - `src/components/layout` for structural wrappers.
  - `src/lib` for utilities and helpers.
  - `src/types` for shared TypeScript types.

## Design System Rules

All typography must go through `Heading` or `Text` from `@/components/ui/Typography`.

Allowed heading tokens:

| Token | Component Use | Font | Weight | Size | Line Height | Letter Spacing |
| --- | --- | --- | --- | --- | --- | --- |
| `h1` | `<Heading as="h1">` | Afacad | 700 | 60px | 60.9px | -1.24px |
| `h2` | `<Heading as="h2">` | Afacad | 700 | 50px | 45px | 0px |
| `h3` | `<Heading as="h3">` | Afacad | 600 | 45px | 25px | -0.39px |
| `h4` | `<Heading as="h4">` | Afacad | 700 | 30px | 35px | 0px |

Allowed text tokens:

| Token | Component Use | Font | Weight | Size | Line Height | Letter Spacing |
| --- | --- | --- | --- | --- | --- | --- |
| `p1` | `<Text variant="p1">` | Roboto | 600 | 22px | 60.9px | 0.24px |
| `p2` | `<Text variant="p2">` | Roboto | 400 | 20px | 45px | 0px |
| `p3` | `<Text variant="p3">` | Roboto | 400 | 14px | 25px | -0.39px |
| `p4` | `<Text variant="p4">` | Roboto | 400 | 12px | 35px | 0px |

Allowed color tokens:

| Token | Tailwind Class | Hex Reference |
| --- | --- | --- |
| `brand-blue` | `bg-brand-blue`, `text-brand-blue`, `border-brand-blue` | `#1D70C5` |
| `brand-blue-light` | `bg-brand-blue-light`, `text-brand-blue-light`, `border-brand-blue-light` | `#E2F2FF` |
| `brand-green` | `bg-brand-green`, `text-brand-green`, `border-brand-green` | `#38A81B` |
| `brand-green-light` | `bg-brand-green-light`, `text-brand-green-light`, `border-brand-green-light` | `#A0FF88` |
| `brand-pink-light` | `bg-brand-pink-light`, `text-brand-pink-light`, `border-brand-pink-light` | `#FAD3FF` |
| `brand-yellow-light` | `bg-brand-yellow-light`, `text-brand-yellow-light`, `border-brand-yellow-light` | `#FFE072` |

Do not introduce new font sizes, font weights, raw hex values, arbitrary pixel text sizes, inline styles, or one-off design tokens. If the current code has older hardcoded values, avoid spreading that pattern and prefer moving touched code toward tokens when it is safely in scope.

## UI Implementation Workflow

Use this workflow for pages, sections, and components:

1. Inspect adjacent components for import style, layout patterns, and naming.
2. Put new atomic UI in `src/components/ui`, new page sections in `src/components/sections`, and wrappers in `src/components/layout`.
3. Wrap new sections with `Section` from `@/components/layout/Section`.
4. Use `Container` from `@/components/layout/Container` for content width.
5. Use `Button` from `@/components/ui/Button` for actions.
6. Build mobile-first responsive layouts and check common breakpoints: 320px, 768px, 1024px, and 1440px.
7. Include meaningful loading, empty, and error states when the UI represents data.
8. Ensure interactive elements are keyboard accessible and have visible labels or `aria-label`.

Avoid generic AI-looking UI: purple gradients, oversized rounded cards, decorative blobs, shadow-heavy card grids, fake placeholder copy, and marketing pages when the user asked for an app or workflow.

## TypeScript and Architecture Rules

- Use explicit prop types or interfaces.
- Do not use `any`.
- Keep components small and focused.
- Use `cn` from `@/lib/utils` for class composition.
- Prefer composition over large configuration objects.
- Keep server and client boundaries intentional. Add `"use client"` only when hooks, browser APIs, or client interactivity require it.
- Follow App Router conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, and `not-found.tsx`.

## Planning Rules

For non-trivial work, produce a short plan before editing:

1. Context gathered.
2. Files likely touched.
3. Implementation slices.
4. Verification steps.

Keep tasks small enough to verify in one focused pass. If a task touches more than about five files, split it or explain why the broader edit is necessary.

## Debugging Rules

When something breaks:

1. Reproduce the failure with the smallest command or user flow.
2. Localize the failing file, component, or contract.
3. Make the smallest fix that addresses the cause.
4. Add or run a guard: type-check, build, lint, unit test, or browser check.
5. Report the evidence, not just that it "looks right."

## Review Rules

Before finishing, review the touched code for:

- Design system violations.
- TypeScript strictness and missing prop types.
- Broken imports or wrong folder placement.
- Accessibility issues.
- Responsive layout risks.
- Overly broad changes or unnecessary abstractions.

## Verification Commands

Use the commands that match the risk and scope:

```bash
npm run type-check
npm run build
npm run lint
npm run dev
```

For UI changes, also verify the rendered page in a browser when practical. Check console errors, layout at mobile and desktop widths, keyboard focus, and visible text wrapping.

## Completion Report

When done, summarize:

1. What changed.
2. Which files were touched.
3. Which verification commands ran and whether they passed.
4. Any remaining risks or follow-up worth knowing.
