---
description: Frontend UI/UX coding standards for game development projects.
alwaysApply: true
globs: ["src/game-ui/**", "components/**", "screens/**"]
---

# Frontend Game UX Standards

- Use a component-based architecture suitable for game UIs (React, Pixi.js + React, Phaser + UI layer, Svelte, etc.).
- All UI components must be reusable, modular, and documented.
- Use TailwindCSS or styled components; avoid inline styles.
- Keep game state management clean and predictable (Zustand, Redux, Jotai, or engine-level managers).
- Ensure UI is fully responsive and scales across mobile, tablet, and desktop devices.
- All interactive elements must include validation, accessibility attributes, and visual feedback.
- Include unit tests (Jest/Vitest) for HUD/UI logic.
- Maintain a README.md per feature folder.
