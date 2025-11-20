# UX/UI Guidelines - Ooredoo Network Defenders

## 🎨 Design Philosophy

### Core Principles
1. **Mobile-First**: Portrait orientation, optimized for one-handed play
2. **Minimal Friction**: One tap to start playing, instant feedback
3. **Cyberpunk Aesthetic**: Neon colors, glowing effects, futuristic elements
4. **Ooredoo Brand Alignment**: Red (#E30613) as primary color throughout
5. **Accessibility**: High contrast, clear typography, colorblind modes

### Design Goals
- **Session Length**: Keep gameplay UI minimal to focus on 30-45 second sessions
- **Reward Visibility**: Clearly showcase Red Club points and power-up tokens earned
- **Progressive Disclosure**: Don't overwhelm new users; reveal features gradually
- **Haptic Feedback**: Enhance mobile experience with vibrations on key actions

---

## 📱 Screen Inventory

### Primary Screens (Launch MVP)
1. **Pre-Game Screen** - Main entry point, loadout selection
2. **Gameplay Screen** - Core game with minimal HUD
3. **Results Screen** - Victory/defeat, rewards showcase
4. **Leaderboard Screen** - Rankings and competition
5. **Missions Screen** - Daily missions and weekly challenges
6. **Settings Screen** - Audio, graphics, accessibility options
7. **Tutorial Screens** - 4-step interactive onboarding

### Secondary Screens (Post-Launch)
8. **Profile Screen** - User stats, badges, customization
9. **Help/FAQ Screen** - Documentation and support
10. **Seasonal Event Screen** - Special event details and rewards

---

## 🗺️ Navigation Flow

### App Entry Points

```
Ooredoo Mobile App
    │
    ├─→ Home Screen Widget: "Network Defenders" Card
    │   └─→ [Play Now] Button → Pre-Game Screen
    │
    ├─→ Red Club Section: "Play to Earn Points" Banner
    │   └─→ Tap Banner → Pre-Game Screen
    │
    ├─→ After Service Actions (Speed Test, Bill Pay, etc.)
    │   └─→ "Claim Your Power-Up!" Prompt → Pre-Game Screen
    │
    └─→ Push Notification: "Daily Mission Available!"
        └─→ Tap Notification → Missions Screen
```

### In-Game Navigation Flow

```
Pre-Game Screen
    │
    ├─→ [Defend Network] Button → 3-Second Countdown → Gameplay Screen
    │
    ├─→ [Leaderboard] Button → Leaderboard Screen
    │   └─→ [Close] Button → Pre-Game Screen
    │
    ├─→ [Missions] Button → Missions Screen
    │   ├─→ Mission Deep Link → Ooredoo Feature → Returns to Pre-Game
    │   └─→ [Close] Button → Pre-Game Screen
    │
    ├─→ [Red Club Rewards] Button → Red Club Section (Ooredoo App)
    │   └─→ Back Navigation → Pre-Game Screen
    │
    ├─→ [Profile] Icon → Profile Screen
    │   ├─→ Badges Tab → Badge List
    │   ├─→ Customization Tab → Ship/Projectile Selection
    │   └─→ [Close] Button → Pre-Game Screen
    │
    ├─→ [?] Help Icon → Help/FAQ Screen
    │   └─→ [Close] Button → Pre-Game Screen
    │
    └─→ [⚙] Settings Icon → Settings Screen
        └─→ [Close] Button → Pre-Game Screen
```

### Gameplay Loop

```
Gameplay Screen
    │
    ├─→ Victory → Victory Animation (2s) → Results Screen
    │   ├─→ [Play Again] Button → 3-Second Countdown → Gameplay Screen
    │   ├─→ [View Leaderboard] Button → Leaderboard Screen
    │   └─→ [Return to App] Button → Ooredoo App Home
    │
    ├─→ Defeat → Defeat Animation (2s) → Results Screen
    │   ├─→ [Try Again] Button → 3-Second Countdown → Gameplay Screen
    │   ├─→ [Use Shield Token?] Optional → Restart from checkpoint
    │   └─→ [Return to App] Button → Ooredoo App Home
    │
    └─→ [⏸] Pause Button → Pause Overlay
        ├─→ [Resume] Button → Continue Gameplay
        ├─→ [Restart] Button → Restart Session
        ├─→ [Settings] Button → Settings Screen
        └─→ [Quit] Button → Pre-Game Screen (Confirm Dialog)
```

---

## 🎯 Wireframe Specifications

### 1. Pre-Game Screen (Main Menu)

**Layout Structure**:
```
┌─────────────────────────────────────┐
│ [Profile]    🛡️ NETWORK      [?][⚙]│ ← Top Bar (60px)
│             DEFENDERS               │
├─────────────────────────────────────┤
│                                     │
│     ┌─────────────────────┐        │
│     │   [Ship Preview]    │        │ ← Ship Display (180px)
│     │   Manta Ray Elite   │        │   Rotating 3D model
│     │                     │        │
│     │  Rank: Commander    │        │
│     │  Score: 45,320      │        │
│     └─────────────────────┘        │
│                                     │
│   Power-Up Loadout:                │ ← Power-Up Selection (120px)
│   ┌──────┐ ┌──────┐ ┌──────┐      │   Horizontal scroll if >3
│   │ 🚀 x3│ │ 🛡️ x1│ │  +   │      │
│   │Speed │ │Shield│ │ Add  │      │
│   └──────┘ └──────┘ └──────┘      │
│                                     │
│   ┌─────────────────────────────┐  │
│   │    ▶️ DEFEND NETWORK        │  │ ← Primary CTA (80px)
│   │                             │  │   Glowing red button
│   └─────────────────────────────┘  │
│                                     │
│   Daily Missions (2/3):            │ ← Mission Preview (100px)
│   ✅ Play 3 games                  │
│   ⭕ Perfect Defense                │
│                                     │
│   ┌────────────┐ ┌────────────┐   │
│   │Leaderboard │ │  Missions  │   │ ← Secondary Actions (60px)
│   └────────────┘ └────────────┘   │
│   ┌─────────────────────────────┐  │
│   │    Red Club Rewards         │  │ ← Tertiary Action (60px)
│   └─────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
Total Height: ~760px (fits iPhone SE)
```

**Interactive Elements**:
- **Profile Icon**: Tap → Profile Screen
- **Help Icon**: Tap → Help/FAQ Screen
- **Settings Icon**: Tap → Settings Screen
- **Ship Preview**: Tap → Ship Customization Modal
- **Power-Up Slots**: Tap → Select from available tokens (modal)
- **DEFEND NETWORK Button**: Tap → Start Game (3-second countdown)
- **Mission Preview**: Tap → Full Missions Screen
- **Secondary Buttons**: Tap → Navigate to respective screens

**Visual Design**:
- **Background**: Dark gradient (navy to black) with animated stars
- **Ship Preview**: Floating/rotating animation, glowing edges
- **Primary Button**: Ooredoo red, pulsing glow effect, large touch target
- **Power-Up Slots**: Card-based design, quantity badge, disabled state if 0 tokens
- **Mission Preview**: Checkmark animation on completion

---

### 2. Gameplay Screen

**Layout Structure**:
```
┌─────────────────────────────────────┐
│ 2,450    ⏱️ 30s    🛡️ Shield 3s    │ ← HUD Top (40px, translucent)
├─────────────────────────────────────┤
│                                     │
│         [Enemy Formation]           │ ← Gameplay Area (600px)
│                                     │   Full interactive zone
│                                     │
│                                     │
│                                     │
│                                     │
│         [Player Ship]               │
│                                     │
├─────────────────────────────────────┤
│         ❤️❤️❤️                       │ ← HUD Bottom (40px)
│                            ⏸️       │   Lives + Pause
└─────────────────────────────────────┘
Total Height: ~680px
```

**Interactive Elements**:
- **Tap Anywhere**: Fire projectile (entire gameplay area is touch target)
- **Pause Button**: Tap → Pause Overlay
- **No Accidental Taps**: 50px margin around pause to prevent mis-taps

**Visual Design**:
- **HUD Elements**: Semi-transparent dark panels, high contrast text
- **Score**: Large glowing red numbers, increments animate
- **Timer**: Yellow at <10s, red + pulse at <5s
- **Active Power-Up**: Icon + countdown, glowing border
- **Lives**: Heart icons, glow red when hit, shake animation on damage
- **Combo Counter**: Appears center screen when combo >5, scales with combo
- **Feedback Overlays**: 
  - "+30" damage numbers float up from enemy
  - "COMBO x10!" pulses at screen center
  - Screen edge pulse red when enemies near bottom

**Performance**:
- **Frame Rate**: 60 FPS locked
- **Touch Latency**: <50ms from tap to projectile spawn
- **Particle Budget**: Max 100 particles on-screen

---

### 3. Results Screen (Victory)

**Layout Structure**:
```
┌─────────────────────────────────────┐
│                                     │
│      🎉 NETWORK SECURED! 🎉         │ ← Victory Message (80px)
│                                     │   Animated text entrance
├─────────────────────────────────────┤
│                                     │
│    ┌───────────────────────┐       │
│    │   Score: 3,450        │       │ ← Primary Metric (120px)
│    │   +34 Red Club Pts    │       │   Large, emphasized
│    └───────────────────────┘       │
│                                     │
│    Performance:                     │ ← Stats Breakdown (150px)
│    Accuracy: 87%                    │   Staggered animation
│    Combos: 15                       │
│    Time Bonus: +150                 │
│                                     │
│    Rewards Earned:                  │ ← Rewards List (150px)
│    ✅ 34 Red Club Points            │   Icon + text
│    ✅ Progress: 85% to Captain      │
│    ✅ Mission: "Play 3" (2/3)       │
│                                     │
│    ┌───────────────────────┐       │
│    │   ▶️ PLAY AGAIN        │       │ ← Primary CTA (70px)
│    └───────────────────────┘       │   One-tap restart
│                                     │
│    [View Leaderboard]               │ ← Secondary Actions (50px)
│    [Return to App]                  │
│                                     │
└─────────────────────────────────────┘
Total Height: ~720px
```

**Animation Sequence** (5 seconds total):
1. **0.0-0.5s**: Victory message fades in with scale animation
2. **0.5-1.0s**: Score card slides up from bottom
3. **1.0-2.0s**: Stats appear sequentially (stagger 0.2s each)
4. **2.0-3.0s**: Rewards slide in from left with checkmark animation
5. **3.0-3.5s**: Buttons fade in, become interactive
6. **3.5s+**: User can interact

**Interactive Elements**:
- **Play Again Button**: Immediate restart, no confirmation
- **View Leaderboard**: Navigate to leaderboard, show player's new rank
- **Return to App**: Exit game, return to Ooredoo app home

**Visual Design**:
- **Background**: Animated victory scene (green data streams, network nodes pulsing)
- **Victory Message**: Large text with glow effect, confetti particles
- **Score Card**: Elevated card with shadow, Ooredoo red border
- **Reward Icons**: Animated checkmarks, glow effect
- **Progress Bar**: Smooth fill animation to new percentage

---

### 4. Results Screen (Defeat)

**Layout Structure**:
```
┌─────────────────────────────────────┐
│                                     │
│     ⚠️ NETWORK BREACHED ⚠️           │ ← Defeat Message (80px)
│                                     │
├─────────────────────────────────────┤
│                                     │
│    "The data disruptors broke       │ ← Motivational Copy (80px)
│     through. Try again to           │
│     defend the network!"            │
│                                     │
│    Score: 1,820                     │ ← Performance (100px)
│    +18 Red Club Points              │
│                                     │
│    Best: 3,450 (#42)                │ ← Personal Best (60px)
│                                     │
│    ┌───────────────────────┐       │
│    │   ▶️ TRY AGAIN         │       │ ← Primary CTA (70px)
│    └───────────────────────┘       │
│                                     │
│    [Use Shield Token?]              │ ← Optional Continue (50px)
│    (Costs 1 Shield - Revive now)   │   Only if token available
│                                     │
│    [Return to App]                  │ ← Exit Action (50px)
│                                     │
└─────────────────────────────────────┘
Total Height: ~600px
```

**Interactive Elements**:
- **Try Again Button**: Restart immediately
- **Use Shield Token**: Spend 1 shield to continue from last checkpoint (if available)
- **Return to App**: Exit game

**Visual Design**:
- **Background**: Red corruption effect, glitching data
- **Defeat Message**: Less emphasis than victory, encouraging tone
- **Motivational Copy**: Friendly, not punishing
- **Personal Best**: Show comparison to encourage improvement

---

### 5. Leaderboard Screen

**Layout Structure**:
```
┌─────────────────────────────────────┐
│   🏆 Leaderboard                    │ ← Header (60px)
│   [Weekly] [Monthly] [All-Time]    │   Tab navigation
├─────────────────────────────────────┤
│                                     │
│   Your Rank: #42 ↑5                 │ ← Player Position (70px)
│   Score: 3,450                      │   Sticky, always visible
│                                     │
├─────────────────────────────────────┤
│   Top Players:                      │
│                                     │
│   🥇 [🚀] Ahmed ⭐⭐⭐                │ ← Rank 1 (60px)
│       15,890 pts                    │   Gold highlight
│                                     │
│   🥈 [🚀] Fatima ⭐⭐                 │ ← Rank 2 (60px)
│       14,200 pts                    │   Silver highlight
│                                     │
│   🥉 [🚀] Hassan ⭐                  │ ← Rank 3 (60px)
│       13,100 pts                    │   Bronze highlight
│                                     │
│   ...                               │
│                                     │
│   42 [🚀] YOU ⭐                     │ ← Player Entry (60px)
│       3,450 pts                     │   Highlighted, centered
│                                     │
│   ...                               │ ← Scrollable List
│                                     │   Infinite scroll/pagination
│                                     │
├─────────────────────────────────────┤
│   [Close]  [Challenge Friend]       │ ← Actions (60px)
└─────────────────────────────────────┘
Total Height: Full screen
```

**Interactive Elements**:
- **Tabs**: Switch between Weekly/Monthly/All-Time leaderboards
- **Player Entries**: Tap → View profile (future feature)
- **Challenge Friend**: Send challenge to specific player (future)
- **Pull to Refresh**: Update leaderboard data
- **Infinite Scroll**: Load more entries as user scrolls

**Visual Design**:
- **Player Position**: Sticky header, always visible during scroll
- **Top 3**: Special visual treatment (gold/silver/bronze borders, trophy icons)
- **Player Highlight**: Blue/cyan background, bold text
- **Ship Avatar**: Small ship icon next to name
- **Badges**: Top 3 badges displayed as icons
- **Rank Change**: Green ↑ for improvement, red ↓ for drop, gray = for no change

---

### 6. Missions Screen

**Layout Structure**:
```
┌─────────────────────────────────────┐
│   📋 Daily Missions                 │ ← Header (60px)
│   Resets in: 8h 32m                 │   Countdown timer
├─────────────────────────────────────┤
│                                     │
│   ✅ Morning Defender (3/3)         │ ← Completed Mission (100px)
│   Reward: 20 pts, 1 token           │   Checkmark animation
│   [CLAIMED]                         │   Disabled button
│                                     │
│   ⏳ Perfect Defense (0/1)          │ ← In Progress (100px)
│   Win without taking damage         │   Progress bar
│   Reward: 100 pts, Shield           │
│   [IN PROGRESS]                     │   Active state
│                                     │
│   🔒 Speed Demon (0/1)              │ ← Locked Mission (100px)
│   Unlocks at Lieutenant             │   Grayed out
│                                     │
├─────────────────────────────────────┤
│   ── Weekly Challenge ──            │
│   🏆 Survival Week                  │ ← Challenge Card (150px)
│   Your score: 45,320                │
│   Rank: #42 (Silver)                │
│   Ends in: 3d 14h                   │
│   [VIEW LEADERBOARD]                │
│                                     │
├─────────────────────────────────────┤
│   [Close]           [Play Now]      │ ← Actions (60px)
└─────────────────────────────────────┘
Total Height: ~700px (scrollable)
```

**Mission Types**:
1. **Completed**: Green checkmark, "CLAIMED" button (disabled)
2. **In Progress**: Progress bar, current/target numbers
3. **Locked**: Grayed out, shows unlock requirement
4. **Ooredoo Feature**: Blue accent, "GO TO FEATURE" button with deep link

**Interactive Elements**:
- **Mission Cards**: Tap to expand details (if more info available)
- **Claim Reward Button**: Tap to collect rewards (confetti animation)
- **Deep Link Button**: Tap to open Ooredoo feature (Speed Test, Bill Pay, etc.)
- **Weekly Challenge Card**: Tap to view full leaderboard
- **Play Now Button**: Quick start game from missions screen

**Visual Design**:
- **Countdown Timer**: Prominent, updates every second
- **Progress Bar**: Smooth fill animation, Ooredoo red
- **Reward Icons**: Small power-up tokens + point values
- **Deep Link Missions**: Blue accent color to distinguish from gameplay missions
- **Weekly Challenge**: Elevated card with border, rank badge

---

### 7. Settings Screen

**Layout Structure**:
```
┌─────────────────────────────────────┐
│   ⚙️ Settings                       │ ← Header (60px)
├─────────────────────────────────────┤
│                                     │
│   Audio                             │ ← Section Headers (40px)
│   Master Volume    [=====◯--]  80% │   Sliders (40px each)
│   Music Volume     [====◯---]  70% │
│   SFX Volume       [======◯-] 100% │
│   Voice Announce   [ON / OFF]      │   Toggle (40px)
│                                     │
│   Graphics                          │
│   Quality          [High ▾]        │   Dropdown (40px)
│   Particles        [ON / OFF]      │   Toggle (40px)
│   Screen Shake     [ON / OFF]      │
│   CRT Filter       [ON / OFF]      │
│                                     │
│   Accessibility                     │
│   Colorblind Mode  [None ▾]        │
│   Reduced Motion   [ON / OFF]      │
│   Haptic Feedback  [ON / OFF]      │
│   Visual Audio     [ON / OFF]      │
│                                     │
│   Language         [English ▾]     │   Dhivehi option
│                                     │
├─────────────────────────────────────┤
│   [Reset Progress]                  │ ← Danger Actions (50px)
│   [Privacy Policy]                  │   Red text
│   [Sign Out]                        │
│                                     │
└─────────────────────────────────────┘
Total Height: ~740px (scrollable)
```

**Interactive Elements**:
- **Sliders**: Drag to adjust volume (0-100%)
- **Toggles**: Tap to switch ON/OFF
- **Dropdowns**: Tap to expand options
- **Reset Progress**: Confirmation dialog before proceeding
- **Privacy Policy**: Opens web view with policy document
- **Sign Out**: Confirmation dialog, returns to Ooredoo app

**Visual Design**:
- **Section Headers**: Uppercase, gray text, divider line
- **Sliders**: Ooredoo red fill, circular handle
- **Toggles**: iOS-style switch, red when ON
- **Dropdowns**: Chevron icon, modal or bottom sheet picker
- **Danger Actions**: Red text, separated from other settings

---

## 🎨 UI Component Library

### Buttons

**Primary Button (DEFEND NETWORK)**:
```css
{
  background: linear-gradient(135deg, #E30613, #A00410);
  border: 2px solid #FF0716;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(227, 6, 19, 0.6);
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
  height: 70px;
  text-transform: uppercase;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(227, 6, 19, 0.6); }
  50% { box-shadow: 0 0 30px rgba(227, 6, 19, 1.0); }
}
```

**Secondary Button (Leaderboard, Missions)**:
```css
{
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #00F0FF;
  border-radius: 8px;
  color: #00F0FF;
  font-size: 16px;
  height: 50px;
  backdrop-filter: blur(10px);
}
```

**Tertiary Button (Return to App)**:
```css
{
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  height: 40px;
}
```

**Button States**:
- **Default**: As defined above
- **Hover/Focus**: Increase brightness by 20%
- **Active/Pressed**: Scale down to 0.95, increase shadow
- **Disabled**: Opacity 0.3, no pointer events

---

### Cards

**Elevated Card (Mission, Power-Up)**:
```css
{
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(10, 14, 39, 0.9));
  border: 1px solid rgba(227, 6, 19, 0.3);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  padding: 16px;
  backdrop-filter: blur(10px);
}
```

**Leaderboard Entry**:
```css
/* Top 3 Entries */
.rank-1 { border-left: 4px solid #FFD700; }
.rank-2 { border-left: 4px solid #C0C0C0; }
.rank-3 { border-left: 4px solid #CD7F32; }

/* Player Entry */
.player-entry {
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid #00F0FF;
  animation: highlight 1s ease-out;
}
```

---

### Typography

**Font Family**: 
- Primary: **Orbitron** (Headers, UI labels) - Futuristic, geometric
- Secondary: **Roboto** (Body text, descriptions) - Readable, clean

**Font Sizes**:
```css
{
  --font-size-hero: 32px;      /* Victory/Defeat messages */
  --font-size-large: 24px;     /* Score, primary stats */
  --font-size-medium: 18px;    /* Section headers */
  --font-size-body: 16px;      /* Body text, descriptions */
  --font-size-small: 14px;     /* Secondary info, captions */
  --font-size-tiny: 12px;      /* Timestamps, footnotes */
}
```

**Font Weights**:
- Light: 300 (Secondary info)
- Regular: 400 (Body text)
- Medium: 500 (Labels, buttons)
- Bold: 700 (Headers, scores, CTA buttons)

---

### Colors

**Primary Palette**:
```css
{
  --ooredoo-red: #E30613;
  --ooredoo-red-dark: #A00410;
  --ooredoo-red-light: #FF0716;
  
  --cyan-accent: #00F0FF;
  --purple-accent: #B026FF;
  --green-accent: #39FF14;
  
  --background-dark: #0A0E27;
  --background-card: #1A1A2E;
  
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-disabled: rgba(255, 255, 255, 0.3);
}
```

**Enemy Type Colors**:
```css
{
  --lagmite-color: #FFA500;      /* Orange */
  --spameroid-color: #808080;    /* Gray */
  --buffer-beast-color: #00F0FF; /* Cyan */
  --dropcall-drone-color: #8B0000; /* Dark Red */
  --roaming-rogue-color: #C0C0C0; /* Silver */
  --boss-color: #FF00FF;         /* Magenta/Glitch */
}
```

**Status Colors**:
```css
{
  --success: #39FF14;
  --warning: #FFD700;
  --error: #FF0716;
  --info: #00F0FF;
}
```

---

### Icons

**Icon Library**: Font Awesome 6 (Free)

**Common Icons**:
- Profile: `fa-user-circle`
- Help: `fa-question-circle`
- Settings: `fa-gear`
- Play: `fa-play`
- Pause: `fa-pause`
- Leaderboard: `fa-trophy`
- Missions: `fa-clipboard-check`
- Power-Up: `fa-bolt`
- Shield: `fa-shield-alt`
- Close: `fa-times`
- Back: `fa-arrow-left`

**Icon Sizes**:
- Small: 16px
- Medium: 24px (default)
- Large: 32px
- Extra Large: 48px (Pre-game ship preview)

---

### Animations

**Page Transitions**:
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Scale In */
@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

**Duration Guidelines**:
- Micro-interactions (button press): 100-150ms
- Component transitions (modal open): 250-300ms
- Page transitions (screen change): 400-500ms
- Celebration animations (victory): 1000-2000ms

---

## 📐 Responsive Design

### Screen Size Breakpoints

**Portrait Orientation (Primary)**:
- **Small Phone**: 320px - 374px (iPhone SE)
- **Medium Phone**: 375px - 413px (iPhone 12/13, Pixel 5)
- **Large Phone**: 414px - 480px (iPhone 14 Pro Max, Galaxy S21)
- **Tablet**: 768px+ (iPad)

**Landscape Orientation (Secondary)**:
- Rotate prompt: "Rotate device for best experience"
- Gameplay disabled in landscape (optional future feature)

### Safe Areas (iOS Notch)

```css
{
  padding-top: max(20px, env(safe-area-inset-top));
  padding-bottom: max(20px, env(safe-area-inset-bottom));
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

---

## ♿ Accessibility

### WCAG 2.1 Compliance (AA Level)

**Color Contrast**:
- Text on background: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- UI components: Minimum 3:1 ratio

**Touch Targets**:
- Minimum size: 44x44px (iOS) / 48x48px (Android)
- Spacing between targets: Minimum 8px

**Screen Reader Support**:
- All interactive elements have descriptive labels
- ARIA labels for game state ("Score: 2450 points")
- Announce power-up activations ("Speed Booster activated")
- Announce mission completions

**Keyboard Navigation** (Desktop/PWA):
- Tab order follows visual flow
- Enter/Space activates buttons
- Escape closes modals

### Colorblind Modes

**Protanopia (Red-Blind)**:
- Replace red with blue tones
- Lagmites: Orange → Blue
- Enemy projectiles: Red → Yellow

**Deuteranopia (Green-Blind)**:
- Enhance contrast
- Use blue/yellow palette

**Tritanopia (Blue-Blind)**:
- Replace blue with red/yellow tones
- Cyan accents → Magenta accents

---

## 🔊 Audio UX

### Sound Design Principles
1. **Clear Feedback**: Every action has distinct audio cue
2. **Non-Intrusive**: Background music at 70% default, easily adjustable
3. **Spatial Audio**: Directional cues for off-screen enemies (optional)
4. **Layered Audio**: Music, SFX, and voice on separate channels

### Audio Priority Levels
- **Critical**: Player damage, game over, victory
- **High**: Enemy destruction, power-up activation
- **Medium**: Projectile fire, UI navigation
- **Low**: Ambient sounds, background music

### Audio Ducking
- Music volume reduces to 30% during:
  - Boss entry animation
  - Victory/defeat sequence
  - Voice announcements

---

## 📱 Mobile-Specific UX

### Haptic Feedback (iOS & Android)

**Light Impact**:
- UI button tap
- Menu navigation

**Medium Impact**:
- Projectile fire
- Enemy destruction
- Mission complete

**Heavy Impact**:
- Player hit
- Boss defeated
- Rank up

**Success Notification**:
- Victory
- Perfect clear bonus
- Badge unlock

**Warning Notification**:
- Low time warning (<10s)
- Enemies near bottom

### Touch Gestures

**Single Tap**: Fire projectile (anywhere on gameplay screen)
**Long Press**: No action (prevents accidental holds)
**Swipe**: No action in gameplay (reserved for menu navigation)
**Pinch**: No action (prevents accidental zooming)

### Battery Optimization

**Performance Modes**:
- **High Performance**: 60 FPS, full effects (default on charge)
- **Balanced**: 45 FPS, reduced particles (default on battery)
- **Battery Saver**: 30 FPS, minimal effects (auto-enable at <20% battery)

**Background Behavior**:
- Pause game immediately when app backgrounded
- Save session state (resume on return within 5 minutes)
- Disconnect WebSocket connections
- Stop audio playback

---

## 🎯 User Onboarding Flow

### First-Time User Experience (FTUE)

**Step 1: Welcome Screen** (3 seconds)
```
"Welcome, Network Defender!
Protect Ooredoo's digital galaxy."
[Tap to Begin]
```

**Step 2: Basic Controls** (30 seconds)
- Show 3 stationary enemies
- Prompt: "Tap anywhere to fire"
- Wait for user to destroy all 3 enemies
- Haptic feedback + audio on first shot

**Step 3: Movement** (20 seconds)
- Show 5 moving enemies
- Prompt: "Your ship moves automatically. Focus on shooting!"
- Wait for user to destroy all 5 enemies

**Step 4: Power-Ups Introduction** (20 seconds)
- Show Speed Test prompt
- Prompt: "Complete Ooredoo features to earn power-ups!"
- Simulate Speed Test completion
- Grant 3 Speed Booster tokens with animation

**Step 5: Missions** (15 seconds)
- Show Daily Missions screen
- Highlight "Play 3 games" mission
- Prompt: "Complete missions to earn rewards!"

**Step 6: First Real Game** (45 seconds)
- Launch full gameplay session
- Reduced difficulty for first game
- Tutorial complete badge awarded on victory

**Total FTUE Time**: ~2.5 minutes

### Progressive Feature Unlocks

| Rank | Unlocked Features |
|------|-------------------|
| Cadet (Start) | Basic gameplay, daily missions, tutorial |
| Private (11 games) | First ship skin unlock notification |
| Corporal (26 games) | Projectile customization introduction |
| Lieutenant (51 games) | Weekly challenges unlocked notification |
| Captain (101 games) | Trail effects introduction |
| Major (201 games) | Advanced missions notification |

---

## 📊 User Testing Priorities

### Key Metrics to Test

**Usability**:
- Time to first game start: Target <10 seconds
- Tutorial completion rate: Target >80%
- Settings discovery rate: Target >40% within 10 sessions
- Mission completion rate: Target >60% daily

**Engagement**:
- Average session length: Target 8-12 minutes
- Sessions per day: Target 3-5
- Return rate after victory: Target >70%
- Return rate after defeat: Target >50%

**Clarity**:
- Power-up understanding: Survey after 5 games, target 90% understand mechanic
- Red Club conversion clarity: Target 85% understand point conversion
- Mission objectives clarity: Target 95% understand how to complete

---

## 🔄 Iteration Guidelines

### A/B Testing Candidates

1. **Pre-Game CTA Button**:
   - Variant A: "DEFEND NETWORK" (current)
   - Variant B: "PLAY NOW"
   - Variant C: "START GAME"
   - Metric: Tap rate, time to first game

2. **Results Screen Layout**:
   - Variant A: Rewards first, then stats
   - Variant B: Stats first, then rewards
   - Metric: Play Again rate, retention

3. **Power-Up Presentation**:
   - Variant A: Pre-game loadout selection (current)
   - Variant B: Auto-equip best available
   - Metric: Power-up usage rate, user confusion

4. **Mission Notification Timing**:
   - Variant A: 10am MVT
   - Variant B: 6pm MVT
   - Variant C: Personalized based on play history
   - Metric: Mission completion rate

---

**Document Owner**: UI/UX Designer  
**Last Updated**: November 2025  
**Next Review**: After Phase 2 development (Week 2)
