# Simplified Features - Ooredoo Network Defenders

## 🎮 Core Principle

**One Simple Goal**: Play Space Invaders, score points, earn daily reward if you beat the threshold.

---

## 🔴 MVP FEATURES (Must Have for Launch)

### Feature 1: Core Gameplay

**User Story**: As a player, I want to play a simple Space Invaders game so I can have fun and earn points.

**How It Works**:
1. Player taps "Play Now" button
2. 3-second countdown appears
3. Game starts:
   - Player ship at bottom (auto-moves side-to-side)
   - Tap anywhere to shoot upward
   - Enemies in formation descend from top
   - Destroy enemies before they reach bottom
4. Game ends after 30-45 seconds OR when all enemies destroyed OR if enemy reaches bottom
5. Score displayed

**Acceptance Criteria**:
- [ ] Tap anywhere fires projectile upward
- [ ] Unlimited ammunition, 0.3s cooldown between shots
- [ ] 36 enemies in 4 rows × 9 columns formation
- [ ] Enemies move side-to-side and descend
- [ ] Enemy reaches bottom = game over
- [ ] All enemies destroyed = victory
- [ ] Session duration: 30-45 seconds
- [ ] 60 FPS on mid-range devices
- [ ] Instant restart available

**Scoring**:
- Top row enemies: 40 points each
- Second row: 30 points each
- Third row: 20 points each
- Bottom row: 10 points each
- Time bonus: +10 points per second remaining
- Perfect clear (no damage): +100 bonus points

**Pixel Art Style**:
- Player ship: Red retro spaceship (like uploaded image ships)
- Enemies: Colorful pixel aliens (green, blue, yellow, purple)
- Projectiles: Simple colored pixels
- Explosions: 8-bit style particle bursts
- Background: Black with scrolling star field

---

### Feature 2: Scoring & Results

**User Story**: As a player, I want to see my score immediately after playing so I know how well I did.

**Results Screen Shows**:
1. **Your Score**: 6,250 (large, centered)
2. **Today's Rank**: #23 of 1,247 players
3. **Daily Reward Status**:
   - ✓ "Daily Reward Earned! +50 Red Club Points" (if score ≥ threshold)
   - OR "Score 5,000+ to earn today's reward!" (if below threshold)
4. **Your Best Today**: 6,250 (this game)
5. **Buttons**:
   - "Play Again" (primary, large button)
   - "View Leaderboard"
   - "Return to App"

**Acceptance Criteria**:
- [ ] Score calculated correctly (enemy points + bonuses)
- [ ] Results screen appears immediately after game ends
- [ ] Daily reward status shown clearly
- [ ] Best score today tracked
- [ ] Play Again restarts game in <1 second
- [ ] Animations are smooth and satisfying

---

### Feature 3: Daily Leaderboard

**User Story**: As a player, I want to see where I rank today so I can compete with others.

**Leaderboard Shows**:
- Top 50 players for today only
- Format:
  ```
  1. Ahmed - 9,850 points
  2. Fatima - 9,100 points
  3. Hassan - 8,750 points
  ...
  23. YOU - 6,250 points (highlighted)
  ...
  ```
- Resets at midnight MVT (Maldives time) every day
- Pull to refresh updates rankings

**Acceptance Criteria**:
- [ ] Shows top 50 scores for current day only
- [ ] Player's rank highlighted in blue
- [ ] Updates in real-time (5-second delay acceptable)
- [ ] Resets at midnight MVT automatically
- [ ] Handles ties (same score = same rank)
- [ ] Shows total players today (e.g., "1,247 players today")
- [ ] Loads in <2 seconds

**Simple Design**:
- Pixel art font for names and scores
- Gold/silver/bronze for top 3
- Your rank highlighted with arrow: "→ #23 YOU"
- Retro arcade aesthetic

---

### Feature 4: Daily Reward System

**User Story**: As a player, I want to earn Red Club points if I reach a good score so I'm motivated to play daily.

**How It Works**:
1. **Daily Threshold**: Set at 5,000 points (adjustable)
2. **Reward**: 50 Red Club points (adjustable)
3. **Rules**:
   - Play unlimited times per day
   - Your BEST score today counts
   - If best score ≥ 5,000 points → Earn reward
   - Only 1 reward per day (not per game)
   - Resets at midnight MVT

