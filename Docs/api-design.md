---
description: API design and endpoint standards for game development projects.
alwaysApply: true
globs: ["api/**"]
---

# Game API Design Standards

- Use consistent REST, GraphQL, or WebSocket conventions as required.
- Version APIs: /v1/player, /v1/matchmaking, etc.
- Validate all incoming action/event payloads server-side.
- Use proper HTTP codes; standardize WebSocket event error formats.
- Centralize error handling:
  ```json
  {
    "error": {
      "code": "INVALID_ACTION",
      "message": "Action not allowed in the current game state"
    }
  }
  ```
- Document all endpoints and events in /docs/api.md.
- Include tests for positive, negative, and edge-case scenarios.
