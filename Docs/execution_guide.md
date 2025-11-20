# Execution Guide for Cursor - Ooredoo Network Defenders

## 📋 Overview

This guide provides step-by-step instructions for developing the Ooredoo Network Defenders game using Cursor AI. Each phase includes explicit file references, tasks, and validation steps.

**Total Timeline**: 10 weeks from kickoff to launch  
**Development Platform**: Gambo.ai (AI-powered no-code game builder)  
**Target**: Non-technical product owner with zero coding knowledge

---

## 🎯 Prerequisites

Before starting Phase 1, ensure you have:

1. **Gambo.ai Account**: 
   - Sign up at https://www.gambo.ai/
   - Subscribe to Professional tier ($199/month)
   - Verify email and complete profile setup

2. **Access to PRD and Documentation**:
   - `cosmic_defenders_prd.md` (master document)
   - `tech_stack.md` (technology decisions)
   - `scope.md` (project boundaries)
   - `features.md` (feature specifications)
   - `api_overview.md` (API endpoints)
   - `database_schema.md` (data structure)
   - `ux_ui_guidelines.md` (design specifications)

3. **Ooredoo Credentials**:
   - Access to Ooredoo backend API documentation
   - SSO integration credentials
   - Red Club API keys
   - Webhook endpoints for feature triggers

4. **Asset Resources**:
   - Budget: $8,000-12,000 for art assets
   - Contact: Regional design agency or Fiverr/Upwork designers
   - Sound designer: $3,000-5,000 budget

---

## 📊 Phase Overview

| Phase | Duration | Focus Area | Key Deliverable |
|-------|----------|------------|-----------------|
| **Phase 1** | Week 1 | Initial Setup | Project structure, Gambo.ai configuration |
| **Phase 2** | Weeks 2-4 | Core Development | Playable game with all features |
| **Phase 3** | Weeks 5-6 | Testing & QA | Bug-free, optimized build |
| **Phase 4** | Week 7-9 | Deployment | Live game in Ooredoo app |
| **Phase 5** | Week 10+ | Maintenance | Ongoing updates and iteration |

---

# PHASE 1: INITIAL SETUP (Week 1)

## 📁 Reference Files
- Primary: `tech_stack.md` (Section: Development Platform)
- Secondary: `scope.md` (Section: Project Objectives)
- Supporting: `features.md` (Section: Primary Features)

---

## Task 1.1: Gambo.ai Project Initialization

**Duration**: 2 hours

### Instructions for Cursor:

**Prompt 1**: "Create a new Gambo.ai project setup checklist"

```markdown
Create a comprehensive checklist for setting up a Space Invaders-style mobile game in Gambo.ai with the following specifications:

Project Name: Ooredoo Network Defenders
Game Type: Arcade Shooter (vertical portrait orientation)
Target Platform: Mobile (iOS & Android) via WebView
Session Duration: 30-45 seconds

Include steps for:
1. Account verification
2. Project creation
3. Platform configuration (portrait mode, mobile controls)
4. Performance settings (60 FPS target)
5. Asset folder structure
```

**Expected Output**: A detailed setup checklist that you can follow in Gambo.ai

---

**Prompt 2**: "Generate Gambo.ai AI prompts for core game mechanics"

Reference: `features.md` → Section 1: Core Gameplay Mechanics

```markdown
Based on the PRD, generate 5 natural language prompts for Gambo.ai's AI Game Designer to create:

1. Tap-to-shoot system (unlimited firing, 0.3s cooldown)
2. Enemy formation system (4 rows, 36 enemies, side-to-side + descent)
3. Session timer (45 seconds, displayed at top center)
4. Collision detection (player projectiles vs enemies, enemy projectiles vs player)
5. Scoring system (30pts top row, 20pts middle, 15pts lower-middle, 10pts bottom)

Format each prompt as:
"Prompt [X]: [Natural language description for Gambo.ai]"
```

**Expected Output**: Copy-paste ready prompts for Gambo.ai

---

### Validation Steps:

✅ Gambo.ai project created successfully  
✅ Game canvas set to portrait orientation (9:16 aspect ratio)  
✅ Touch controls enabled  
✅ Performance target set to 60 FPS  
✅ AI prompts generated and ready to use

---

## Task 1.2: Asset Requirements Documentation

**Duration**: 3 hours

### Instructions for Cursor:

**Prompt 3**: "Create art asset brief for designers"

Reference: 
- `ux_ui_guidelines.md` → Section: Visual Style
- `features.md` → Section 8: Enemy Types

```markdown
Generate a comprehensive art asset brief for outsourced designers including:

**Ship Skins (6 total)**:
1. Ooredoo Defender (default) - cyberpunk, red accents, 128x128px
2. Blue Dhoni (traditional Maldivian boat style)
3. 5G Speed Racer (purple/silver)
4. Manta Ray Elite (ocean-themed)
5. Independence Day Special (Maldivian flag colors)
6. Red Phoenix (legendary, glowing)

**Enemy Types (5 + 1 boss)**:
1. Lagmites (slug-shaped, orange glow, loading icon)
2. Spameroids (meteor, gray, spam text overlay)
3. Buffer Beasts (hexagonal, cyan, rotating loading icon)
4. DropCall Drones (phone-shaped, dark red, "X" icon)
5. Roaming Rogues (satellite-like, silver, antenna)
6. The Mega Glitch (boss, large, color-shifting corruption)

**Technical Specs**:
- Format: PNG with transparency
- Resolution: @2x (256x256px for ships, 192x192px for enemies)
- Color scheme: Ooredoo red (#E30613), cyberpunk cyan (#00F0FF), neon purple (#B026FF)
- Style: Vector-based flat design, not pixel art

Include delivery timeline: 48-72 hours
Budget: $8,000-12,000
```

**Expected Output**: A complete design brief document ready to send to designers

---

**Prompt 4**: "Create sound design brief"

Reference: `ux_ui_guidelines.md` → Section: Audio UX

```markdown
Generate a sound design brief for audio contractor including:

**Music Tracks**:
1. Main Menu Theme (2-minute loop, 90-100 BPM, ambient synthwave)
2. Gameplay Theme (45-second loop, 130-140 BPM, high-energy synthwave)
3. Boss Battle Theme (1-minute loop, 145 BPM, aggressive synthwave)

**Sound Effects (20+ SFX)**:
- Player Actions: Laser fire, ship movement, destruction
- Enemy Actions: Formation pulse, enemy fire, explosions (5 types)
- Power-Ups: 6 distinct activation sounds
- UI: Button clicks, navigation, achievements

**Voice Announcements** (English + Dhivehi):
- "Power Up!"
- "Network Secured!"
- "Network Breached!"

**Technical Specs**:
- Format: MP3 96kbps
- Stereo, 44.1kHz
- Cultural fusion: Synthwave + bodu beru drum samples

Budget: $3,000-5,000
Delivery: 1 week
```

**Expected Output**: Sound design brief ready to send to audio contractor

---

### Validation Steps:

✅ Art asset brief completed with all specifications  
✅ Sound design brief completed  
✅ Budget allocation confirmed ($11,000-17,000 total for assets)  
✅ Contractor outreach initiated (Fiverr, Upwork, regional agencies)

---

## Task 1.3: Ooredoo API Documentation Review

**Duration**: 4 hours

### Instructions for Cursor:

**Prompt 5**: "Create API integration checklist"

Reference: 
- `api_overview.md` → All sections
- `tech_stack.md` → Section: Backend Services

