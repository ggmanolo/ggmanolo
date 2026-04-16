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

## TypeScript

- No `any` — use `unknown` and narrow, or define a proper type
- No non-null assertions (`!`) unless inside an explicit null/undefined guard
- Prefer `type` over `interface` for component props
- All component props must be explicitly typed in a `type` declaration
- Spread types (`...rest`) inferred from TypeScript destructuring are NOT a violation — do not flag them

---

## React / Next.js

- Server Components are the default — add `"use client"` only when required
- Valid reasons for `"use client"`: hooks (`useState`, `useEffect`, `useRef`, etc.), browser APIs (`document.*`, `window.*`, `navigator.*`), event handlers (`onClick`, `onMouseEnter`, etc.), third-party client-only libraries
- Do NOT flag `"use client"` as a violation when the component uses any of the above

- **React 19 refs**: `ref` is a regular prop — do NOT use `forwardRef`. A component type that includes `ref?: Ref<T>` as a prop is the correct React 19 pattern — it is NOT a violation

- No `.propTypes` — TypeScript handles this
- Prefer `useCallback` for event handlers passed to children or used in `useEffect` deps
- Do not define components inside other components

- **`aria-hidden="true"`**: required only on purely decorative `<div>`s or `<span>`s that carry no semantic meaning and are invisible to screen readers by design. Do NOT add `aria-hidden` to: links (`<a>`, `<Link>`), buttons, elements with `aria-label`, or any interactive element. Flagging a `<Link aria-label="...">` as missing `aria-hidden` is incorrect

- **`useRef` for DOM mutations**: prefer `useRef` mutations over `useState` re-renders for animation state. This does NOT apply to `addEventListener`/`removeEventListener` calls inside `useEffect` — those are the correct React pattern for registering browser events and must NOT be flagged

---

## SCSS Modules

- No global styles except in `src/styles/`
- No magic numbers — use CSS custom properties (`var(--...)`) or SCSS variables
- All class names in camelCase or kebab-case consistent with the existing file

---

## Performance

- `will-change` must be added dynamically (on hover/interaction start) and removed on cleanup — never static in CSS
- This rule applies only to elements that perform CSS transforms or opacity animations. Do NOT flag components that have no animations for missing `will-change`
- All animation loops must use `requestAnimationFrame` and cancel on cleanup
- Images must use `next/image` with `fill`, `sizes`, and `placeholder="blur"`

---

## Security

- No `dangerouslySetInnerHTML`
- No `eval` or dynamic `import()` with user-provided strings
- No credentials or tokens in source code

---

## Commits

- Conventional commits only: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`, `perf`
- No AI attribution in commit messages (no "Co-Authored-By: AI")
- Scope in lowercase: `fix(project): ...`, `chore(deps): ...`

---

## What to flag

- `APPROVE` if the diff follows all rules above
- `REJECT` with specific line references if any rule is violated
- Do NOT flag style preferences, inferred types from destructuring, or patterns covered by the exceptions listed above
- Do NOT invent rules not listed in this file — only enforce what is explicitly stated
