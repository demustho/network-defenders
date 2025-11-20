# Simplified Project Scope - Ooredoo Network Defenders

## 🎯 Project Vision

**Simple Concept**: Classic Space Invaders-style game with pixel art graphics. Players shoot enemies, earn points, and compete for daily high scores to win rewards.

**Core Loop**: Open app → Play game → Score points → Check daily leaderboard → Get reward if score meets threshold → Repeat tomorrow

**No Complexity**: No missions, no token systems, no feature integrations. Just pure arcade fun with rewards.

---

## 📋 Project Objectives

### What Players Do
1. **Play**: Tap to shoot enemies in classic Space Invaders style
2. **Score**: Earn points for destroying enemies
3. **Compete**: See their rank on daily leaderboard
4. **Win**: Reach daily score threshold (e.g., 5,000 points) to earn Red Club points
5. **Repeat**: Come back tomorrow for new daily leaderboard

### Business Goals
- **Daily Engagement**: Players return daily to compete for rewards
- **Red Club Growth**: Automatic Red Club points for high scores
- **Customer Retention**: Fun game reduces churn
- **Brand Association**: Ooredoo = fun and rewarding

---

## 📦 What We're Building

### Game Features (Keep It Simple!)
1. **Core Gameplay**
   - Tap anywhere to shoot
   - Enemies descend in formation
   - Destroy all enemies before they reach bottom
   - Session lasts 30-45 seconds
   - Unlimited retries

2. **Scoring**
   - Points for each enemy destroyed
   - Bonus points for speed
   - Total score displayed at end

3. **Daily Leaderboard**
   - Shows top 50 players for today only
   - Resets at midnight MVT every day
   - Player sees their rank

4. **Daily Reward**
   - If player's best score today ≥ daily threshold (e.g., 5,000 points)
   - Player earns Red Club points (e.g., 50 points)
   - Shown immediately after game: "You earned your daily reward!"
   - Only one reward per day (encourages daily return)

5. **Simple Stats**
   - Your best score today
   - Your rank today
   - Daily reward earned? (Yes/No)

### What We're NOT Building
❌ Power-ups or token systems  
❌ Missions or challenges  
❌ Weekly leaderboards  
❌ Ship customization  
❌ Achievement badges  
❌ Deep integration with Ooredoo features  
❌ Social features (friends, sharing)  

These can be added later if needed, but launch MVP is just: **play, score, compete, win reward**.

---

## 🎨 Visual Style

**Pixel Art Aesthetic** (like uploaded image):
- Retro 8-bit/16-bit graphics
- Simple, chunky sprites
- Bold primary colors
- Scanline effects (optional)
- Classic arcade font

**Color Scheme**:
- Ooredoo Red (#E30613) for player ship
- Bright colors for enemies (green, blue, yellow, purple)
- Black background with stars
- White text for clarity

**UI Style**:
- Minimal HUD during gameplay (just score and timer)
- Simple menu screens (no complex layouts)
- Large touch targets (easy to tap)
- Retro arcade feel throughout

---

## ⏱️ Timeline

**Total: 6 Weeks from Start to Launch** (simplified from 10 weeks)

| Week | Focus | Deliverable |
|------|-------|-------------|
| 1 | Setup & Design | Gambo.ai project + pixel art assets |
| 2 | Core Game | Playable game with scoring |
| 3 | Leaderboard & Rewards | Daily leaderboard + reward system |
| 4 | Testing | Bug fixes and balance |
| 5 | Launch Prep | App store submission, marketing |
| 6 | Launch | Go live! |

---

## 📊 Success Criteria

### Launch Goals (First 30 Days)
- ✅ 5,000+ unique players
- ✅ 3,000+ daily active users
- ✅ 60% D7 retention
- ✅ <1% crash rate
- ✅ 2,000+ players earn daily reward
- ✅ Positive app store reviews (4.0+ stars)

### Simplicity Metrics
- ✅ Tutorial completion: 95%+ (because it's so simple)
- ✅ Time to first game: <5 seconds
- ✅ Player understands reward system: 90%+
- ✅ Support tickets: <50 per week (due to simplicity)

---

## 💰 Budget

**Development**: $30,000-40,000 (less than original due to simplicity)
- Gambo.ai: $199/month × 2 months = $398
- Pixel art assets: $3,000-5,000
- Sound design: $2,000-3,000
- Backend API: $5,000 (simplified)
- Testing & QA: $2,000

**Monthly Operations**: $500-1,000
- Gambo.ai subscription: $199/month
- Server hosting: $200-400/month
- Maintenance: $100-400/month

**ROI Target**: 5x return in Year 1 (conservative due to simplified feature set)

---

## 🚫 Out of Scope (Not in MVP)

### Not Building Now
- Power-ups or special abilities
- Multiple game modes
- Weekly/monthly leaderboards
- Achievements or badges
- Ship customization
- Friends or social features
- Integration with Ooredoo app features (speed test, bill pay, etc.)
- Missions or challenges
- Seasonal events

### Can Add Later If Successful
If the simple version succeeds, we can add:
- Weekly tournaments
- Power-up system
- More enemy types
- Customization options
- Social sharing

But for MVP: **Keep it dead simple.**

---

## 📱 Technical Scope

### Platform
- **Primary**: Embedded WebView in Ooredoo mobile app (iOS & Android)
- **Technology**: Gambo.ai (no-code game builder)
- **Backend**: Simple Node.js API for leaderboard and rewards
- **Database**: PostgreSQL (just 3 tables: users, scores, daily_rewards)

### Performance
- 60 FPS on mid-range devices
- <2 second load time
- <100MB memory usage
- Works offline (syncs scores when online)

---

## 🎮 Player Experience Flow

```
1. User opens Ooredoo app
2. Sees "Network Defenders" game card
3. Taps "Play Now"
4. Game loads in 2 seconds
5. 3-second countdown starts
6. Player taps to shoot enemies for 30-45 seconds
7. Game ends (victory or defeat)
8. Results screen shows:
   - Your score: 6,250
   - Today's rank: #23
   - Daily reward earned! +50 Red Club points ✓
9. Player can:
   - Play Again (instant restart)
   - View Today's Leaderboard
   - Return to App
10. Player comes back tomorrow for new leaderboard
```

**Total time from app open to first game**: <10 seconds  
**Total time per game session**: 30-45 seconds  
**Friction points**: Minimal (no complex menus or choices)

---

## 🎯 Key Design Principles

1. **Simplicity First**: If a feature feels complex, cut it
2. **Instant Gratification**: Show score and reward immediately
3. **Daily Habit**: One clear goal: beat daily threshold
4. **Fair Competition**: Everyone competes on same leaderboard
5. **Nostalgic Fun**: Pixel art creates emotional connection
6. **No Grinding**: Can't "unlock" anything - all players equal

---

## 📞 Stakeholder Communication

**Weekly Check-in**: Show playable build every Friday  
**Metrics Review**: Daily during first week post-launch  
**Decision-Making**: Product Owner (you) has final say on all features  

**One Rule**: If a proposed feature takes more than 10 seconds to explain to a player, it's too complex for MVP.

---

**Document Owner**: Product Manager  
**Last Updated**: November 2025  
**Philosophy**: "Simple games, played daily, create lasting engagement."