```markdown
Based on the API documentation, create a comprehensive checklist for integrating with Ooredoo's existing infrastructure:

**Authentication Integration**:
- [ ] JWT token verification endpoint identified
- [ ] Token refresh mechanism understood
- [ ] SSO flow documented
- [ ] Test credentials obtained

**Power-Up Token Triggers**:
- [ ] Speed Test webhook endpoint confirmed
- [ ] Data purchase webhook endpoint confirmed
- [ ] Bill payment webhook endpoint confirmed
- [ ] WiFi map view tracking endpoint confirmed
- [ ] 5G map view tracking endpoint confirmed
- [ ] Login streak tracking mechanism understood

**Red Club Integration**:
- [ ] Points conversion API endpoint confirmed
- [ ] Red Club tier retrieval endpoint identified
- [ ] Transaction logging mechanism understood

**Deep Linking**:
- [ ] URL scheme documented (ooredoo://)
- [ ] Deep link paths for all features listed
- [ ] Return navigation flow understood

**Security**:
- [ ] HMAC signature verification process documented
- [ ] Rate limiting rules understood
- [ ] API key management process established

Include contact information for Ooredoo technical team.
```

**Expected Output**: A checklist to validate all API integrations are feasible

---

### Validation Steps:

✅ All Ooredoo API endpoints documented  
✅ Test credentials obtained  
✅ Security requirements understood  
✅ Technical contact established with Ooredoo team

---

## Task 1.4: Database Schema Creation

**Duration**: 3 hours

### Instructions for Cursor:

**Prompt 6**: "Generate PostgreSQL database creation scripts"

Reference: `database_schema.md` → All table definitions

```markdown
Generate complete PostgreSQL database creation scripts based on the schema documentation:

Include:
1. CREATE TABLE statements for all 9 tables:
   - users
   - power_up_tokens
   - game_sessions
   - daily_missions
   - achievements
   - leaderboards
   - weekly_challenges
   - challenge_participants
   - red_club_transactions

2. All constraints (PRIMARY KEY, FOREIGN KEY, CHECK, UNIQUE)
3. All indexes for performance optimization
4. Sample INSERT statements for test data
5. Helper functions (e.g., calculate_rank_progression, refresh_weekly_leaderboard)

Format as executable .sql file with clear section comments.
```

**Expected Output**: `database_init.sql` file ready to execute on PostgreSQL 15+

---

**Prompt 7**: "Generate database connection configuration"

```markdown
Create a Node.js database configuration file for connecting to PostgreSQL:

Include:
- Connection pooling setup (pg library)
- Environment variables for credentials
- Error handling and reconnection logic
- Connection health check function
- Query helper functions for common operations

Export as database.js module.
```

**Expected Output**: `database.js` configuration file

---

### Validation Steps:

✅ Database schema SQL script generated  
✅ Database connection module created  
✅ Test database created and schema applied  
✅ Sample data inserted successfully  
✅ Connection verified from Node.js

---

## Phase 1 Completion Checklist

Before moving to Phase 2, ensure:

- [x] Gambo.ai project initialized
- [x] AI prompts for core mechanics prepared
- [x] Art asset brief sent to designers
- [x] Sound design brief sent to audio contractor
- [x] Ooredoo API integration validated
- [x] Database schema deployed
- [x] All reference documentation reviewed

**Deliverable**: Project structure ready, contractors engaged, technical foundation established

---

# PHASE 2: CORE DEVELOPMENT (Weeks 2-4)

## 📁 Reference Files
- Primary: `features.md` (All primary features)
- Secondary: `api_overview.md` (Integration endpoints)
- Supporting: `ux_ui_guidelines.md` (UI specifications)

---

## Week 2: Core Gameplay Implementation

### Task 2.1: Gambo.ai Game Logic Development

**Duration**: 5 days (Week 2)

### Instructions for Cursor:

**Prompt 8**: "Generate Gambo.ai AI prompts for each game mechanic"

Reference: `features.md` → Section 1: Core Gameplay Mechanics

```markdown
Create detailed Gambo.ai prompts for implementing each core mechanic:

**Prompt 1 - Tap to Shoot**:
"Create a mobile game shooting system where:
- Single tap anywhere fires projectile upward
- 0.3 second cooldown between shots
- Unlimited ammunition
- Projectiles are red energy beams traveling at 800 pixels/second
- Implement object pooling (max 10 active projectiles)
- Collision detection using AABB with generous hitboxes (enemy sprite + 10% margin)"

**Prompt 2 - Enemy Formation**:
"Create enemy formation system where:
- 4 rows of 9 enemies (36 total)
- Formation moves horizontally (side-to-side)
- When reaching screen edge, formation descends and reverses direction
- Descent speed: reaches bottom in exactly 40 seconds if undamaged
- Speed increases 15% for each 25% of enemies destroyed
- 2 random enemies shoot per second
- Bottom row enemies shoot 2x more frequently"

[Continue for all 5 core mechanics...]

Format each as a standalone prompt ready to paste into Gambo.ai.
```

**Expected Output**: 5 detailed prompts, one per core mechanic

---

**Prompt 9**: "Create Gambo.ai visual scripting node diagram"

```markdown
Generate a visual scripting logic diagram for the game loop:

**Game Start Node**:
→ Initialize player ship position (bottom center)
→ Spawn enemy formation (4 rows x 9 enemies)
→ Start session timer (45 seconds)
→ Enable touch input

**Game Loop Node** (runs every frame):
→ Update timer (decrement by deltaTime)
→ Check if timer expired → END GAME (Victory if enemies cleared)
→ Update enemy formation (move, descend, shoot)
→ Update projectiles (player and enemy)
→ Check collisions:
   - Player projectile hits enemy → Destroy enemy, add points, check formation cleared
   - Enemy projectile hits player → Decrease shield, check game over
   - Enemy reaches bottom → END GAME (Defeat)
→ Render scene

**End Game Node**:
→ Stop game loop
→ Calculate final score (base + time bonus + bonuses)
→ Show results screen (victory or defeat animation)
→ Submit score to server

Format as a flowchart or structured list.
```

**Expected Output**: Complete game loop logic diagram

---

### Validation Steps:

✅ All 5 core mechanics functional in Gambo.ai  
✅ Game session lasts 30-45 seconds  
✅ 60 FPS maintained on test device  
✅ Touch input responsive (<50ms latency)  
✅ Victory/defeat conditions working correctly

---

### Task 2.2: Visual Asset Integration

**Duration**: 3 days (Week 2)

**Prerequisites**: Art assets delivered by designers (assume 72-hour turnaround from Task 1.2)

### Instructions for Cursor:

**Prompt 10**: "Create Gambo.ai asset import checklist"

```markdown
Generate step-by-step instructions for importing custom assets into Gambo.ai:

**Asset Folder Structure**:
/assets
  /ships
    - ooredoo_defender.png
    - blue_dhoni.png
    - 5g_speed_racer.png
    - manta_ray_elite.png
    - independence_day.png
    - red_phoenix.png
  /enemies
    - lagmite.png
    - spameroid.png
    - buffer_beast.png
    - dropcall_drone.png
    - roaming_rogue.png
    - mega_glitch.png
  /projectiles
    - player_projectile.png
    - enemy_projectile.png
  /ui
    - buttons/
    - panels/
    - icons/
  /backgrounds
    - space_background.png
    - network_nodes.png

**Import Steps**:
1. Navigate to Gambo.ai Asset Manager
2. Create folders matching structure above
3. Upload PNG files (ensure @2x resolution)
4. Tag each asset with metadata (type, category, size)
5. Generate sprite atlas for each category
6. Replace placeholder sprites in visual editor
7. Configure animations (rotation, floating, pulsing)
8. Test asset rendering on multiple device sizes

Include validation steps for each asset type.
```

**Expected Output**: Asset import guide with validation checklist

---

**Prompt 11**: "Generate particle effect configurations"

Reference: `ux_ui_guidelines.md` → Section: Particle Systems

