# Code Review Command

Conduct a thorough, methodical code review of `$ARGUMENTS`.

## Reference Standards

Before reviewing, study these exemplar files to internalize our established conventions:

- `src/components/expenses/expense-item.tsx` — React component patterns
- `src/utils/dataValidation.ts` — utility function style
- `src/lib/hooks/useExpenses.ts` — custom hook architecture

## Workflow

1. **Internalize**: Read each exemplar file above to absorb the project's design philosophy, naming schemes, and stylistic norms
2. **Evaluate**: Scrutinize `$ARGUMENTS` through the lens of those standards
3. **Document**: Produce a detailed written assessment addressing:
    - Architectural coherence and file organization
    - Consistency with established project patterns
    - Runtime efficiency and potential bottlenecks
    - Security posture and vulnerability exposure
    - Long-term maintainability and readability
    - Gaps in test coverage or missing edge cases

## Deliverables

- Write each review to `ai-code-reviews/{filename}.review.md`
- Reference specific line numbers when flagging issues
- Pair every critique with a concrete, actionable fix
- Assign an overall quality grade: **Excellent / Good / Needs Work / Poor**
- Estimate the rework effort required: **Low / Medium / High**

## Quality Gates

Each file must be evaluated against the following criteria:

- Naming conventions align with the broader codebase
- Error paths are handled gracefully and explicitly
- No embedded secrets, magic numbers, or hardcoded configuration
- Documentation and inline comments are present where intent isn't obvious
- Design decisions mirror those seen in the reference files
- No apparent security weaknesses (injection, data leakage, improper access)
- Performance trade-offs have been considered and justified