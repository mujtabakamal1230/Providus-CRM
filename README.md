# Next.js Project Starter

A production-ready Next.js 15 project with App Router, TypeScript, Tailwind CSS v4, and a strict design system.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint 9 (flat config)
- **Fonts**: Afacad (headings) · Roboto (body) via `next/font`

## Design System

### Typography

| Class | Font | Size | Weight |
|-------|------|------|--------|
| `.text-h1` | Afacad | 60px | 700 |
| `.text-h2` | Afacad | 50px | 700 |
| `.text-h3` | Afacad | 45px | 600 |
| `.text-h4` | Afacad | 30px | 700 |
| `.text-p1` | Roboto | 22px | 600 |
| `.text-p2` | Roboto | 20px | 400 |
| `.text-p3` | Roboto | 14px | 400 |
| `.text-p4` | Roboto | 12px | 400 |

### Colors

| Token | Hex | Use |
|-------|-----|-----|
| Brand Blue | `#1D70C5` | Primary actions, links |
| Brand Blue Light | `#E2F2FF` | Backgrounds, highlights |
| Brand Green | `#38A81B` | Success, positive |
| Brand Green Light | `#A0FF88` | Secondary CTA, tags |
| Brand Pink Light | `#FAD3FF` | Accents, decorative |
| Brand Yellow Light | `#FFE072` | Warnings, highlights |

## Folder Structure

```
src/
├── app/                    # App Router pages & layouts
│   ├── layout.tsx          # Root layout (fonts, nav, footer)
│   ├── page.tsx            # Home page
│   ├── loading.tsx         # Global loading UI
│   └── not-found.tsx       # 404 page
├── components/
│   ├── ui/                 # Atomic components
│   │   ├── Typography.tsx  # <Heading> and <Text>
│   │   ├── Button.tsx      # <Button> with variants
│   │   ├── Badge.tsx       # <Badge>
│   │   ├── Card.tsx        # <Card>
│   │   └── index.ts
│   ├── layout/             # Structural components
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── sections/           # Page-level blocks
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       ├── CtaSection.tsx
│       └── index.ts
├── lib/
│   ├── tokens.ts           # Design tokens as TS constants
│   └── utils.ts            # cn() and shared helpers
├── styles/
│   └── globals.css         # Tailwind v4 @theme tokens + utilities
└── types/
    └── index.ts            # Shared TypeScript types
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript check (no emit)
```

## Adding a New Section

1. Create `src/components/sections/YourSection.tsx`
2. Use `<Section>` as the outer wrapper with a `background` prop
3. Use `<Container>` for content width
4. Use `<Heading>` and `<Text>` for all copy
5. Export from `src/components/sections/index.ts`
6. Import and use in `src/app/page.tsx`

See `AGENTS.md` for full rules.
