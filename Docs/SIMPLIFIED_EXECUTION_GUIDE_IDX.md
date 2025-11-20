# COMPLETE EXECUTION GUIDE FOR GOOGLE IDX
## Ooredoo Network Defenders - Simplified Version

---

## 🎯 WHAT YOU'RE BUILDING

**Simple Space Invaders clone with:**
- Tap to shoot enemies
- Earn points
- Daily leaderboard
- Daily reward for reaching score threshold
- Pixel art retro style

**Timeline**: 6 weeks  
**Platform**: Google IDX (web-based development)  
**Tech Stack**: HTML5 + JavaScript + Node.js  
**No coding knowledge needed** - just follow these instructions exactly

---

## 📋 PREREQUISITES

### 1. Google IDX Setup
1. Go to https://idx.google.com/
2. Sign in with your Google account
3. Click "New Project"
4. Select "Web Application" template
5. Name it: "ooredoo-network-defenders"

### 2. Required Accounts
- **Ooredoo API Access**: Contact Ooredoo IT team for:
  - API endpoint URLs
  - Authentication credentials
  - Red Club API keys
- **Database**: Google IDX includes PostgreSQL (we'll use this)

---

## 🗂️ PROJECT STRUCTURE

Google IDX will create this structure for you:

```
ooredoo-network-defenders/
├── frontend/               # Game UI
│   ├── index.html         # Main menu
│   ├── game.html          # Gameplay screen
│   ├── styles.css         # Pixel art styling
│   ├── game.js            # Game logic
│   └── assets/            # Sprites, sounds
│       ├── sprites/       # Pixel art images
│       └── sounds/        # 8-bit audio
├── backend/               # API server
│   ├── server.js          # Express server
│   ├── database.js        # PostgreSQL connection
│   └── routes/            # API endpoints
│       ├── leaderboard.js # Daily leaderboard
│       └── rewards.js     # Red Club integration
└── README.md              # Documentation
```

---

# PHASE 1: SETUP (Week 1)

## Day 1-2: Project Initialization

### Step 1.1: Create Project in Google IDX

**Prompt for IDX Assistant**:
```
Create a new web application project with the following structure:

Project: ooredoo-network-defenders
Tech Stack:
- Frontend: HTML5 + Vanilla JavaScript (no frameworks)
- Backend: Node.js + Express
- Database: PostgreSQL (included in IDX)
- Styling: Pure CSS (pixel art retro style)

File structure:
/frontend - All game UI files
/backend - API server
/assets - Sprites and sounds

Initialize package.json with dependencies:
- express
- pg (PostgreSQL client)
- cors
- dotenv

Create basic index.html with placeholder content.
```

### Step 1.2: Install Dependencies

**Run in IDX Terminal**:
```bash
cd backend
npm init -y
npm install express pg cors dotenv
```

**What this does**: Installs required Node.js packages for the server.

---

## Day 3-4: Get Pixel Art Assets

### Step 2.1: Commission Pixel Art

**Brief for Pixel Artist** (send to Fiverr/Upwork):

```
PROJECT: Retro Space Invaders Game Assets

STYLE: 8-bit/16-bit pixel art (reference uploaded image style)

ASSETS NEEDED:

1. PLAYER SHIP (32×32 pixels):
   - Red spaceship (Ooredoo brand color #E30613)
   - Retro arcade style
   - 2 animation frames (idle)

2. ENEMIES (24×24 pixels each, 4 types):
   - Type 1: Purple alien (antenna) - 40 points
   - Type 2: Yellow alien (different shape) - 30 points
   - Type 3: Blue alien - 20 points
   - Type 4: Green alien (simplest) - 10 points
   - Each: 2 animation frames

3. PROJECTILES:
   - Player shot: Red beam (2×8 pixels)
   - Enemy shot: Orange/yellow (2×6 pixels)

4. EXPLOSIONS:
   - 3-frame explosion animation (24×24 pixels)
   - Particle burst style

5. UI ELEMENTS:
   - Pixel font (alphabet, numbers, symbols)
   - Button frames (various sizes)
   - Border elements

6. BACKGROUND:
   - Scrolling star field (repeatable pattern)

FORMAT: PNG with transparency, 2x scale for retina displays
COLOR PALETTE: 
  - Red: #E30613 (Ooredoo)
  - Purple: #B026FF
  - Yellow: #FFD700
  - Blue: #00F0FF
  - Green: #39FF14
  - White: #FFFFFF
  - Black: #000000

DELIVERY: 48 hours
BUDGET: $500-1000
```

### Step 2.2: Get 8-Bit Sound Effects

**Brief for Sound Designer**:

```
PROJECT: 8-Bit Arcade Game Sounds

STYLE: Chiptune / retro arcade

SOUNDS NEEDED:

MUSIC:
1. Menu theme (30-second loop, upbeat)
2. Gameplay theme (45-second loop, fast-paced)
3. Victory jingle (3 seconds)
4. Defeat jingle (2 seconds)

SFX:
1. Player shoot - "Pew" laser sound
2. Enemy explosion - 8-bit burst (4 variations)
3. Player hit - Damage sound
4. Button click - Beep
5. Reward earned - Coin collection sound
6. Victory fanfare - Success chime

FORMAT: MP3, 96kbps
STYLE: Classic 8-bit NES/Game Boy era
DELIVERY: 1 week
BUDGET: $300-500
```

---

## Day 5-7: Database Setup

### Step 3.1: Create Database Schema

**Prompt for IDX Assistant**:
```
Create a PostgreSQL database schema for a simple Space Invaders game with daily leaderboard and rewards.

Tables needed:

1. users (stores player info):
   - user_id (UUID, primary key)
   - ooredoo_user_id (string, unique)
   - created_at (timestamp)
   - total_games_played (integer)
   - highest_score_ever (integer)
   - total_red_club_points_earned (integer)

2. daily_scores (stores today's scores):
   - score_id (UUID, primary key)
   - user_id (foreign key to users)
   - score (integer)
   - game_date (date, defaults to today)
   - created_at (timestamp)
   - unique constraint: user_id + game_date (one entry per user per day)

3. daily_rewards (tracks who earned reward today):
   - reward_id (UUID, primary key)
   - user_id (foreign key to users)
   - reward_date (date, defaults to today)
   - reward_amount (integer, default 50)
   - claimed_at (timestamp)
   - unique constraint: user_id + reward_date (one reward per user per day)

Create all necessary indexes for performance.
Generate the SQL schema file.
```

**Expected Output**: IDX will create `schema.sql` file

### Step 3.2: Apply Schema

**Run in IDX Terminal**:
```bash
psql -U postgres -d ooredoo_game < schema.sql
```

**Verify tables exist**:
```bash
psql -U postgres -d ooredoo_game -c "\dt"
```

**Should show**: users, daily_scores, daily_rewards tables

---

# PHASE 2: CORE DEVELOPMENT (Weeks 2-3)

## Week 2: Frontend Game

### Step 4.1: HTML Structure

**Prompt for IDX Assistant**:
```
Create index.html for the main menu screen with pixel art styling:

Requirements:
- Title: "NETWORK DEFENDERS" in pixel font style
- Large "PLAY NOW" button (red, retro style)
- "LEADERBOARD" button
- "STATS" button
- Black background
- Retro arcade aesthetic
- Mobile-first responsive (portrait orientation)
- All buttons should have large touch targets (minimum 60px height)

Use semantic HTML5.
Include meta tags for mobile viewport.
Link to styles.css and game.js.
```

**Expected Output**: `frontend/index.html`

### Step 4.2: Game Canvas Setup

**Prompt for IDX Assistant**:
```
Create game.html with HTML5 Canvas for gameplay:

Requirements:
- Full-screen canvas (fills viewport in portrait mode)
- HUD overlay (score at top-left, timer at top-right)
- Canvas ID: "gameCanvas"
- Black background
- Retro pixel art rendering (disable smoothing)
- Include script tag for game.js

Canvas settings:
- Width: 360px (scales to device width)
- Height: 640px (scales to device height)
- CSS: crisp-edges, pixelated rendering
```

**Expected Output**: `frontend/game.html`

### Step 4.3: CSS Styling (Pixel Art)

**Prompt for IDX Assistant**:
```
Create styles.css with pixel-perfect retro arcade styling:

Requirements:

FONTS:
- Import pixel font from Google Fonts: "Press Start 2P"
- Fallback: monospace

COLORS:
- Primary: #E30613 (Ooredoo red)
- Secondary: #00F0FF (cyan)
- Background: #000000 (black)
- Text: #FFFFFF (white)

BUTTONS:
- Chunky pixel borders (4px solid)
- Large text (16px minimum)
- Hover effect: glow shadow
- Active effect: scale down slightly (0.95)
- Minimum height: 60px
- Border-radius: 0px (sharp corners for retro look)

LAYOUT:
- Center all content
- Vertical stacking for mobile
- Max width: 600px
- Padding: 20px

ANIMATIONS:
- Pulse effect for primary button
- Fade in transitions
- No smooth animations (keep it pixelated)

CANVAS:
- image-rendering: pixelated
- image-rendering: crisp-edges
- Disable anti-aliasing

Include media queries for different screen sizes.
```

**Expected Output**: `frontend/styles.css`

---

### Step 4.4: Core Game Logic

**Prompt for IDX Assistant**:
```
Create game.js with complete Space Invaders gameplay logic:

GAME CONSTANTS:
- Canvas: 360x640px
- Player ship size: 32x32px
- Enemy size: 24x24px
- Formation: 4 rows × 9 columns (36 enemies)
- Session duration: 45 seconds
- Target FPS: 60

PLAYER:
- Position: Bottom center (y = 600)
- Auto-move: Oscillates side-to-side (speed: 2 pixels/frame, amplitude: 100px)
- Shooting: Tap anywhere on canvas to fire
- Projectile: Red, travels upward at 8 pixels/frame
- Cooldown: 0.3 seconds between shots

ENEMIES:
- Formation: 4 rows, 9 per row
- Spacing: 10px between enemies
- Movement: 
  - Side-to-side: 1 pixel/frame
  - Descends: 10px when reaching edge
  - Speed increases: +0.2 pixels/frame for each 9 enemies destroyed
- Shooting:
  - Random: 1 enemy shoots every 60 frames (1 second)
  - Bottom row priority: 3x more likely to shoot
  - Projectile: Orange, travels downward at 4 pixels/frame

SCORING:
- Row 1 (top): 40 points per enemy
- Row 2: 30 points
- Row 3: 20 points
- Row 4 (bottom): 10 points
- Time bonus: +10 points per second remaining
- Perfect clear (no hits taken): +100 bonus

GAME LOOP:
1. Initialize game state
2. Start 3-second countdown
3. Main loop (60 FPS):
   - Update timer (decrease by deltaTime)
   - Update player position (auto-move)
   - Update projectiles (move, check bounds)
   - Update enemies (move formation, shoot)
   - Check collisions:
     * Player projectile hits enemy → destroy enemy, add points
     * Enemy projectile hits player → game over
     * Enemy reaches bottom (y > 600) → game over
     * All enemies destroyed → victory
   - Render everything
4. Game end → Show results

COLLISION DETECTION:
- Use AABB (Axis-Aligned Bounding Box)
- Generous hitboxes for mobile (sprite size + 4px margin)

INPUT HANDLING:
- Mouse click / Touch tap anywhere → fire projectile
- Cooldown prevents spam (0.3s)

RENDERING:
- Clear canvas each frame (black background)
- Draw star field (scrolling effect)
- Draw all enemies (with sprite or colored rect if sprite not loaded)
- Draw all projectiles (red for player, orange for enemies)
- Draw player ship
- Draw HUD (score, timer)

GAME STATE:
- State machine: 'countdown' → 'playing' → 'gameover'
- Track: score, time remaining, enemies alive, projectiles array

Use vanilla JavaScript (no frameworks).
Use requestAnimationFrame for game loop.
Include detailed comments.
```

**Expected Output**: `frontend/game.js` (complete game logic)

---

### Step 4.5: Results Screen

**Prompt for IDX Assistant**:
```
Create results.html for post-game screen:

Requirements:
- Display final score (large, centered)
- Display today's rank (e.g., "#23 of 1,247 players")
- Display daily reward status:
  - If score >= 5000: "✓ Daily Reward Earned! +50 Red Club Points" (green)
  - If score < 5000: "Score 5,000+ to earn today's reward!" (yellow)
- Buttons:
  - "PLAY AGAIN" (primary, large, red)
  - "VIEW LEADERBOARD" (secondary)
  - "RETURN TO APP" (tertiary)
- Pixel art styling
- Celebration animation if reward earned (optional confetti)

Fetch data from API:
- POST /api/scores/submit (send score)
- GET /api/leaderboard/today (get rank)
- GET /api/rewards/check (see if reward earned)

Display loading state while fetching.
Handle errors gracefully.
```

**Expected Output**: `frontend/results.html`

---

## Week 3: Backend API

### Step 5.1: Express Server Setup

**Prompt for IDX Assistant**:
```
Create backend/server.js with Express API server:

Requirements:
- Express server on port 3000
- CORS enabled (allow frontend origin)
- Body parser for JSON
- Environment variables from .env
- PostgreSQL connection
- Error handling middleware
- Request logging

Routes needed:
- POST /api/scores/submit - Submit game score
- GET /api/leaderboard/today - Get daily leaderboard
- GET /api/rewards/check - Check if user earned reward today
- POST /api/rewards/claim - Claim daily reward

Health check:
- GET /api/health - Returns {status: 'ok', timestamp: ...}

Start server and log: "Server running on http://localhost:3000"

Include detailed error handling and validation.
```

**Expected Output**: `backend/server.js`

### Step 5.2: Database Connection

**Prompt for IDX Assistant**:
```
Create backend/database.js with PostgreSQL connection:

Requirements:
- Use 'pg' package
- Connection pool (max 10 connections)
- Connect to IDX PostgreSQL (localhost)
- Environment variables:
  - DB_USER=postgres
  - DB_PASSWORD=(from IDX)
  - DB_HOST=localhost
  - DB_PORT=5432
  - DB_NAME=ooredoo_game

Functions:
- query(sql, params) - Execute SQL query
- getClient() - Get client from pool
- closePool() - Close all connections

Error handling for connection failures.
Export pool and query function.
```

**Expected Output**: `backend/database.js`

---

### Step 5.3: Score Submission Endpoint

**Prompt for IDX Assistant**:
```
Create backend/routes/scores.js with score submission logic:

POST /api/scores/submit
Request body:
{
  "user_id": "ooredoo_12345",
  "score": 6250,
  "session_duration": 38.5,
  "enemies_killed": 36
}

Logic:
1. Validate input (score >= 0, user_id not empty)
2. Check if user exists in users table, create if not
3. Check if user already has score today in daily_scores
4. If yes: UPDATE only if new score is higher
   If no: INSERT new score
5. Calculate rank (how many users have higher scores today)
6. Return response:
{
  "success": true,
  "score": 6250,
  "rank": 23,
  "best_today": 6250,
  "total_players_today": 1247
}

Include SQL queries:
- SELECT to check existing score
- INSERT or UPDATE daily_scores
- SELECT COUNT to calculate rank

Error handling for database errors.
Export router.
```

**Expected Output**: `backend/routes/scores.js`

---

### Step 5.4: Leaderboard Endpoint

**Prompt for IDX Assistant**:
```
Create backend/routes/leaderboard.js:

GET /api/leaderboard/today
Query params:
- user_id (optional): Highlight this user's rank

Logic:
1. Query database for top 50 scores today:
   SELECT user_id, score, ROW_NUMBER() OVER (ORDER BY score DESC) as rank
   FROM daily_scores
   WHERE game_date = CURRENT_DATE
   ORDER BY score DESC
   LIMIT 50

2. If user_id provided, also get their rank:
   SELECT COUNT(*) + 1 as rank
   FROM daily_scores
   WHERE score > (SELECT score FROM daily_scores WHERE user_id = ? AND game_date = CURRENT_DATE)
   AND game_date = CURRENT_DATE

3. Return response:
{
  "success": true,
  "leaderboard": [
    {"rank": 1, "user_id": "user_001", "score": 9850},
    {"rank": 2, "user_id": "user_002", "score": 9100},
    ...
  ],
  "user_rank": 23,
  "total_players": 1247
}

Cache results for 30 seconds (to reduce DB load).
Export router.
```

**Expected Output**: `backend/routes/leaderboard.js`

---

### Step 5.5: Daily Reward System

**Prompt for IDX Assistant**:
```
Create backend/routes/rewards.js with daily reward logic:

GET /api/rewards/check
Query params:
- user_id: User to check

Logic:
1. Get user's best score today from daily_scores
2. Check if score >= DAILY_THRESHOLD (default: 5000)
3. Check if reward already claimed today in daily_rewards
4. Return response:
{
  "success": true,
  "eligible": true/false,
  "claimed": true/false,
  "threshold": 5000,
  "best_score_today": 6250,
  "reward_amount": 50
}

POST /api/rewards/claim
Request body:
{
  "user_id": "ooredoo_12345"
}

Logic:
1. Verify user is eligible (score >= threshold)
2. Check not already claimed today
3. INSERT into daily_rewards
4. Call Ooredoo Red Club API to add points:
   POST https://api.ooredoo.mv/redclub/points/add
   {
     "user_id": "ooredoo_12345",
     "points": 50,
     "source": "network_defenders_daily_reward",
     "date": "2025-11-19"
   }
5. Return response:
{
  "success": true,
  "reward_claimed": true,
  "amount": 50,
  "new_balance": 1350
}

Include retry logic for Ooredoo API (3 attempts, exponential backoff).
Export router.
```

**Expected Output**: `backend/routes/rewards.js`

---

### Step 5.6: Mount Routes in Server

**Prompt for IDX Assistant**:
```
Update backend/server.js to mount all routes:

Import routes:
- const scoresRouter = require('./routes/scores');
- const leaderboardRouter = require('./routes/leaderboard');
- const rewardsRouter = require('./routes/rewards');

Mount routes:
- app.use('/api/scores', scoresRouter);
- app.use('/api/leaderboard', leaderboardRouter);
- app.use('/api/rewards', rewardsRouter);

Add middleware:
- app.use(express.json());
- app.use(cors());
- app.use(express.static('../frontend')); (serve frontend files)

Test all endpoints with example requests in comments.
```

---

# PHASE 3: INTEGRATION & TESTING (Week 4)

## Step 6.1: Connect Frontend to Backend

**Prompt for IDX Assistant**:
```
Update frontend/game.js to integrate with backend API:

After game ends:
1. Calculate final score (enemy points + time bonus + perfect bonus)
2. POST to /api/scores/submit:
   fetch('/api/scores/submit', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       user_id: getUserId(), // Get from Ooredoo SSO
       score: finalScore,
       session_duration: sessionTime,
       enemies_killed: enemiesDestroyed
     })
   })
3. On success: Redirect to results.html with score in URL params
4. On error: Show error message, allow retry

Update results.html to:
1. Get score from URL params
2. Fetch rank: GET /api/leaderboard/today?user_id=...
3. Check reward: GET /api/rewards/check?user_id=...
4. If eligible and not claimed: POST /api/rewards/claim
5. Display all data

Handle loading states and errors.
Add retry buttons for failed requests.
```

---

## Step 6.2: Load Pixel Art Assets

**Prompt for IDX Assistant**:
```
Update game.js to load and render pixel art sprites:

Asset loading:
1. Create Image objects for all sprites
2. Load player ship sprite
3. Load 4 enemy type sprites
4. Load projectile sprites
5. Load explosion animation frames
6. Wait for all to load before starting game

Rendering:
1. Replace colored rectangles with sprite images
2. Use ctx.drawImage(sprite, x, y, width, height)
3. Ensure pixelated rendering (no smoothing):
   ctx.imageSmoothingEnabled = false;

Animation:
1. Enemy idle animation: Alternate between 2 frames every 30 frames
2. Explosion animation: Play 3 frames then remove

Fallback:
1. If sprite fails to load, use colored rectangle
2. Log error but continue game

Preload all assets on page load.
Show loading screen until ready.
```

---

## Step 6.3: Add Sound Effects

**Prompt for IDX Assistant**:
```
Create frontend/audio.js for sound management:

Requirements:
- Load all 8-bit sound files
- Play sounds on events:
  - Player shoots → "pew.mp3"
  - Enemy destroyed → "explosion.mp3" (random variation 1-4)
  - Player hit → "damage.mp3"
  - Victory → "victory.mp3"
  - Defeat → "defeat.mp3"
  - Button click → "beep.mp3"
  - Reward earned → "coin.mp3"

Music:
- Loop menu theme on index.html
- Loop gameplay theme during game
- Fade between tracks smoothly

Volume controls:
- Master volume (from settings)
- Music volume
- SFX volume

Use Web Audio API for better performance.
Preload all sounds.
Mute option available.
```

---

## Step 6.4: Testing Checklist

**Manual Testing**:

**Gameplay**:
- [ ] Tap anywhere fires projectile
- [ ] Player ship auto-moves correctly
- [ ] Enemies move in formation
- [ ] Enemies descend when reaching edge
- [ ] Enemies shoot projectiles
- [ ] Collisions work (player hits enemy, enemy hits player)
- [ ] Score calculates correctly
- [ ] Timer counts down
- [ ] Game ends at 0 seconds or when all enemies killed
- [ ] Victory/defeat states trigger correctly

**Backend**:
- [ ] Score submission works
- [ ] Leaderboard displays top 50
- [ ] Player rank calculated correctly
- [ ] Daily reward eligibility checked
- [ ] Red Club API integration works
- [ ] Database queries performant (<100ms)

**UI**:
- [ ] Pixel art assets display correctly
- [ ] No image smoothing (crisp pixels)
- [ ] Buttons respond to clicks/taps
- [ ] Loading states show appropriately
- [ ] Error messages display clearly

**Mobile**:
- [ ] Touch input works
- [ ] Portrait orientation locks
- [ ] No scrolling during gameplay
- [ ] Large enough touch targets
- [ ] Fits various screen sizes

**Performance**:
- [ ] 60 FPS maintained (use Chrome DevTools)
- [ ] Load time <2 seconds
- [ ] No memory leaks (check over 5 minutes)
- [ ] Audio doesn't crackle

---

# PHASE 4: DEPLOYMENT (Week 5)

## Step 7.1: Deploy to Google IDX Production

**Prompt for IDX Assistant**:
```
Deploy the application to IDX production environment:

Steps:
1. Build frontend:
   - Minify CSS
   - Minify JavaScript
   - Optimize images (use imageoptim or similar)
   - Generate production build

2. Configure environment variables:
   - DATABASE_URL (PostgreSQL connection string)
   - OOREDOO_API_KEY (for Red Club integration)
   - NODE_ENV=production
   - PORT=8080

3. Set up IDX deployment:
   - Create idx.yaml configuration
   - Define build and start commands
   - Configure auto-deploy on push

4. Database migration:
   - Run schema.sql on production database
   - Verify tables created

5. Start server:
   - node backend/server.js
   - Verify health check: GET /api/health

6. Test production URL:
   - Verify game loads
   - Test all API endpoints
   - Check CORS settings

Provide deployment checklist.
```

---

## Step 7.2: Ooredoo App Integration

**WebView Configuration**:

**For iOS (Ooredoo app developers)**:
```swift
import WebKit

let webView = WKWebView()
let url = URL(string: "https://your-idx-url.app/")!
webView.load(URLRequest(url: url))

// Pass Ooredoo user ID to game
let userID = getCurrentOoredooUserID()
let script = "localStorage.setItem('ooredoo_user_id', '\(userID)');"
webView.evaluateJavaScript(script)
```

**For Android (Ooredoo app developers)**:
```java
WebView webView = findViewById(R.id.webview);
webView.getSettings().setJavaScriptEnabled(true);
webView.loadUrl("https://your-idx-url.app/");

// Pass Ooredoo user ID to game
String userID = getCurrentOoredooUserID();
String script = "localStorage.setItem('ooredoo_user_id', '" + userID + "');";
webView.evaluateJavascript(script, null);
```

---

## Step 7.3: App Store Materials

**Screenshots Needed** (for Ooredoo app update):
1. Main menu screen
2. Gameplay action shot
3. Results screen showing reward
4. Leaderboard view

**App Update Description**:
```
Version X.X: NEW - Network Defenders Game!

Defend Ooredoo's network in this retro arcade shooter:
• Classic Space Invaders gameplay
• Compete on daily leaderboards
• Earn Red Club points for high scores
• Pixel art retro graphics
• Quick 30-45 second sessions

Plus bug fixes and performance improvements.
```

---

# PHASE 5: MAINTENANCE (Week 6+)

## Daily Operations

### Monitor Metrics:
- Daily active players
- Average score
- Reward claim rate
- API response times
- Error rates

**Run in IDX Terminal**:
```bash
# Check server logs
pm2 logs

# Check database stats
psql -U postgres -d ooredoo_game -c "
SELECT 
  COUNT(DISTINCT user_id) as daily_players,
  AVG(score) as avg_score,
  MAX(score) as high_score
FROM daily_scores
WHERE game_date = CURRENT_DATE;
"

# Check reward claims today
psql -U postgres -d ooredoo_game -c "
SELECT COUNT(*) as rewards_claimed_today
FROM daily_rewards
WHERE reward_date = CURRENT_DATE;
"
```

---

### Adjust Daily Threshold

If too many/few players earning rewards, adjust threshold:

**Prompt for IDX Assistant**:
```
Update backend/routes/rewards.js:

Change DAILY_THRESHOLD constant:
- Current: 5000
- If >50% players earning: Increase to 6000
- If <30% players earning: Decrease to 4000

Deploy change and monitor for 3 days.
Goal: 40% of daily players earn reward.
```

---

### Weekly Leaderboard Reset

**Cron job** (runs at midnight MVT):

**Prompt for IDX Assistant**:
```
Create backend/jobs/daily-reset.js:

Function runs at 00:00 MVT every day:
1. Archive yesterday's leaderboard (move to historical table)
2. daily_scores table keeps data (for all-time stats)
3. daily_rewards table keeps data (for audit)
4. Clear any cache
5. Log reset completion

Use node-cron package:
cron.schedule('0 0 * * *', () => {
  console.log('Running daily reset...');
  // Reset logic here
}, {
  timezone: "Indian/Maldives"
});

Add to server.js startup.
```

---

## Troubleshooting Guide

### Issue: Game won't load

**Check**:
1. Browser console errors (F12)
2. Network tab shows 404s?
3. Assets loading correctly?

**Fix in IDX**:
```bash
# Verify files exist
ls frontend/
ls frontend/assets/sprites/

# Check server running
pm2 status

# Restart server
pm2 restart server
```

---

### Issue: Scores not submitting

**Check**:
1. Network tab: Is POST /api/scores/submit succeeding?
2. Response status: 200 or error?
3. Database connection working?

**Fix in IDX**:
```bash
# Check database connection
psql -U postgres -d ooredoo_game -c "SELECT 1;"

# Check recent scores
psql -U postgres -d ooredoo_game -c "
SELECT * FROM daily_scores 
ORDER BY created_at DESC 
LIMIT 10;
"

# Check server logs
pm2 logs --lines 50
```

---

### Issue: Leaderboard not updating

**Check**:
1. Cache expired?
2. Database query slow?
3. Too many requests?

**Fix in IDX**:
```bash
# Clear Redis cache (if using)
redis-cli FLUSHALL

# Check query performance
psql -U postgres -d ooredoo_game -c "
EXPLAIN ANALYZE
SELECT user_id, score, 
  ROW_NUMBER() OVER (ORDER BY score DESC) as rank
FROM daily_scores
WHERE game_date = CURRENT_DATE
ORDER BY score DESC
LIMIT 50;
"

# Add index if needed
psql -U postgres -d ooredoo_game -c "
CREATE INDEX IF NOT EXISTS idx_daily_scores_date_score 
ON daily_scores(game_date, score DESC);
"
```

---

## 📊 Success Metrics Dashboard

**Create Simple Analytics**:

**Prompt for IDX Assistant**:
```
Create frontend/admin/dashboard.html:

Display real-time metrics:
1. Daily Active Players (today)
2. Total Games Played (today)
3. Average Score (today)
4. High Score (today + player)
5. Reward Claim Rate (% of players who earned reward)
6. Leaderboard top 10
7. Chart: Games played per hour (last 24h)

Fetch from new endpoint:
GET /api/admin/metrics

Require admin authentication (simple password).
Refresh every 30 seconds.

Use Chart.js for graphs.
Pixel art styling.
```

---

## 🎯 FINAL CHECKLIST

Before going live:

**Technical**:
- [ ] All assets loaded correctly (sprites, sounds)
- [ ] 60 FPS maintained on test devices
- [ ] No console errors
- [ ] Database schema applied
- [ ] API endpoints tested
- [ ] Ooredoo Red Club integration works
- [ ] Mobile responsive (portrait mode)
- [ ] Touch input responsive
- [ ] Offline handling graceful

**Content**:
- [ ] Pixel art style matches uploaded reference
- [ ] 8-bit sounds satisfying
- [ ] Scoring balanced (threshold achievable)
- [ ] Daily reward threshold tested (40% earn rate)

**Integration**:
- [ ] Works in Ooredoo app WebView
- [ ] User ID passed from Ooredoo app
- [ ] Red Club points awarded correctly
- [ ] Deep link returns to Ooredoo app

**Launch**:
- [ ] App store screenshots prepared
- [ ] Update description written
- [ ] Support docs created
- [ ] Monitoring dashboard live
- [ ] Team trained on troubleshooting

---

## 🚀 Launch Day Sequence

**T-24 hours**:
- [ ] Final QA pass
- [ ] Deploy to production
- [ ] Smoke test all features
- [ ] Alert team

**T-1 hour**:
- [ ] Verify server healthy
- [ ] Check database connections
- [ ] Monitor dashboard ready

**T-0 (Launch)**:
- [ ] Ooredoo app updated with game link
- [ ] Push notification: "New game available!"
- [ ] Social media posts
- [ ] Monitor metrics closely

**T+1 hour**:
- [ ] Check player count
- [ ] Verify no errors
- [ ] Watch server load

**T+24 hours**:
- [ ] Review metrics
- [ ] Collect feedback
- [ ] Plan adjustments

---

**Document Owner**: Technical Lead  
**Platform**: Google IDX  
**Philosophy**: "Keep it simple, make it fun, ship it fast."  
**Support**: Use IDX Assistant for any questions during development