4. **When Reward Earned**:
   - Results screen shows: "🎉 Daily Reward Earned! +50 Red Club Points"
   - Red Club points added automatically
   - Push notification (optional): "You earned 50 Red Club points today!"

5. **If Below Threshold**:
   - Results screen shows: "Score 5,000+ to earn today's reward! (Current best: 4,250)"
   - Encourages player to try again

**Acceptance Criteria**:
- [ ] Daily threshold configurable (default: 5,000 points)
- [ ] Reward amount configurable (default: 50 RC points)
- [ ] Tracks best score for current day
- [ ] Awards reward only once per day
- [ ] Reward notification shown immediately
- [ ] Red Club API integration working
- [ ] Resets at midnight MVT automatically
- [ ] Handles edge cases (midnight during gameplay, offline play)

**Backend Logic**:
```
IF player's best_score_today >= daily_threshold
   AND daily_reward_claimed_today == FALSE
THEN
   - Award Red Club points
   - Set daily_reward_claimed_today = TRUE
   - Show success message
```

---

### Feature 5: Simple Stats Screen

**User Story**: As a player, I want to see my basic stats so I understand my progress.

**Stats Shown** (Simple screen, pixel art style):
```
╔════════════════════════════╗
║    YOUR STATS TODAY        ║
╠════════════════════════════╣
║  Games Played: 12          ║
║  Best Score: 6,250         ║
║  Your Rank: #23            ║
║  Daily Reward: ✓ EARNED    ║
╠════════════════════════════╣
║    ALL-TIME                ║
╠════════════════════════════╣
║  Total Games: 156          ║
║  Highest Score: 8,900      ║
║  Red Club Earned: 450 pts  ║
╚════════════════════════════╝
```

**Acceptance Criteria**:
- [ ] Shows today's stats (games played, best score, rank, reward status)
- [ ] Shows all-time stats (total games, highest ever, total RC points)
- [ ] Updates in real-time
- [ ] Simple pixel art layout
- [ ] Accessible from main menu

---

## 🎨 Visual Style Guide (Pixel Art)

### Sprite Specifications

**Player Ship**:
- Size: 32×32 pixels (scaled 2x for display = 64×64 on screen)
- Color: Ooredoo red primary, white/gray accents
- Style: Retro spaceship like uploaded image
- Animation: Slight thruster glow

**Enemies** (4 types, one per row):
- **Type 1 (Top Row)**: Purple alien, antenna, 40 points
- **Type 2 (Row 2)**: Yellow alien, different shape, 30 points
- **Type 3 (Row 3)**: Blue alien, 20 points
- **Type 4 (Bottom Row)**: Green alien, simplest, 10 points
- Size: 24×24 pixels each
- Animation: 2-frame idle animation (subtle movement)

**Projectiles**:
- Player: Red beam, 2×8 pixels
- Enemy: Orange/yellow pixels, 2×6 pixels

**Explosions**:
- 8-bit style particle burst
- 3-frame animation
- Color matches enemy type

**UI Elements**:
- Pixel art font (like uploaded image): "ABCDEFGH..." style
- Buttons: Chunky pixel borders, bold text
- Score: Large retro numbers
- Icons: 16×16 pixel icons for menus

### Color Palette
```
Ooredoo Red: #E30613
Enemy Colors:
  - Purple: #B026FF
  - Yellow: #FFD700
  - Blue: #00F0FF
  - Green: #39FF14
Background: #000000 (black)
Stars: #FFFFFF (white, small pixels)
Text: #FFFFFF (white)
UI Borders: #E30613 (red) or #00F0FF (cyan)
```

### Screen Layouts

**Main Menu**:
```
╔════════════════════════════════════╗
║                                    ║
║    NETWORK DEFENDERS               ║
║    [Pixel art logo]                ║
║                                    ║
║    ┌────────────────────┐          ║
║    │    ▶ PLAY NOW      │          ║
║    └────────────────────┘          ║
║                                    ║
║    [Leaderboard] [Stats]           ║
║                                    ║
╚════════════════════════════════════╝
```

