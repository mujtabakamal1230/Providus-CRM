# Local Performance Audit Workflow

Lighthouse numbers from `next dev` are not production-accurate. Dev mode returns `Cache-Control: no-store`, serves `?v=` asset URLs, and ships development JavaScript such as `eval-source-map`. Always audit a production build.

## Production Local Flow

```powershell
pnpm.cmd run perf:build
pnpm.cmd run perf:start
pnpm.cmd run perf:guard -- http://localhost:3001/
pnpm.cmd run perf:vitals -- --base http://localhost:3001
```

If port `3001` is already running `next dev`, stop it before `perf:start`.

## Lighthouse Flow

After `perf:guard` passes, run Lighthouse against:

```text
http://localhost:3001/
```

Repeat the run three times and compare the median score. Do the same for:

```text
/about
/platform-expertise
/case-studies
/blog
/industries
/services/salesforce-consulting-services
```

## Budgets

- LCP: `< 2.5s`
- CLS: `< 0.1`
- TBT: `< 200ms`
- Total page weight: `< 1.5MB`
- JavaScript transfer: `< 300KB`

Hero content should reserve space with dimensions, min-heights, and aspect ratios. Do not use skeleton loaders for first-viewport hero content.
