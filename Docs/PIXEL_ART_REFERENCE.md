# Pixel Art Style Reference - Based on Uploaded Image

## 🎨 Visual Style Analysis

Based on the uploaded image "PIXEL GAME ELEMENTS SET 4", here's your exact visual direction:

---

## 📐 Sprite Specifications

### Player Ship
**Style**: Classic arcade spaceship (like bottom-center ships in uploaded image)
- **Size**: 32×32 pixels (base), display at 2x = 64×64 on screen
- **Color**: Ooredoo red (#E30613) primary body
- **Accents**: White/light gray highlights
- **Details**: 
  - Angular wings
  - Pointed nose
  - Engine glow at rear
  - Simple geometric shape
- **Animation**: 2-frame idle (subtle thruster pulse)

**Reference from uploaded image**: The white/gray spaceships at bottom center

---

### Enemy Types (4 Rows)

#### Row 1: Purple Aliens (Top Row - 40 points)
- **Size**: 24×24 pixels
- **Color**: Purple/magenta (#B026FF)
- **Style**: Like the purple alien in uploaded image (top row, center)
- **Features**: Antenna, multiple eyes, squid-like
- **Animation**: 2 frames (tentacles/arms move)

#### Row 2: Yellow Aliens (Second Row - 30 points)
- **Size**: 24×24 pixels  
- **Color**: Yellow/gold (#FFD700)
- **Style**: Like the yellow alien in uploaded image
- **Features**: Star-burst shape, different form
- **Animation**: 2 frames (rotation or pulse)

#### Row 3: Blue Aliens (Third Row - 20 points)
- **Size**: 24×24 pixels
- **Color**: Cyan/blue (#00F0FF)
- **Style**: Compact, rounded alien form
- **Features**: Simple body, 2-3 eyes
- **Animation**: 2 frames (bobbing motion)

#### Row 4: Green Aliens (Bottom Row - 10 points)
- **Size**: 24×24 pixels
- **Color**: Bright green (#39FF14)
- **Style**: Simplest design (like green aliens in uploaded image)
- **Features**: Basic invader shape
- **Animation**: 2 frames (classic Space Invaders walk)

**Reference**: Top section of uploaded image shows multiple alien varieties

---

### Projectiles

#### Player Projectile
- **Size**: 2×8 pixels (thin vertical beam)
- **Color**: Ooredoo red (#E30613)
- **Style**: Solid filled rectangle (like the vertical lines in uploaded image)
- **Animation**: None (moves too fast)
- **Glow**: Optional 1px red outline

#### Enemy Projectile  
- **Size**: 2×6 pixels (shorter than player)
- **Color**: Orange/yellow (#FFA500)
- **Style**: Solid filled rectangle
- **Animation**: None
- **Glow**: Optional 1px orange outline

**Reference**: The vertical colored lines in center of uploaded image

---

### Explosions

**Style**: 8-bit particle burst (like the orange explosion sprites in uploaded image)
- **Frames**: 3 frames total
  - Frame 1: Small burst (16×16px)
  - Frame 2: Medium explosion (20×20px)  
  - Frame 3: Large particles (24×24px, fading)
- **Colors**: Match enemy type:
  - Purple alien → Purple particles
  - Yellow alien → Yellow particles
  - Blue alien → Blue particles
  - Green alien → Green particles
- **Animation**: Play 3 frames at 10fps, then remove
- **Style**: Chunky pixels, no gradients

**Reference**: The orange/red explosion sequence in center-right of uploaded image

---

## 🎨 Color Palette (Exact)

```
PRIMARY COLORS:
Ooredoo Red:    #E30613  ███████
Black (BG):     #000000  ███████
White (Text):   #FFFFFF  ███████

ENEMY COLORS:
Purple Alien:   #B026FF  ███████
Yellow Alien:   #FFD700  ███████
Blue Alien:     #00F0FF  ███████
Green Alien:    #39FF14  ███████

ACCENT COLORS:
Orange (Proj):  #FFA500  ███████
Gray (Detail):  #808080  ███████
Dark Red (Alt): #8B0000  ███████

POWER-UP COLORS (future use):
Cyan Power:     #00F0FF  ███████
Purple Power:   #B026FF  ███████
Yellow Power:   #FFD700  ███████
```

**Style Note**: Use flat colors only. No gradients. Pure solid fills.

---

## 🔤 Typography (Pixel Font)

**Font Style**: Classic arcade pixel font (like "PIXEL GAME ELEMENTS SET 4" title in image)

### Characteristics:
- **Monospace**: Each character same width
- **Blocky**: Sharp corners, no curves
- **Chunky**: Thick strokes (3-4 pixels wide)
- **All Caps**: Uppercase only for titles
- **Size Range**: 
  - Small: 8px height (UI labels)
  - Medium: 16px height (scores, buttons)
  - Large: 32px height (titles, big numbers)

### Recommended Fonts:
1. **"Press Start 2P"** (Google Fonts) - Perfect match
2. **"Silkscreen"** (Google Fonts) - Alternative
3. **"VT323"** (Google Fonts) - Cleaner option

**Reference**: The alphabet/numbers shown at right side of uploaded image

### Example Text Rendering:
```
NETWORK DEFENDERS  ← Title (32px)
SCORE: 6250        ← Stat (16px)
YOU WIN!           ← Message (24px)
PLAY AGAIN         ← Button (16px)
```

---

## 🖼️ UI Elements

### Buttons

**Style**: Chunky pixel borders with solid fill (like "YOU WIN!" / "GAME OVER" in uploaded image)

```
┌──────────────────┐
│   PLAY NOW       │  ← Red fill (#E30613)
└──────────────────┘     White border (2px)
     ▲
  Pixel corners (no rounding)
```

**States**:
- **Default**: Red fill, white border
- **Hover**: Brighter red + glow effect
- **Pressed**: Darker red, scale 0.95
- **Disabled**: Gray fill (#808080)

### Panels/Borders

**Style**: Rectangular panels with pixel borders

```
╔═══════════════════╗
║   LEADERBOARD     ║  ← Title bar (red)
╠═══════════════════╣
║ 1. Ahmed - 9,850  ║  ← Content (black BG)
║ 2. Fatima - 9,100 ║
╚═══════════════════╝
```

**Border Style**: 2-4 pixel thick lines, sharp corners

---

## 🌟 Special Effects

### Screen Effects

#### Scanlines (Optional Retro Effect)
- **Style**: Horizontal lines across screen
- **Opacity**: 10-20%
- **Spacing**: Every 2-4 pixels
- **Color**: Black
- **Effect**: Gives CRT monitor feel

#### Screen Shake
- **When**: Player hit, boss destroyed
- **Duration**: 0.3 seconds
- **Magnitude**: ±5 pixels random offset
- **Easing**: Exponential decay

#### Flash Effects
- **Victory**: Green full-screen flash (0.2s)
- **Defeat**: Red full-screen flash (0.2s)
- **Hit**: White flash on sprite (0.1s)

### Particle Systems

**Bullet Trail**:
- 3-5 fading particles behind each projectile
- Fade from 100% to 0% opacity over 0.2s
- Same color as projectile

**Star Field**:
- Small white pixels (1×1px or 2×2px)
- Scrolling downward slowly (1 pixel every 2 frames)
- ~50 stars total
- Random positions
- Optional: Some stars larger/brighter than others

**Reference**: The scrolling star pattern shown in "SEAMLESS PATTERN" box in uploaded image

---

## 📱 UI Layouts (Pixel Art Style)

### Main Menu

```
╔════════════════════════════════╗
║                                ║
║    [Pixel Art Logo]            ║ ← Ooredoo ship sprite
║    NETWORK DEFENDERS           ║ ← 32px pixel font
║                                ║
║  ╔════════════════════╗        ║
║  ║   ▶ PLAY NOW       ║        ║ ← Large button (60px)
║  ╚════════════════════╝        ║
║                                ║
║  ╔═══════╗  ╔═══════╗          ║
║  ║ STATS ║  ║LEADER ║          ║ ← Secondary buttons
║  ╚═══════╝  ╚═══════╝          ║
║                                ║
║  BEST TODAY: 6,250             ║ ← Small stats
║                                ║
╚════════════════════════════════╝
```

### Gameplay HUD (Minimal)

```
Score: 2,450                Timer: 35s
┌────────────────────────────────────┐
│                                    │
│        [Gameplay happens here]     │
│                                    │
│              No UI overlay         │
│                                    │
│        Just pure gameplay          │
│                                    │
└────────────────────────────────────┘
```

### Results Screen

```
╔════════════════════════════════╗
║                                ║
║      YOUR SCORE                ║ ← 24px font
║         6,250                  ║ ← 48px huge numbers
║                                ║
║      Rank: #23                 ║ ← 16px font
║                                ║
║  ┌──────────────────────────┐  ║
║  │ ✓ DAILY REWARD EARNED!   │  ║ ← Green panel
║  │   +50 RED CLUB POINTS    │  ║
║  └──────────────────────────┘  ║
║                                ║
║  ╔════════════════╗            ║
║  ║  PLAY AGAIN    ║            ║ ← Primary action
║  ╚════════════════╝            ║
║                                ║
║  [Leaderboard]  [Return]       ║ ← Secondary
║                                ║
╚════════════════════════════════╝
```

---

## 🎵 Audio Style (8-Bit Chiptune)

**Style**: Classic NES/Game Boy era sounds

### Music Characteristics:
- **Waveforms**: Square, triangle, sawtooth (chiptune synthesis)
- **Tempo**: 120-140 BPM (upbeat arcade feel)
- **Melody**: Simple, catchy, repetitive
- **Harmony**: Basic chords, arpeggios
- **Drums**: Synthesized kick/snare (no real drums)

### SFX Characteristics:
- **Shoot**: Short "pew" (0.1s), high-pitched beep
- **Explosion**: Descending noise burst (0.3s)
- **Victory**: Ascending arpeggio (1-2s)
- **Defeat**: Descending sad tune (1-2s)
- **UI Click**: Single beep (0.05s)
- **Reward**: Coin collection sound (0.2s, satisfying!)

**Reference Tools**:
- Bfxr (free online tool for game SFX)
- BeepBox (free online chiptune composer)
- FamiTracker (advanced NES music composer)

---

## 🎮 Animation Guidelines

### Frame Rates
- **Player idle**: 2 frames @ 4 FPS (0.25s per frame)
- **Enemy idle**: 2 frames @ 2 FPS (0.5s per frame)
- **Explosion**: 3 frames @ 10 FPS (0.1s per frame)
- **UI pulse**: Continuous sine wave (2s cycle)

### Movement
- **Player auto-move**: Smooth oscillation (sin wave)
- **Enemy formation**: 1 pixel per frame, sudden direction change
- **Projectiles**: Linear, no easing
- **Particles**: Exponential decay

### Principles
- **No subpixel rendering**: Always snap to whole pixels
- **No anti-aliasing**: Crisp edges only
- **Limited colors**: Stick to palette
- **Sharp transitions**: No smooth fades (or very fast)

---

## 📏 Spacing & Layout

### Grid System
- **Base unit**: 8 pixels
- **All margins**: Multiples of 8 (8px, 16px, 24px, 32px)
- **Button height**: 48px or 64px
- **Icon size**: 16×16, 24×24, or 32×32
- **Padding**: 8px minimum, 16px standard

### Safe Areas (Mobile)
- **Top safe area**: 44px (iOS notch)
- **Bottom safe area**: 34px (iOS home indicator)
- **Side margins**: 16px minimum
- **Touch targets**: 44×44px minimum (Apple HIG)

---

## ✅ Asset Checklist for Designer

Send this to your pixel artist:

### Sprites Needed
- [ ] Player ship (32×32, red, 2 frames)
- [ ] Purple alien (24×24, 2 frames)
- [ ] Yellow alien (24×24, 2 frames)
- [ ] Blue alien (24×24, 2 frames)
- [ ] Green alien (24×24, 2 frames)
- [ ] Player projectile (2×8, red)
- [ ] Enemy projectile (2×6, orange)
- [ ] Explosion animation (3 frames, 24×24)
- [ ] Star particles (1×1, 2×2 white)

### UI Elements
- [ ] Button frame (various sizes)
- [ ] Panel border (corner pieces)
- [ ] Pixel font (alphabet + numbers)
- [ ] Icons: play, pause, settings, trophy, stats (16×16 each)
- [ ] Divider lines (1px thick)
- [ ] Checkmark icon (16×16, green)
- [ ] X icon (16×16, red)

### Backgrounds
- [ ] Space background (360×640, black with stars)
- [ ] Star field pattern (tileable, 128×128)

### Delivery Format
- PNG with transparency
- 2x scale (@2x suffix for retina)
- Organized in folders by category
- Sprite sheet (optional, for performance)

---

## 🔍 Quality Checklist

Before accepting assets, verify:

**Visual Quality**:
- [ ] No blurry edges (anti-aliasing disabled)
- [ ] Consistent pixel size (no mixed resolutions)
- [ ] Colors match exact hex values
- [ ] Transparent backgrounds where needed
- [ ] Consistent style across all sprites

**Technical Quality**:
- [ ] Correct dimensions (32×32, 24×24, etc.)
- [ ] PNG format with alpha channel
- [ ] File size optimized (<50KB per sprite)
- [ ] @2x versions provided for retina

**Animation Quality**:
- [ ] 2 frames minimum per animated sprite
- [ ] Smooth motion between frames
- [ ] Consistent animation speed

---

## 📖 Reference Examples

### Games with Similar Style:
1. **Space Invaders** (1978) - Original arcade
2. **Galaga** (1981) - Enemy formation inspiration
3. **Phoenix** (1980) - Explosion effects
4. **Celeste** (2018) - Modern pixel art (color palette)
5. **Downwell** (2015) - Minimalist arcade (UI design)

### Modern Pixel Art Games:
- **Shovel Knight** (2014) - High-quality 8-bit style
- **Dead Cells** (2018) - Fluid animations
- **Undertale** (2015) - Expressive characters
- **Stardew Valley** (2016) - Charming aesthetics

---

## 🎨 Final Notes for Designer

**Do**:
✅ Use sharp, crisp pixels (no blur)
✅ Limit color palette (stick to provided hex codes)
✅ Keep designs simple and readable
✅ Ensure sprites work at small sizes
✅ Make animations smooth but chunky
✅ Reference uploaded image for style direction

**Don't**:
❌ Use gradients or smooth shading
❌ Add anti-aliasing or soft edges
❌ Make sprites too detailed (keep it simple)
❌ Use colors outside the palette
❌ Create overly complex animations
❌ Ignore the 8-bit aesthetic

---

**Brief Summary for Quick Reference**:
"We want classic arcade Space Invaders pixel art style, matching the uploaded 'PIXEL GAME ELEMENTS SET 4' image. Think NES/Game Boy era: chunky pixels, bright colors, simple shapes, no gradients. Player ship in Ooredoo red, 4 colorful alien types, retro explosions, arcade pixel font for UI."

---

**Document Owner**: Art Director  
**Style Reference**: PIXEL GAME ELEMENTS SET 4 (uploaded image)  
**Target**: NES/Game Boy aesthetic with modern clarity  
**Last Updated**: November 2025