**Gameplay HUD** (minimal):
```
Score: 2,450    Time: 35s
[Gameplay area - no UI]
```

**Results Screen**:
```
╔════════════════════════════════════╗
║    YOUR SCORE                      ║
║        6,250                       ║
║                                    ║
║    Today's Rank: #23               ║
║                                    ║
║    ✓ Daily Reward Earned!          ║
║       +50 Red Club Points          ║
║                                    ║
║    ┌────────────────────┐          ║
║    │   PLAY AGAIN       │          ║
║    └────────────────────┘          ║
║    [Leaderboard] [Return]          ║
╚════════════════════════════════════╝
```

---

## 🎵 Audio (Simple 8-bit Style)

### Music
- **Menu Theme**: Upbeat chiptune loop (30 seconds)
- **Gameplay Theme**: Fast-paced chiptune (45 seconds)
- **Victory Jingle**: 3-second celebration tune
- **Defeat Jingle**: 2-second "game over" tune

### Sound Effects
- **Shoot**: Classic "pew" laser sound
- **Enemy Destroyed**: 8-bit explosion
- **Player Hit**: Damage sound
- **Victory**: Success chime
- **Button Click**: Beep
- **Reward Earned**: Coin collection sound (satisfying!)

---

## ⚙️ Settings (Keep Minimal)

**Settings Screen**:
```
╔════════════════════════════════════╗
║    SETTINGS                        ║
╠════════════════════════════════════╣
║  Music Volume:  [====◯----]  60%   ║
║  SFX Volume:    [======◯--]  80%   ║
║  Vibration:     [ON]  OFF          ║
╠════════════════════════════════════╣
║  [Privacy Policy]                  ║
║  [About]                           ║
╚════════════════════════════════════╝
```

**Acceptance Criteria**:
- [ ] Volume sliders work (music, SFX independent)
- [ ] Vibration toggle works
- [ ] Settings persist across sessions
- [ ] Privacy policy opens in web view
- [ ] About shows version, credits

---

## 📊 Feature Priority

| Feature | Priority | Effort | Launch Blocker? |
|---------|----------|--------|-----------------|
| Core Gameplay | P0 | Medium | YES |
| Scoring & Results | P0 | Low | YES |
| Daily Leaderboard | P0 | Medium | YES |
| Daily Reward | P0 | Low | YES |
| Simple Stats | P1 | Low | NO (nice to have) |
| Settings | P1 | Low | NO (can use defaults) |

**MVP = P0 features only** (4 core features)

---

## 🚫 What We're NOT Building

❌ Power-ups  
❌ Multiple ships/customization  
❌ Missions or challenges  
❌ Weekly/monthly leaderboards  
❌ Achievement badges  
❌ Friends or social features  
❌ Tutorial (game is so simple, no tutorial needed)  
❌ Multiple difficulty levels  
❌ Boss battles  
❌ Story mode  

**Why?** These add complexity without adding core value for MVP. We can add later if players want them.

---

## 📱 User Flow (Dead Simple)

```
Ooredoo App Home
    ↓ (Tap "Network Defenders" card)
Main Menu
    ↓ (Tap "PLAY NOW")
3-2-1 Countdown
    ↓
GAMEPLAY (30-45 seconds)
    ↓
Results Screen
    ↓ (Choose action)
    ├→ Play Again (loops back to Countdown)
    ├→ View Leaderboard → (Returns to Main Menu)
    └→ Return to App (exits game)
```

**No complex navigation. No getting lost. Just play.**

---

## 🎯 Success Metrics Per Feature

### Core Gameplay
- Average session length: 30-45 seconds ✓
- 60 FPS maintained: 95%+ of devices ✓
- Crash rate: <1% ✓
- Players understand controls: 98%+ (instant)

### Daily Leaderboard
- Leaderboard view rate: 70%+ of players ✓
- Load time: <2 seconds ✓
- Players return next day: 60%+ ✓

### Daily Reward
- Reward earn rate: 40%+ of daily players ✓
- Red Club points distributed: 2,000+ per day ✓
- Players aware of reward: 95%+ ✓

---

**Document Owner**: Product Manager  
**Philosophy**: "If you can't explain it in one sentence, it's too complex."  
**Last Updated**: November 2025
