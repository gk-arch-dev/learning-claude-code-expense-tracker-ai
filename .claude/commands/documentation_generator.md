# Feature Documentation Generator

Produce comprehensive, well-structured documentation for the following feature: `$ARGUMENTS`.

## Context Gathering

Before writing anything, build a complete picture of the feature:

1. **Explore**: Scan the codebase for any existing references, related modules, or prior implementations tied to this feature
2. **Understand**: Identify how this feature fits into the broader system architecture and what components it touches
3. **Reference**: Review existing documentation files (e.g., `docs/`, `README.md`, wiki pages) to match the project's documentation tone and format

## Documentation Sections

Generate a single, thorough document covering each of the following:

### 1. Overview
- Feature name and a concise one-paragraph summary
- The problem it solves and the value it delivers
- Target users or consuming systems

### 2. Scope & Boundaries
- What is explicitly included in this feature
- What is intentionally excluded or deferred
- Known constraints, assumptions, or dependencies

### 3. Technical Design
- High-level architecture and data flow
- Key components, services, or modules involved
- API contracts or interface definitions (if applicable)
- Database or state changes introduced
- Third-party integrations required

### 4. Acceptance Criteria
- Clearly defined conditions that must be met for the feature to be considered complete
- Edge cases and failure scenarios to account for
- Performance benchmarks or SLA expectations (if relevant)

### 5. Implementation Roadmap
- Suggested breakdown into incremental tasks or milestones
- Logical ordering and dependencies between tasks
- Estimated complexity per task: **Small / Medium / Large**

### 6. Testing Strategy
- Unit, integration, and end-to-end test scenarios to cover
- Critical paths that require the most rigorous validation
- Suggested mocking or fixture strategies

### 7. Risks & Open Questions
- Technical risks and proposed mitigations
- Unresolved decisions that need stakeholder input
- Potential impact on existing functionality (regression surface)

### 8. Glossary (if needed)
- Domain-specific terms or abbreviations introduced by this feature

## Deliverables

- Save the document to `docs/features/{feature-name}.md`
- Use clear markdown formatting with a table of contents at the top
- Include diagrams in mermaid syntax where visual explanation adds clarity
- Keep language precise and jargon-free where possible — this document should be accessible to both engineers and non-technical stakeholders

## Quality Standards

- Every section must be substantive — no placeholder text or "TBD" entries without justification
- Acceptance criteria should be testable and unambiguous
- The roadmap should be actionable enough for a developer to pick up and start working from
- Cross-reference related existing documentation or code where relevant