```markdown
Create particle effect configurations for Gambo.ai's particle system:

**Ship Engine Trail**:
- Emitter position: Ship rear center
- Particle count: 20
- Color: Ooredoo red (#E30613) fading to transparent
- Lifetime: 0.5 seconds
- Velocity: -200 pixels/second (downward)
- Size: 5px → 2px (shrink over lifetime)

**Enemy Explosion (Lagmite)**:
- Emitter position: Enemy center
- Particle count: 30
- Color: Orange (#FFA500)
- Lifetime: 1 second
- Velocity: Radial burst (360 degrees, 150 pixels/second)
- Size: 8px → 0px

[Continue for all particle effects...]

**Performance Budget**: Max 100 particles on-screen simultaneously

Export as Gambo.ai particle system JSON config.
```

**Expected Output**: Particle effect configuration files

---

### Validation Steps:

✅ All ship skins imported and rendering correctly  
✅ All enemy types visible with correct colors  
✅ Projectiles rendering with glow trails  
✅ Particle effects playing on enemy destruction  
✅ Background parallax working  
✅ UI elements styled with Ooredoo branding

---

## Week 3: Power-Up System & Progression

### Task 2.3: Power-Up Implementation

**Duration**: 4 days (Week 3)

### Instructions for Cursor:

**Prompt 12**: "Generate power-up system logic"

Reference: `features.md` → Section 2: Power-Up System

```markdown
Create Gambo.ai prompts for implementing all 6 power-ups:

**Super Speed Booster**:
"Create a power-up that:
- Duration: 5 seconds
- Effect: Increases fire rate to 10 shots/second (reduce cooldown from 0.3s to 0.1s)
- Visual: Ship glows cyan blue, projectiles become continuous stream
- Audio: Mechanical acceleration sound
- Activation: Player taps power-up button (if token available)
- Deactivation: Revert to normal fire rate after 5 seconds"

**Mega Data Cannon**:
"Create a charged shot power-up that:
- Duration: Single use
- Effect: Fires explosive projectile that damages 3x3 enemy grid on impact
- Charging: 1-second charging animation when activated
- Projectile: Large red explosive, 50% slower than normal shots
- Explosion radius: 150 pixels from impact
- Visual: Charging animation, shockwave on impact
- Audio: Charge-up sound, explosive release"

[Continue for all 6 power-ups...]

Include power-up token management:
- Pre-game selection screen (choose up to 2 power-ups)
- Token count display
- Activation button in HUD (only if power-up equipped)
- Token decrement on activation
```

**Expected Output**: Complete power-up system implementation guide

---

**Prompt 13**: "Create power-up token API integration"

Reference: `api_overview.md` → Section 3: Power-Up Token Endpoints

```markdown
Generate JavaScript code for power-up token integration:

**Client-Side Functions**:
1. fetchTokenBalance(userId) - GET /api/game/tokens/{user_id}
2. useToken(userId, tokenType) - POST /api/game/tokens/use
3. updateTokenUI(tokens) - Update pre-game screen token counts
4. listenForTokenGrants() - WebSocket or polling for real-time grants

**Server-Side Webhook Handler**:
When Ooredoo app triggers feature completion (e.g., Speed Test):
1. Receive webhook from Ooredoo backend
2. Verify HMAC signature
3. Call grantToken(userId, tokenType, quantity)
4. Send push notification to user: "You earned 3 Speed Booster tokens!"
5. Update token balance in database

Include error handling for:
- Insufficient tokens
- Network failures
- Daily cap exceeded (10 tokens/day)

Export as powerup_integration.js module.
```

**Expected Output**: Complete power-up API integration code

---

### Validation Steps:

✅ All 6 power-ups functional in-game  
✅ Pre-game loadout selection working  
✅ Token counts accurate and synced with server  
✅ Power-up visual effects displaying correctly  
✅ API integration tested with Ooredoo webhooks  
✅ Daily cap enforcement verified

---

### Task 2.4: Rank Progression & Missions

**Duration**: 3 days (Week 3)

### Instructions for Cursor:

**Prompt 14**: "Generate rank progression logic"

Reference: `features.md` → Section 3.1: Rank Progression

```markdown
Create rank progression calculation system:

**Rank Thresholds**:
| Rank | Games Required | Points Required |
|------|----------------|-----------------|
| Cadet | 0 | 0 |
| Private | 11 | 2,500 |
| Corporal | 26 | 7,500 |
| Lieutenant | 51 | 20,000 |
| Captain | 101 | 50,000 |
| Major | 201 | 100,000 |
| Commander | 351 | 200,000 |
| Colonel | 501 | 350,000 |
| General | 751 | 500,000 |
| Galaxy Guardian | 1000 | 1,000,000 |

**Functions to Generate**:
1. calculateRank(totalGames, totalPoints) → returns current rank
2. getNextRank(currentRank) → returns next rank name
3. getRankProgress(currentRank, totalGames, totalPoints) → returns progress percentage
4. checkRankUp(userId) → after each game, check if rank threshold reached
5. displayRankUpAnimation() → full-screen celebration animation

**Rank-Up Rewards**:
- Award 100 Red Club points
- Unlock new ship skin (if applicable)
- Show notification: "RANK UP! You are now [rank]"

**Storage**:
- Update users table: rank, rank_progress_percent
- Log rank-up event to analytics

Export as rank_system.js module.
```

**Expected Output**: Rank progression system code

---

**Prompt 15**: "Generate daily mission system"

Reference: `features.md` → Section 3.2: Daily Missions

```markdown
Create daily mission management system:

**Mission Templates**:
```json
[
  {
    "id": "daily_play_3",
    "type": "gameplay",
    "title": "Morning Defender",
    "description": "Play 3 games today",
    "target": 3,
    "reward": {
      "points": 20,
      "tokens": [{"type": "wifi_radar", "quantity": 1}]
    }
  },
  {
    "id": "daily_perfect",
    "type": "gameplay",
    "title": "Perfect Defense",
    "description": "Win without taking damage",
    "target": 1,
    "reward": {
      "points": 100,
      "tokens": [{"type": "coverage_shield", "quantity": 1}]
    }
  },
  {
    "id": "ooredoo_speed_test",
    "type": "feature",
    "title": "Network Guardian",
    "description": "Complete a Speed Test",
    "target": 1,
    "reward": {
      "points": 30,
      "tokens": [{"type": "speed_booster", "quantity": 3}]
    },
    "deep_link": "ooredoo://speed-test"
  }
]
```

**Functions**:
1. generateDailyMissions(userId, date) → Selects 3 random missions
2. updateMissionProgress(userId, missionId, increment) → After each game, update progress
3. checkMissionCompletion(userId, missionId) → Returns true if target reached
4. claimMissionReward(userId, missionId) → Awards points and tokens
5. resetDailyMissions() → Cron job at 00:00 MVT

**Mission Screen UI**:
- Display 3 missions with progress bars
- "CLAIM" button when complete
- "GO TO FEATURE" button for Ooredoo feature missions (opens deep link)
- Countdown timer to midnight reset

Export as mission_system.js module.
```

**Expected Output**: Mission system implementation

---

### Validation Steps:

✅ Rank progression calculating correctly after each game  
✅ Rank-up animation triggering at correct thresholds  
✅ Daily missions generating at midnight MVT  
✅ Mission progress updating after games  
✅ Rewards distributing correctly on claim  
✅ Deep links opening Ooredoo features

---

## Week 4: Leaderboards & Red Club Integration

### Task 2.5: Leaderboard Implementation

**Duration**: 3 days (Week 4)

### Instructions for Cursor:

**Prompt 16**: "Generate leaderboard system"

Reference: 
- `features.md` → Section 4.1: Global Leaderboard
- `api_overview.md` → Section 6: Leaderboard Endpoints

