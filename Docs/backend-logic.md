---
description: Backend coding standards for game development projects.
alwaysApply: true
globs: ["src/server/**", "src/game-services/**", "lib/**"]
---

# Game Backend Logic Standards

- Follow clean game-server architecture: separate gameplay logic, matchmaking, leaderboards, and utilities.
- Ensure single-responsibility for all functions.
- Store sensitive configuration in environment variables.
- Parameterize all database queries to prevent SQL injection.
- Use async/await properly for real-time concurrency.
- Implement structured logging with contexts like playerId, matchId, eventType.
- Include unit and integration tests; target ≥80% coverage.
- Maintain README.md in every gameplay service folder.
