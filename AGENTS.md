# AGENTS.md — ggmanolo coding standards

This file is read by Gentleman Guardian Angel (GGA) before every commit.
Review all staged `.ts`, `.tsx`, and `.js` changes against these rules.

---

## Stack

- **Framework**: Next.js 15 App Router (React 19)
- **Language**: TypeScript strict mode
- **Styling**: SCSS Modules (no Tailwind, no inline styles except via JS DOM mutation for animations)
- **State**: Zustand
- **Animations**: GSAP, native `requestAnimationFrame` — no CSS-in-JS
- **Package manager**: Yarn 1.x (classic)

---

## Rules

### TypeScript

- No `any` — use proper types or `unknown`
- No non-null assertions (`!`) unless inside a guard
- Prefer `type` over `interface` for component props
- All component props must be typed

### React / Next.js

- No `"use client"` unless the component needs browser APIs or event handlers
- No `forwardRef` — use ref as a regular prop (React 19)
- No `.propTypes` — TypeScript handles this
- Prefer `useCallback` for event handlers passed to children or used in `useEffect` deps
- Prefer `useRef` DOM mutations for animations over `useState` re-renders
- Always add `aria-hidden="true"` to decorative/animation divs

### SCSS Modules

- No global styles except in `src/styles/`
- No magic numbers — use CSS custom properties (`var(--...)`) or SCSS variables
- All class names in camelCase or kebab-case consistent with the existing file

### Performance

- `will-change` must be added dynamically (on hover/interaction start) and removed after — never static
- All animation loops must use `requestAnimationFrame` and cancel on cleanup
- Images must use `next/image` with `fill`, `sizes`, and `placeholder="blur"`

### Security

- No `dangerouslySetInnerHTML`
- No `eval` or dynamic `import()` with user-provided strings
- No credentials or tokens in source code

### Commits

- Conventional commits only: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`, `perf`
- No AI attribution in commit messages (no "Co-Authored-By: AI")
- Scope in lowercase: `fix(project): ...`, `chore(deps): ...`

---

## What to flag

- `APPROVE` if the diff follows all rules above
- `REJECT` with specific line references if any rule is violated
- Do not flag style preferences — only flag actual rule violations