```markdown
Create leaderboard ranking and display system:

**Leaderboard Types**:
1. Weekly (resets Monday 00:00 MVT)
2. Monthly (resets 1st of month 00:00 MVT)
3. All-Time (never resets)

**Functions**:
1. submitScore(userId, sessionId, score, victory) → POST /api/game/session/submit
2. fetchLeaderboard(type, page, limit) → GET /api/game/leaderboard/{type}
3. calculateRank(userId, score, period) → Returns player's rank
4. updateLeaderboardUI(rankings) → Renders leaderboard screen

**Server-Side Logic** (PostgreSQL):
```sql
-- Weekly Leaderboard Calculation
WITH weekly_scores AS (
  SELECT 
    user_id,
    SUM(score) as total_score,
    COUNT(*) as games_played,
    ROW_NUMBER() OVER (ORDER BY SUM(score) DESC) as rank
  FROM game_sessions
  WHERE started_at >= date_trunc('week', CURRENT_DATE)
  GROUP BY user_id
)
SELECT * FROM weekly_scores ORDER BY rank LIMIT 100;
```

**UI Components**:
- Tab navigation (Weekly/Monthly/All-Time)
- Player's own rank (sticky at top, highlighted)
- Top 100 list (gold/silver/bronze for top 3)
- Rank change indicators (↑↓=)
- Pull-to-refresh gesture

**Caching**:
- Redis cache with 5-minute TTL
- Materialized view refresh every 5 minutes
- WebSocket for real-time updates (optional)

Export as leaderboard_system.js module.
```

**Expected Output**: Complete leaderboard system

---

### Validation Steps:

✅ Scores submitting successfully after each game  
✅ Leaderboard displaying top 100 players  
✅ Player's rank calculating correctly  
✅ Rank changes displaying (↑5, ↓2, etc.)  
✅ Weekly reset happening at correct time  
✅ Performance: Leaderboard loads in <1 second

---

### Task 2.6: Red Club Integration

**Duration**: 2 days (Week 4)

### Instructions for Cursor:

**Prompt 17**: "Generate Red Club points conversion"

Reference: `api_overview.md` → Section 4: Red Club Integration Endpoints

```markdown
Create Red Club points conversion system:

**Conversion Formula**:
```javascript
function calculateRedClubPoints(gamePoints, multipliers) {
  const BASE_RATE = 100; // 100 game points = 1 Red Club point
  
  let redClubPoints = gamePoints / BASE_RATE;
  
  // Daily first game: 2x multiplier
  if (multipliers.isFirstGameToday) {
    redClubPoints *= 2;
  }
  
  // Red Club tier bonus
  const tierMultipliers = {
    'Platinum': 1.5,
    'Gold': 1.25,
    'Standard': 1.0
  };
  redClubPoints *= tierMultipliers[multipliers.userTier];
  
  return Math.floor(redClubPoints);
}
```

**Integration Flow**:
1. After game ends, calculate game points earned
2. Call calculateRedClubPoints(gamePoints, multipliers)
3. POST /api/game/convert_points with conversion data
4. Ooredoo backend updates Red Club balance
5. Display in results screen: "+34 Red Club Points"
6. Log transaction in red_club_transactions table

**Results Screen Display**:
- Prominently show Red Club points earned
- Animated counter (+0 → +34)
- Red Club logo icon
- Link to "View Red Club Balance" (opens Ooredoo app)

**Error Handling**:
- If Red Club API unavailable: Queue conversion, retry later
- Show user: "Points will be credited shortly"
- Retry with exponential backoff (max 3 attempts)

Export as redclub_integration.js module.
```

**Expected Output**: Red Club integration code

---

### Validation Steps:

✅ Points converting correctly (100 game points = 1 RC point)  
✅ Daily first game multiplier applying  
✅ Tier bonuses calculating correctly  
✅ Red Club balance updating in Ooredoo backend  
✅ Results screen displaying RC points earned  
✅ Transaction logging for audit trail

---

## Phase 2 Completion Checklist

Before moving to Phase 3, ensure:

- [x] Core gameplay fully functional (tap-shoot, enemies, scoring)
- [x] All visual assets integrated
- [x] Power-up system working (6 types, token management)
- [x] Rank progression calculating correctly
- [x] Daily missions generating and tracking
- [x] Leaderboards displaying and updating
- [x] Red Club integration tested end-to-end
- [x] 60 FPS performance maintained
- [x] Session duration 30-45 seconds validated

**Deliverable**: Fully playable game with all primary features

---

# PHASE 3: TESTING & QA (Weeks 5-6)

## 📁 Reference Files
- Primary: `tech_stack.md` (Section: Testing Framework)
- Secondary: `features.md` (Acceptance Criteria)
- Supporting: `scope.md` (Success Criteria)

---

## Week 5: Comprehensive Testing

### Task 3.1: Device Compatibility Testing

**Duration**: 3 days (Week 5)

### Instructions for Cursor:

**Prompt 18**: "Generate device testing matrix"

Reference: `tech_stack.md` → Section: Performance Requirements

```markdown
Create a comprehensive device testing checklist:

**iOS Devices** (Minimum: iPhone 7, iOS 13+):
| Device | Screen Size | iOS Version | Test Priority |
|--------|-------------|-------------|---------------|
| iPhone SE (2020) | 4.7" | iOS 13 | High (minimum spec) |
| iPhone 12 | 6.1" | iOS 15 | High (popular) |
| iPhone 14 Pro | 6.1" | iOS 17 | High (current gen) |
| iPhone 14 Pro Max | 6.7" | iOS 17 | Medium (large screen) |
| iPad Air 2 | 9.7" | iOS 13 | Low (tablet support) |

**Android Devices** (Minimum: Android 8.0, 2GB RAM):
| Device | Screen Size | Android | Test Priority |
|--------|-------------|---------|---------------|
| Redmi Note 8 | 6.3" | Android 9 | High (minimum spec) |
| Samsung Galaxy S21 | 6.2" | Android 12 | High (popular) |
| Google Pixel 5 | 6.0" | Android 13 | High (reference) |
| OnePlus 9 | 6.55" | Android 11 | Medium |

**Test Cases Per Device**:
1. Load time: Must be <2 seconds
2. Frame rate: Maintain 60 FPS during gameplay
3. Touch input: <50ms latency from tap to projectile
4. Battery drain: <3% per 5 minutes
5. Memory usage: <150MB
6. Asset loading: All sprites render correctly
7. Audio playback: Music and SFX working
8. Haptic feedback: Vibration on supported actions
9. Network sync: Leaderboard updates within 5 seconds
10. Crash-free: No crashes during 30-minute test session

**Testing Tools**:
- BrowserStack for device cloud testing
- Xcode Simulator for iOS
- Android Studio Emulator
- Physical devices (minimum 5 iOS + 5 Android)

Generate test report template with pass/fail criteria.
```

**Expected Output**: Device testing matrix and report template

---

**Prompt 19**: "Create automated performance testing script"

```markdown
Generate a performance testing script for evaluating:

**Metrics to Track**:
1. Frame Rate (FPS)
   - Target: 60 FPS sustained
   - Measurement: Every 100ms during gameplay
   - Pass: Average ≥57 FPS (95% of target)

2. Load Time
   - Target: <2 seconds from tap to gameplay
   - Measurement: Performance.now() timestamps
   - Pass: <2000ms

3. Memory Usage
   - Target: <150MB
   - Measurement: performance.memory.usedJSHeapSize
   - Pass: <157286400 bytes

4. Battery Drain
   - Target: <3% per 5 minutes
   - Measurement: Battery API (if available)
   - Pass: <0.6% per minute

**Script Structure** (JavaScript):
```javascript
class PerformanceMonitor {
  constructor() {
    this.fpsReadings = [];
    this.memoryReadings = [];
    this.startTime = null;
  }

