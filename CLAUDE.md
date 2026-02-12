# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Code Standards - MANDATORY

**SOLID Principles:** All code must follow SOLID principles. Before writing: consider single responsibility, extensibility over modification, minimal interfaces, and dependency on abstractions not implementations.

**Testing:** Write tests for new features, update tests when changing code, run tests before commits.

**Git:** Branches: `feature/name`, `bugfix/name`, `hotfix/name`. Commits: Imperative verb + capitalized (e.g., "Add budget tracker"). Include Co-Authored-By tag.

**Naming:**
- Files: `kebab-case.tsx`, hooks: `useHookName.ts`
- Components: `PascalCase`, named exports only
- Functions: `camelCase` verb-first, booleans: `is/has/should` prefix
- Types: `PascalCase`, props: `ComponentNameProps`, no `I` prefix
- Constants: `SCREAMING_SNAKE_CASE`

## Critical Architecture Patterns

### State: Hooks + localStorage (No Redux/Context)

**Single source of truth:** `useExpenses()` hook wraps `useLocalStorage` for automatic persistence.
```typescript
const { expenses, addExpense, isInitialized } = useExpenses();
```

**Currency:** Store as cents (integers) to avoid float precision issues. `dollarsToCents()` for input, `formatCurrency()` for display.

**SSR:** Always check `isInitialized` before rendering data-dependent content to prevent hydration mismatches.

### Component Tiers

1. **UI Primitives** (`components/ui/`): Headless with `forwardRef`, accept `className`, use `cn()` utility
2. **Feature Components** (`components/*/`): Import `useExpenses()` directly, compose UI primitives
3. **Pages** (`app/*/page.tsx`): Minimal logic, use `'use client'` for hooks

### Forms: react-hook-form + Zod

```typescript
const form = useForm({
  resolver: zodResolver(expenseFormSchema), // From lib/validations.tsUserProfile
  defaultValues: { ... }
});
```

### Data Model: Storage vs Form

**Storage:** `Expense` uses ISO date strings, amounts in cents (integers)
**Forms:** `ExpenseFormData` uses Date objects, amounts as dollar strings
**Conversion:** Always use `dollarsToCents()` and `formatCurrency()` utilities

### Charts: Recharts with Category Colors

Wrap in `<ResponsiveContainer>`, map `CATEGORY_COLORS` from `lib/constants.ts` to `<Cell>` components.

## Adding Features

**New Route:**
1. Create `app/route/page.tsx` with `'use client'`
2. Update `components/layout/navigation.tsx` navItems array

**New Component:**
- UI primitive: `components/ui/`, use `forwardRef` + `cn()`
- Feature: Import `useExpenses()`, compose UI primitives

**Dates:** Use `date-fns` only. Store as ISO strings. Use `startOfDay/endOfDay/isWithinInterval` for ranges.

**Styling:** Tailwind utilities only with `cn()` helper. Category colors from `CATEGORY_COLORS` constant.

## Project Constraints

- Client-side only (no backend)
- localStorage persistence (check `isInitialized` for SSR)
- TypeScript strict mode
- No default exports
