# API Contract Generator

Design and document a complete API contract for the following endpoint or resource: `$ARGUMENTS`.

## Discovery Phase

Before generating anything, gather the necessary context:

1. **Scan**: Search the codebase for existing controllers, routes, DTOs, and service interfaces to understand current API patterns
2. **Identify conventions**: Note the naming style (camelCase vs snake_case), response envelope structure, error format, versioning strategy, and authentication approach already in use
3. **Map dependencies**: Determine which domain entities, services, or external systems this endpoint will interact with

## Contract Sections

Produce a single, comprehensive document covering all of the following:

### 1. Endpoint Summary
- HTTP method and path (following the project's existing URL conventions)
- Brief description of what the endpoint does and why it exists
- Owning module or service
- Authentication and authorization requirements

### 2. Request Specification
- Path parameters with types and constraints
- Query parameters with defaults, types, and valid ranges
- Request body schema (as a TypeScript interface or Kotlin data class, matching the project's language)
- Required vs optional fields clearly marked
- Example request with realistic sample data

### 3. Response Specification
- Success response schema with HTTP status code
- Response fields with types, descriptions, and nullability
- Pagination structure (if applicable)
- Example success response with realistic sample data

### 4. Error Catalog
- All expected error responses with HTTP status codes
- Error body structure consistent with the project's existing error format
- Specific error codes and human-readable messages for each failure scenario
- Example error responses for the most common failure cases:
    - Validation failure (400)
    - Authentication/authorization failure (401/403)
    - Resource not found (404)
    - Conflict or business rule violation (409/422)
    - Internal server error (500)

### 5. Data Transfer Objects
- Full DTO definitions for request and response models
- Validation annotations or constraints on each field (e.g., `@NotBlank`, `@Size`, `@Pattern`)
- Mapping notes between DTOs and domain entities where relevant

### 6. Headers & Metadata
- Required request headers (e.g., `Authorization`, `Content-Type`, `Accept-Language`)
- Notable response headers (e.g., `X-Request-Id`, `Cache-Control`, rate limit headers)
- Content type expectations and supported media types

### 7. Behavioral Rules
- Idempotency guarantees (safe to retry or not)
- Rate limiting policies (if applicable)
- Caching behavior and cache invalidation triggers
- Side effects (events published, notifications sent, audit logs created)
- Concurrency handling (optimistic locking, ETags)

### 8. Integration Notes
- Dependencies on other services or APIs
- Required feature flags or configuration toggles
- GDPR or data privacy considerations (PII handling, data retention, consent requirements)
- Backward compatibility notes and versioning implications

### 9. OpenAPI Specification Snippet
- Generate a valid OpenAPI 3.0+ YAML block for this endpoint
- Include schemas, examples, and error responses inline
- Ensure it can be pasted directly into an existing OpenAPI spec file

## Deliverables

- Save the full contract to `docs/api/{endpoint-name}.md`
- If the project has an existing OpenAPI spec file, note where the new snippet should be inserted
- Use tables for parameter listings and code blocks for schemas and examples
- Include a changelog section at the bottom for tracking future revisions

## Quality Standards

- Every field must have a type, description, and constraint — no undocumented properties
- Examples must be realistic and internally consistent (IDs match, dates make sense, enums use valid values)
- Error scenarios should cover both technical failures and business rule violations
- The contract must be detailed enough for a frontend or external team to implement against without additional clarification
- DTO definitions must compile — no pseudo-code or incomplete types