  startMonitoring() {
    this.startTime = performance.now();
    this.fpsInterval = setInterval(() => this.measureFPS(), 100);
    this.memoryInterval = setInterval(() => this.measureMemory(), 1000);
  }

  measureFPS() {
    const fps = // Calculate FPS
    this.fpsReadings.push(fps);
  }

  generateReport() {
    return {
      avgFPS: this.calculateAverage(this.fpsReadings),
      minFPS: Math.min(...this.fpsReadings),
      maxMemory: Math.max(...this.memoryReadings),
      duration: performance.now() - this.startTime
    };
  }
}
```

Export as performance_test.js module with HTML test UI.
```

**Expected Output**: Automated performance testing tool

---

### Validation Steps:

✅ All test devices acquire and configured  
✅ Performance meets targets on minimum spec devices  
✅ No visual glitches across different screen sizes  
✅ Audio working on all tested devices  
✅ Network sync functional  
✅ No crashes during extended testing

---

### Task 3.2: Functional Testing

**Duration**: 4 days (Week 5)

### Instructions for Cursor:

**Prompt 20**: "Generate functional test cases"

Reference: `features.md` → All acceptance criteria

```markdown
Create comprehensive functional test suite:

**Core Gameplay Tests**:
1. **Tap to Shoot**:
   - [ ] Single tap fires projectile
   - [ ] Projectile travels upward at correct speed
   - [ ] Cooldown enforced (0.3s between shots)
   - [ ] Unlimited ammunition
   - [ ] Projectile collision with enemy destroys enemy

2. **Enemy Formation**:
   - [ ] 36 enemies spawn in 4 rows x 9 columns
   - [ ] Formation moves side-to-side
   - [ ] Formation descends when reaching edge
   - [ ] Speed increases as enemies destroyed
   - [ ] Enemies shoot projectiles
   - [ ] Bottom row shoots more frequently

3. **Session Duration**:
   - [ ] Timer starts at 45 seconds
   - [ ] Timer decrements in real-time
   - [ ] Timer turns yellow at 10s, red at 5s
   - [ ] Game ends when timer reaches 0 OR all enemies destroyed

4. **Victory Conditions**:
   - [ ] Game ends in victory if all enemies destroyed
   - [ ] Victory animation plays (2 seconds)
   - [ ] Results screen displays correct score
   - [ ] Time bonus calculated correctly (+5 pts/sec remaining)

5. **Defeat Conditions**:
   - [ ] Game ends in defeat if enemy reaches bottom
   - [ ] Game ends in defeat if player hit by projectile
   - [ ] Defeat animation plays
   - [ ] Retry option available

**Power-Up Tests** (for each of 6 power-ups):
- [ ] Pre-game selection shows correct token count
- [ ] Power-up activates when button tapped
- [ ] Effect applies correctly (fire rate, area damage, etc.)
- [ ] Duration timer counts down accurately
- [ ] Effect ends after duration expires
- [ ] Token count decrements on use

**Progression Tests**:
- [ ] Score calculation matches formula
- [ ] Rank progression triggers at correct thresholds
- [ ] Daily missions generate at midnight MVT
- [ ] Mission progress updates after games
- [ ] Rewards distribute on claim
- [ ] Leaderboard updates within 5 seconds

**Integration Tests**:
- [ ] SSO login successful with Ooredoo token
- [ ] Power-up tokens granted from Ooredoo features
- [ ] Red Club points convert correctly
- [ ] Deep links open Ooredoo features
- [ ] Scores submit to leaderboard
- [ ] Offline queue syncs when online

Generate test execution report template with pass/fail/blocked status.
```

**Expected Output**: Functional test suite with 100+ test cases

---

### Validation Steps:

✅ All 100+ test cases executed  
✅ >95% pass rate  
✅ All critical bugs fixed  
✅ Regression testing passed

---

## Week 6: Soft Launch & Iteration

### Task 3.3: Soft Launch to Beta Testers

**Duration**: 5 days (Week 6)

### Instructions for Cursor:

**Prompt 21**: "Create beta testing program"

Reference: `scope.md` → Section: Testing & Soft Launch

```markdown
Generate beta testing program plan:

**Beta Tester Recruitment**:
- Target: 500 Ooredoo staff members
- Recruitment method: Internal email, Slack announcement
- Selection criteria: Mix of technical and non-technical users
- Incentive: Early access, exclusive badge, 1GB data bonus

**Beta Distribution**:
- iOS: TestFlight (create beta app listing)
- Android: Google Play Internal Testing track
- Access code: Unique code per tester for tracking

**Feedback Collection**:
- In-app feedback button (opens form)
- Post-game survey (optional, after 5 games)
- Bug report form (screenshot + device info auto-attached)
- Weekly feedback review meetings

**Metrics to Track**:
1. Crash rate: Target <1%
2. Average session length: Target 8-12 minutes
3. Sessions per user per day: Target 3-5
4. D7 retention: Target 60%+
5. Feature adoption: Speed test usage, mission completion rate
6. Bug reports: Categorize by severity (critical/high/medium/low)

**Communication Plan**:
- Day 1: Welcome email with instructions
- Day 3: Check-in survey
- Day 7: Feedback request
- Day 14: Final survey before full launch

Generate beta tester documentation and feedback form templates.
```

**Expected Output**: Complete beta testing plan

---

**Prompt 22**: "Generate analytics dashboard configuration"

Reference: `tech_stack.md` → Section: Analytics & Monitoring

```markdown
Create analytics dashboard configuration for monitoring beta launch:

**Key Metrics Dashboard**:

**Player Acquisition**:
- [ ] Total downloads
- [ ] Daily active users (DAU)
- [ ] New users per day

**Engagement**:
- [ ] Average session length
- [ ] Sessions per user per day
- [ ] Retention: D1, D7, D14

**Performance**:
- [ ] Average load time
- [ ] Frame rate distribution (histogram)
- [ ] Crash-free sessions %
- [ ] API response times (P50, P95, P99)

**Feature Adoption**:
- [ ] Power-up usage frequency (per type)
- [ ] Mission completion rate
- [ ] Leaderboard view rate
- [ ] Deep link tap rate

**Monetization/Business Value**:
- [ ] Speed test usage increase
- [ ] Bill payment increase
- [ ] Data pack purchase increase
- [ ] Red Club sign-ups attributed to game
- [ ] Red Club points distributed

**Tools Configuration**:
- Gambo.ai Analytics: Enable all event tracking
- Mixpanel: Custom event integration
- Google Analytics: App tracking setup
- Custom Dashboard: Build with Chart.js/D3.js

Generate analytics implementation code with event tracking.
```

**Expected Output**: Analytics dashboard with real-time metrics

---

### Validation Steps:

✅ 500 beta testers recruited  
✅ Beta build distributed to all testers  
✅ Analytics dashboard live and tracking  
✅ Feedback collection system operational  
✅ Daily metrics review meetings scheduled

---

### Task 3.4: Bug Fixing & Balance Adjustments

**Duration**: Ongoing (Week 6)

### Instructions for Cursor:

**Prompt 23**: "Generate bug triage process"

```markdown
Create bug triage and resolution workflow:

**Bug Severity Classification**:
| Severity | Definition | Response Time | Examples |
|----------|------------|---------------|----------|
| P0 (Critical) | Game-breaking, blocks launch | <4 hours | Crashes on startup, data loss, security breach |
| P1 (High) | Major feature broken | <24 hours | Leaderboard not updating, power-ups not working |
| P2 (Medium) | Minor feature issue | <72 hours | Visual glitch, audio crackling |
| P3 (Low) | Cosmetic issue | Next sprint | Button misalignment, typo |

**Bug Report Template**:
```markdown
## Bug Report #[NUMBER]
**Severity**: [P0/P1/P2/P3]
**Device**: [iPhone 12, iOS 15.3]
**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior**: [What should happen]
**Actual Behavior**: [What actually happens]
**Screenshot**: [Attached]
**Logs**: [Console logs attached]
```

**Resolution Workflow**:
1. Bug reported via feedback form
2. Product Manager triages (assigns severity)
3. Developer assigned based on severity
4. Fix implemented and tested
5. Deploy fix via Gambo.ai OTA update (no app store approval needed)
6. Notify affected beta testers
7. Verify fix in production

**Balance Adjustment Tracking**:
Track feedback on difficulty, power-up effectiveness, reward amounts:
- If win rate <40%: Reduce difficulty (slow enemy descent by 10%)
- If win rate >80%: Increase difficulty (speed enemy descent by 10%)
- If power-up usage <20%: Increase token drop rates
- If mission completion <60%: Reduce difficulty or increase rewards

Generate bug tracking spreadsheet and balance adjustment log.
```

**Expected Output**: Bug triage system and balance tracking tool

---

### Validation Steps:

✅ All P0 bugs fixed within 4 hours  
✅ All P1 bugs fixed within 24 hours  
✅ Balance adjustments made based on data  
✅ Win rate normalized to 60-70%  
✅ Beta tester satisfaction survey >4.0/5.0

---

## Phase 3 Completion Checklist

Before moving to Phase 4, ensure:

- [x] Device compatibility validated (15+ devices)
- [x] Performance targets met (60 FPS, <2s load, <150MB memory)
- [x] Functional testing complete (>95% pass rate)
- [x] Beta launch successful (500 testers)
- [x] Analytics tracking all key metrics
- [x] All P0 and P1 bugs resolved
- [x] Game balanced based on beta feedback
- [x] Crash rate <1%
- [x] Beta tester NPS >40

**Deliverable**: Production-ready game, validated by 500 beta testers

---

# PHASE 4: DEPLOYMENT (Weeks 7-9)

## 📁 Reference Files
- Primary: `tech_stack.md` (Section: Deployment Strategy)
- Secondary: `api_overview.md` (Production endpoints)
- Supporting: `scope.md` (Launch Strategy)

---

## Week 7: Production Preparation

### Task 4.1: Production Environment Setup

**Duration**: 3 days (Week 7)

### Instructions for Cursor:

**Prompt 24**: "Generate production deployment checklist"

```markdown
Create comprehensive production deployment checklist:

**Infrastructure Setup**:
- [ ] Production database provisioned (PostgreSQL 15+)
- [ ] Database schema applied (from database_schema.md)
- [ ] Database backups configured (daily, 30-day retention)
- [ ] Redis cache cluster deployed
- [ ] CloudFlare CDN configured
- [ ] SSL certificates installed and validated
- [ ] API rate limiting rules configured
- [ ] CORS policies set for game domain

**Application Deployment**:
- [ ] Gambo.ai project exported (WebGL build)
- [ ] Game assets uploaded to CDN
- [ ] API backend deployed to production servers
- [ ] Environment variables configured:
  ```
  DATABASE_URL=postgresql://...
  REDIS_URL=redis://...
  OOREDOO_API_KEY=...
  OOREDOO_WEBHOOK_SECRET=...
  JWT_SECRET=...
  ```
- [ ] Health check endpoints configured
- [ ] Monitoring and alerting setup (Sentry, CloudWatch)

**Ooredoo App Integration**:
- [ ] WebView configuration finalized
- [ ] JavaScript bridge tested
- [ ] Deep linking configured (ooredoo://)
- [ ] App Store metadata prepared (screenshots, description)
- [ ] iOS App Store submission (Ooredoo app update)
- [ ] Google Play Store submission (Ooredoo app update)

**Security Hardening**:
- [ ] API keys rotated to production values
- [ ] Rate limiting enabled (50 games/hour)
- [ ] HMAC signature verification enabled
- [ ] SQL injection prevention validated
- [ ] XSS protection enabled
- [ ] Certificate pinning configured

**Monitoring & Alerts**:
- [ ] Uptime monitoring (Pingdom, StatusCake)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (New Relic, Datadog)
- [ ] Alert thresholds configured:
  - Crash rate >1%
  - API response time >500ms (P95)
  - Database CPU >80%
  - Memory usage >80%
- [ ] On-call rotation established

Generate production deployment runbook with rollback procedures.
```

**Expected Output**: Production deployment checklist and runbook

---

### Validation Steps:

✅ Production environment fully configured  
✅ Security hardening complete  
✅ Monitoring and alerting operational  
✅ Backup and disaster recovery tested  
✅ Load testing passed (10,000 concurrent users)

---

### Task 4.2: App Store Submission

**Duration**: 4 days (Week 7-8)

### Instructions for Cursor:

**Prompt 25**: "Create App Store submission materials"

Reference: `scope.md` → Section: Launch Strategy

```markdown
Generate App Store submission materials for Ooredoo app update:

**iOS App Store Listing**:

**App Name**: Ooredoo Maldives

**What's New** (Version update description):
```
Version X.X: NEW - Network Defenders Game!

Defend Ooredoo's network in this exciting arcade shooter:
• Quick 30-45 second gameplay sessions
• Earn Red Club points while playing
• Unlock power-ups by using app features (speed test, bill payment, etc.)
• Compete on weekly leaderboards
• Complete daily missions for rewards

Plus improvements to app performance and bug fixes.
```

**Screenshots** (1242x2688px for iPhone):
1. Pre-game screen with ship selection
2. Gameplay action shot (mid-game)
3. Victory results screen with rewards
4. Leaderboard view
5. Daily missions screen

**App Preview Video** (30 seconds):
- 0-5s: Logo animation, "Introducing Network Defenders"
- 5-15s: Gameplay montage (shooting, explosions, power-ups)
- 15-25s: Rewards showcase (Red Club points, missions)
- 25-30s: CTA "Download now to play!"

**Keywords**: 
arcade, game, shooter, ooredoo, rewards, red club, network, defender, space, invaders

**Privacy Policy Update**:
Add section on gameplay data collection (scores, sessions, analytics)

---

**Google Play Store Listing**:

Similar to iOS, adjusted for Play Store guidelines.

**Feature Graphic** (1024x500px):
- Ooredoo branding with "Network Defenders" game title
- Gameplay screenshot background
- "Earn Rewards While You Play!"

Generate all assets and submission forms.
```

**Expected Output**: Complete App Store submission package

---

### Validation Steps:

✅ All App Store assets created (screenshots, videos, descriptions)  
✅ iOS submission approved (3-7 day review)  
✅ Android submission approved (1-3 day review)  
✅ App Store preview pages live

---

## Week 8-9: Launch Execution

### Task 4.3: Marketing Campaign Launch

**Duration**: 5 days (Week 8)

### Instructions for Cursor:

**Prompt 26**: "Generate launch marketing plan"

Reference: `scope.md` → Section: Marketing & Launch Strategy

```markdown
Create comprehensive launch marketing plan:

**Pre-Launch Activities** (Week 8):

**Day -7 (Mon)**: Internal announcement
- Email to all Ooredoo staff
- Intranet post with game preview
- Encourage staff to play and share

**Day -5 (Wed)**: Social media teaser
- Instagram: Teaser video (15 seconds)
- Facebook: Coming Soon post
- Twitter: Countdown begins
- Hashtag: #DefendOoredoo

**Day -3 (Fri)**: Influencer seeding
- Send game access to 10 local tech influencers
- Request social media posts on launch day
- Provide branded content guidelines

**Day -1 (Sun)**: Final countdown
- Social media posts: "Tomorrow, the network needs you!"
- Email to app users: "New game launching tomorrow"
- Push notification scheduled for launch

---

**Launch Day Activities** (Week 9, Monday):

**00:00 MVT**: Game goes live for all users
- Monitor server performance
- Watch for crashes or issues
- On-call team ready

**08:00 MVT**: Social media announcement
- Instagram post with gameplay video
- Facebook post with link to download
- Twitter thread explaining game mechanics
- Local tech blogs receive press release

**09:00 MVT**: Press release distribution
- Sent to: Mihaaru, Sun.mv, VNews, PSM News
- Focus: Innovation, customer engagement, rewards

**10:00 MVT**: Push notification to app users
- "NEW: Play Network Defenders and earn rewards!"
- Staggered rollout (10% per hour to manage load)

**12:00 MVT**: Email campaign
- Sent to active Red Club members
- Subject: "Earn Double Points Today Only!"
- CTA: Play now

**Throughout Day**: 
- Monitor social media mentions
- Respond to user questions
- Share user-generated content

---

**Post-Launch Activities** (Week 9+):

**Day 2-7**: 
- Daily social posts highlighting features
- User testimonials and high scores
- Countdown to first weekly challenge

**Week 2**: 
- Analyze metrics, publish launch results internally
- Plan first content update based on feedback

**Week 4**:
- First seasonal event (if metrics strong)
- Continue weekly challenges

Generate social media content calendar and post templates.
```

**Expected Output**: Complete marketing campaign plan with content calendar

---

**Prompt 27**: "Create customer support documentation"

```markdown
Generate customer support FAQ and troubleshooting guide:

**FAQ for Customer Service Reps**:

**Q: How do I access the Network Defenders game?**
A: Open the Ooredoo app, tap the "Network Defenders" card on the home screen or in the Red Club section.

**Q: How do I earn power-up tokens?**
A: Complete Ooredoo app features:
- Speed Test → 3 Speed Booster tokens
- Data pack purchase → 2 Data Cannon tokens
- 3-day login streak → 1 Shield token
- View WiFi map → 3 WiFi Radar tokens
- View 5G coverage → 1 5G Laser token
- Pay bill/recharge → 1 Bonus Blast token

**Q: How do game points convert to Red Club points?**
A: 100 game points = 1 Red Club point. Your first game each day has 2x conversion. Red Club tiers also give bonuses (Gold: 1.25x, Platinum: 1.5x).

**Q: My score didn't submit to the leaderboard. What happened?**
A: This can happen if your internet connection was interrupted. Your score is saved locally and will submit when you reconnect. If the issue persists, please contact support with your user ID.

**Q: The game won't load. How do I fix it?**
A: Try these steps:
1. Force close and reopen the Ooredoo app
2. Check your internet connection
3. Update to the latest app version
4. Restart your phone
5. If still not working, contact support

**Q: Can I play offline?**
A: The game works offline for gameplay, but you need internet to submit scores, claim rewards, and view leaderboards. Your progress will sync when you reconnect.

**Q: How do I report a bug?**
A: Tap the Help icon (?) in the game, then "Report Bug". Include your device model and steps to reproduce the issue.

---

**Troubleshooting Guide for Common Issues**:

**Issue: Game crashes on startup**
- Solution: Clear app cache, restart device, reinstall app
- Escalation: If persists, collect crash logs and escalate to tech team

**Issue: Power-up tokens not appearing**
- Solution: Check daily token cap (10/day), verify feature completion, refresh app
- Escalation: Verify webhook triggered in backend logs

**Issue: Leaderboard not updating**
- Solution: Pull to refresh, check internet connection
- Escalation: Check Redis cache health, verify leaderboard cron job

Generate support ticket response templates.
```

**Expected Output**: Customer support documentation

---

### Validation Steps:

✅ Marketing materials published on schedule  
✅ Social media campaign live  
✅ Press release distributed  
✅ Customer support team trained  
✅ Launch day metrics tracked in real-time  
✅ No major issues during first 24 hours

---

### Task 4.4: Launch Day Monitoring

**Duration**: 1 day (Week 9, Launch Day)

### Instructions for Cursor:

**Prompt 28**: "Generate launch day monitoring checklist"

```markdown
Create real-time monitoring checklist for launch day:

**Metrics to Watch** (check every 30 minutes):

**User Acquisition**:
- [ ] Total downloads (target: 1,000 in first 24 hours)
- [ ] Unique players (target: 500 in first 24 hours)
- [ ] Source tracking: How are users discovering the game?

**Performance**:
- [ ] Server response time (target: <200ms average)
- [ ] Database CPU usage (alert if >80%)
- [ ] Redis memory usage (alert if >80%)
- [ ] CDN bandwidth usage
- [ ] Error rate (alert if >0.5%)

**Game Health**:
- [ ] Crash rate (target: <1%)
- [ ] Average session length (expect: 8-12 minutes)
- [ ] Frame rate reports (target: 60 FPS on 85% of devices)
- [ ] Load time distribution (target: <2s for 95% of users)

**Feature Adoption**:
- [ ] Power-up token grants (are webhooks firing?)
- [ ] Speed test usage (expect: +40% increase)
- [ ] Mission completion rate
- [ ] Leaderboard views

**Social Sentiment**:
- [ ] Social media mentions (track hashtag #DefendOoredoo)
- [ ] App Store reviews (respond to 1-3 star reviews immediately)
- [ ] Customer support tickets (categorize by issue type)

**Alert Triggers** (immediate response required):
- Crash rate >2%
- API response time >500ms for 5 consecutive minutes
- Database CPU >90%
- Error rate >1%
- Negative viral social post (>100 shares)

**On-Call Team** (launch day):
- Product Manager: [Contact]
- Backend Developer: [Contact]
- DevOps Engineer: [Contact]
- Customer Support Lead: [Contact]

**Communication Protocol**:
- Minor issues: Slack #launch-war-room
- Major issues: Conference call, escalate to CTO
- Public statement: Only after approval from Marketing Director

Generate live dashboard with auto-refresh (30-second intervals).
```

**Expected Output**: Launch day monitoring dashboard and response plan

---

### Validation Steps:

✅ All metrics within acceptable ranges  
✅ No critical issues during first 24 hours  
✅ Positive social sentiment (>80% positive mentions)  
✅ 1,000+ downloads in first 24 hours  
✅ <1% crash rate maintained

---

## Phase 4 Completion Checklist

Before moving to Phase 5, ensure:

- [x] Production environment stable
- [x] App Store submissions approved
- [x] Marketing campaign executed successfully
- [x] Launch day metrics meet targets (1,000+ downloads, <1% crash rate)
- [x] Customer support handling inquiries effectively
- [x] No critical bugs in production
- [x] Social media sentiment positive
- [x] Press coverage secured (3+ articles)

**Deliverable**: Game launched to all Ooredoo app users, initial metrics positive

---

# PHASE 5: MAINTENANCE & ITERATION (Week 10+)

## 📁 Reference Files
- All documents (ongoing reference)

---

## Ongoing Tasks

### Task 5.1: Weekly Operations

**Duration**: Ongoing (every week)

### Instructions for Cursor:

**Prompt 29**: "Generate weekly operations checklist"

```markdown
Create weekly maintenance and operations checklist:

**Every Monday (00:00 MVT)**:
- [ ] Weekly challenge resets
- [ ] Leaderboard resets and rewards distributed
- [ ] New challenge launched (varies by week)
- [ ] Monitor reset process for errors

**Daily Tasks**:
- [ ] Review analytics dashboard (DAU, retention, crash rate)
- [ ] Monitor customer support tickets (categorize and prioritize)
- [ ] Check server health (CPU, memory, disk usage)
- [ ] Review social media mentions (respond to questions/complaints)
- [ ] Verify daily missions generating correctly

**Weekly Tasks** (every Friday):
- [ ] Review weekly metrics vs. targets:
  - DAU: Target 5,000+
  - D7 retention: Target 60%+
  - Crash rate: Target <1%
  - Feature adoption: Speed test +40%, bill pay +20%
- [ ] Analyze power-up usage data (which are most/least popular?)
- [ ] Review leaderboard for anomalies (cheating detection)
- [ ] Plan next week's content/events
- [ ] Update product roadmap based on feedback

**Bi-Weekly Tasks**:
- [ ] A/B test review (analyze results, implement winner)
- [ ] Balance adjustments based on data (difficulty, rewards, power-up effectiveness)
- [ ] Bug triage meeting (prioritize fixes for next sprint)
- [ ] User feedback synthesis (categorize feature requests)

**Monthly Tasks**:
- [ ] Seasonal event planning (if applicable)
- [ ] ROI analysis (ARPU lift, churn reduction, Red Club growth)
- [ ] Comprehensive performance review (30-day cohort analysis)
- [ ] Roadmap review with stakeholders
- [ ] Database optimization (reindex, vacuum)

Generate monthly operations report template.
```

**Expected Output**: Weekly operations checklist and monthly report template

---

### Task 5.2: Content Updates

**Duration**: Ongoing (monthly)

### Instructions for Cursor:

**Prompt 30**: "Create content update workflow"

Reference: `features.md` → Optional Features (Seasonal Events)

```markdown
Generate content update planning and deployment workflow:

**Content Update Types**:

1. **New Ship Skins** (Monthly):
   - Design brief to artists (1 new skin per month)
   - Timeline: 1 week design, 3 days integration, 1 day testing
   - Launch: Announced via social media, unlockable at specific rank
   - Gambo.ai: Upload asset, add to customization menu

2. **New Enemy Types** (Quarterly):
   - Concept design phase (2 weeks)
   - Implementation in Gambo.ai (1 week)
   - Balance testing (1 week)
   - Launch with seasonal event

3. **Seasonal Events** (Quarterly):
   - **Planning** (4 weeks before):
     - Define event theme (e.g., "5G Defense Week")
     - Design event-specific assets (backgrounds, enemies, rewards)
     - Create event missions
     - Set reward structure
   - **Development** (2 weeks before):
     - Implement event logic in Gambo.ai
     - Test event flow
     - Prepare marketing materials
   - **Launch** (event start):
     - Deploy event via OTA update
     - Announce on social media
     - Monitor participation
   - **Post-Event** (after event):
     - Analyze metrics (participation rate, completion rate)
     - Distribute rewards
     - Gather feedback for next event

4. **Balance Patches** (As needed):
   - Based on weekly data analysis
   - Examples:
     - Enemy descent speed adjustment
     - Power-up token drop rate changes
     - Reward amount increases
   - Deploy via Gambo.ai OTA (no app store approval needed)

**Content Calendar** (Year 1):
| Month | Content Update |
|-------|----------------|
| Launch+1 | Bug fixes, balance adjustments |
| Launch+2 | First new ship skin unlock |
| Launch+3 | Q1 Seasonal Event (5G Defense Week) |
| Launch+4 | New ship skin, new enemy type |
| Launch+5 | Balance patch |
| Launch+6 | Q2 Seasonal Event (Independence Day) |
| Launch+9 | Q3 Seasonal Event (Ramadan Special) |
| Launch+12 | Q4 Seasonal Event (Year-End Mega Wave) |

Generate content update deployment checklist.
```

**Expected Output**: Content update workflow and annual calendar

---

### Task 5.3: Performance Optimization

**Duration**: Ongoing (quarterly)

### Instructions for Cursor:

**Prompt 31**: "Generate performance optimization checklist"

```markdown
Create quarterly performance optimization review:

**Areas to Optimize**:

1. **Client-Side (Game)**:
   - [ ] Review frame rate data (identify devices with <60 FPS)
   - [ ] Optimize asset loading (lazy load non-critical assets)
   - [ ] Reduce particle count on low-end devices
   - [ ] Implement level-of-detail (LOD) system
   - [ ] Profile JavaScript execution (identify bottlenecks)
   - [ ] Reduce memory footprint (object pooling, garbage collection tuning)

2. **Server-Side (APIs)**:
   - [ ] Analyze slow queries (>100ms)
   - [ ] Add database indexes where needed
   - [ ] Implement query result caching (Redis)
   - [ ] Optimize leaderboard calculation (materialized views)
   - [ ] Review API response times (P50, P95, P99)
   - [ ] Scale horizontally if needed (add more servers)

3. **CDN (Assets)**:
   - [ ] Review asset sizes (compress further if possible)
   - [ ] Implement image optimization (WebP format)
   - [ ] Set aggressive caching headers (long TTL)
   - [ ] Review CDN hit/miss ratio (target: >95% hit rate)

4. **Database**:
   - [ ] Run VACUUM ANALYZE (PostgreSQL maintenance)
   - [ ] Review slow query log
   - [ ] Optimize table indexes
   - [ ] Archive old game sessions (>12 months)
   - [ ] Review connection pool settings

**Performance Targets** (maintain quarterly):
- Frame rate: 60 FPS on 85%+ of devices
- Load time: <2 seconds (P95)
- API response time: <200ms (P50), <500ms (P95)
- Database query time: <50ms (P95)
- Crash rate: <1%
- Memory usage: <150MB

Generate performance optimization report with before/after metrics.
```

**Expected Output**: Quarterly performance optimization plan

---

### Task 5.4: Feature Roadmap

**Duration**: Ongoing (quarterly planning)

### Instructions for Cursor:

**Prompt 32**: "Generate feature roadmap for Year 2"

Reference: `features.md` → Optional Features

```markdown
Create product roadmap for Year 2 based on Year 1 success:

**Q1 (Months 13-15)**: Social Features
- Friends system (add friends, view profiles)
- Challenge friend feature (1v1 competitions)
- Replay sharing (save and share gameplay clips)
- Social leaderboard (friends-only rankings)

**Q2 (Months 16-18)**: New Game Modes
- Endless mode (survive as long as possible)
- Boss rush mode (consecutive boss battles)
- Time attack mode (highest score in 1 minute)
- Practice mode (no-stakes gameplay)

**Q3 (Months 19-21)**: Advanced Features
- Tournament system (monthly tournaments with prizes)
- Clan/guild system (team competitions)
- Achievements overhaul (100+ badges)
- Customization expansion (projectile trails, sound packs)

**Q4 (Months 22-24)**: Platform Expansion
- Desktop/web version optimization
- Tablet-specific UI improvements
- Accessibility enhancements (voice controls, switch access)
- Localization (add Dhivehi language support)

**Feature Prioritization Framework**:
For each proposed feature, evaluate:
1. User demand (% of users requesting)
2. Development effort (small/medium/large)
3. Business impact (ARPU lift, retention improvement)
4. Differentiation (unique vs. competitors)

**Decision Matrix**:
| Feature | Demand | Effort | Impact | Priority |
|---------|--------|--------|--------|----------|
| Friends System | High | Medium | High | P0 |
| Endless Mode | Medium | Small | Medium | P1 |
| Tournaments | Low | Large | High | P2 |

Generate roadmap presentation for stakeholders.
```

**Expected Output**: Year 2 feature roadmap with prioritization

---

## Phase 5 Success Criteria

**Ongoing Metrics** (maintain for 12 months):
- DAU: 10,000+ sustained
- MAU: 30,000+ sustained
- D30 retention: 35%+
- Crash rate: <1%
- ARPU lift: +25% among players
- Churn reduction: -5% among players
- Red Club growth: 10,000+ new members attributed to game
- ROI: 8.7x+ maintained

**Quarterly Reviews**:
- Review metrics vs. targets
- Adjust strategy based on data
- Plan next quarter's content and features
- Present results to executive stakeholders

---

**Document Owner**: Product Manager  
**Last Updated**: November 2025  
**Next Review**: Post-launch (Week 11)
