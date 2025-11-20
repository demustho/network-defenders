# 🎮 COMPLETE ENEMY TYPES GUIDE - Ooredoo Network Defenders

**For Google IDX/Antigravity Agent Implementation**

---

## 📋 TABLE OF CONTENTS

1. [Standard Enemies (4 Types)](#standard-enemies)
2. [Special Enemies (2 Types - Optional)](#special-enemies)
3. [Enemy Comparison Table](#enemy-comparison-table)
4. [Visual Specifications](#visual-specifications)
5. [Destruction Effects](#destruction-effects)
6. [Behavior Patterns](#behavior-patterns)
7. [Sound Effects](#sound-effects)
8. [Difficulty Scaling](#difficulty-scaling)
9. [Implementation Code Examples](#implementation-code-examples)
10. [Asset Checklist](#asset-checklist)

---

## 🛸 STANDARD ENEMIES (4 Types - Formation Rows)

### 1. **LAGMITES** (Row 1 - Top Row)

**Network Threat**: Slow Internet / Lag

#### Visual Design
- **Size**: 24×24 pixels
- **Color**: Purple/Magenta (#B026FF)
- **Shape**: Squid-like alien with antenna
- **Details**: 
  - Multiple tentacles/arms
  - Antenna on top
  - Grumpy expression
  - Loading circle icon rotating on body
- **Animation**: 2 frames - tentacles wave slowly

#### ASCII Representation
```
Frame 1:
  ████        ← Antenna
 ██▓▓██       ← Head with loading circle
██▓▓▓▓██      
██◯▓▓◯██      ← Eyes
██▓▓▓▓██      
 ██████       
█ ████ █      ← Tentacles
 █    █       

Frame 2:
  ████        
 ██▓▓██       
██▓▓▓▓██      
██◯▓▓◯██      
██▓▓▓▓██      
 ██████       
 █████ █      ← Tentacles wave
█      █      
```

#### Gameplay Properties
```javascript
const LAGMITE = {
  name: "Lagmite",
  row: 1,
  size: {width: 24, height: 24},
  color: "#B026FF",
  points: 40,
  health: 1,
  speed: 1.0, // Base speed multiplier
  shootRate: 3000, // Milliseconds between shots
  shootProbability: 0.1, // 10% chance per interval
  projectileColor: "#B026FF",
  projectileSpeed: 4, // Pixels per frame
  animationFrames: 2,
  animationSpeed: 250 // ms per frame
};
```

---

### 2. **SPAMEROIDS** (Row 2 - Second Row)

**Network Threat**: Spam Messages / Unwanted Ads

#### Visual Design
- **Size**: 24×24 pixels
- **Color**: Yellow/Gold (#FFD700)
- **Shape**: Star-burst or meteor-like
- **Details**:
  - Jagged edges (like explosion)
  - Small text overlays: "CLICK!", "99% OFF!"
  - Chaotic, messy appearance
  - Random bits of "data" flying off
- **Animation**: 2 frames - rotates or pulses

#### ASCII Representation
```
Frame 1:
    ██        ← Star-burst shape
  ██▓▓██      
 █▓SALE▓█     ← Spam text
██▓▓▓▓▓▓██    
 ▓▓▓▓▓▓▓▓     
  ██▓▓██      
    ██        

Frame 2: (Rotated 45 degrees)
  █    █
   ████
  ██▓▓██
 ▓▓▓▓▓▓▓
  ██▓▓██
   ████
  █    █
```

#### Gameplay Properties
```javascript
const SPAMEROID = {
  name: "Spameroid",
  row: 2,
  size: {width: 24, height: 24},
  color: "#FFD700",
  points: 30,
  health: 1,
  speed: 1.0,
  shootRate: 2500,
  shootProbability: 0.12,
  projectileColor: "#FFA500",
  projectileSpeed: 4,
  animationFrames: 2,
  animationSpeed: 200,
  specialMovement: "wobble", // ±2 pixels random horizontal
  wobbleAmount: 2
};
```

---

### 3. **BUFFER BEASTS** (Row 3 - Third Row)

**Network Threat**: Buffering / Loading Issues

#### Visual Design
- **Size**: 24×24 pixels
- **Color**: Cyan/Blue (#00F0FF)
- **Shape**: Hexagonal robot-like
- **Details**:
  - Geometric hexagon body
  - Spinning loading circle in center
  - Digital "scan lines" effect
  - Mechanical appearance
- **Animation**: 2 frames - loading circle rotates, occasionally "freezes"

#### ASCII Representation
```
Frame 1:
  ██████      ← Hexagon top
 ██▓▓▓▓██     
██▓◯▓▓◯▓██    ← Loading circle
██▓▓▓▓▓▓██    
 ██▓▓▓▓██     
  ██████      

Frame 2: (Loading circle rotated 90°)
  ██████      
 ██▓▓▓▓██     
██▓◯▓▓◯▓██    
██▓▓▓▓▓▓██    
 ██▓▓▓▓██     
  ██████      
```

#### Gameplay Properties
```javascript
const BUFFER_BEAST = {
  name: "Buffer Beast",
  row: 3,
  size: {width: 24, height: 24},
  color: "#00F0FF",
  points: 20,
  health: 1,
  speed: 1.0,
  shootRate: 2000,
  shootProbability: 0.15,
  projectileColor: "#00F0FF",
  projectileSpeed: 4,
  animationFrames: 2,
  animationSpeed: 300,
  specialBehavior: "pause",
  pauseInterval: 5000, // Pause every 5 seconds
  pauseDuration: 500   // Freeze for 0.5 seconds
};
```

---

### 4. **DROPCALL DRONES** (Row 4 - Bottom Row)

**Network Threat**: Dropped Calls / Connection Loss

#### Visual Design
- **Size**: 24×24 pixels
- **Color**: Bright Green (#39FF14)
- **Shape**: Simple classic invader style
- **Details**:
  - Phone/receiver icon shape
  - Large "X" or "disconnected" symbol
  - Signal bars with red X
  - Simplest, most basic design
- **Animation**: 2 frames - classic "walking" animation

#### ASCII Representation
```
Frame 1:
  ██████      ← Simple invader
 ██◯██◯██     ← Eyes
 ████████     
  ██  ██      ← Legs
 ██    ██     

Frame 2: (Legs alternate)
  ██████      
 ██◯██◯██     
 ████████     
 ██    ██     ← Legs switch
  ██  ██      
```

#### Gameplay Properties
```javascript
const DROPCALL_DRONE = {
  name: "DropCall Drone",
  row: 4,
  size: {width: 24, height: 24},
  color: "#39FF14",
  points: 10,
  health: 1,
  speed: 1.0,
  shootRate: 1000, // Most aggressive!
  shootProbability: 0.3, // 3x more likely to shoot
  projectileColor: "#39FF14",
  projectileSpeed: 5, // Slightly faster projectiles
  animationFrames: 2,
  animationSpeed: 150,
  specialTrait: "aggressive_shooter"
};
```

---

## 🌟 SPECIAL ENEMIES (Optional - Future Enhancement)

### 5. **ROAMING ROGUES** (Bonus Enemy)

**Network Threat**: Roaming Charges / Unexpected Fees

#### Visual Design
- **Size**: 32×32 pixels (larger than standard)
- **Color**: Silver/Gray (#C0C0C0)
- **Shape**: Satellite/UFO with rotating dish
- **Details**:
  - Metallic appearance
  - Antenna/satellite dish rotating
  - Country flag icons
  - Shiny, chrome-like finish
- **Animation**: 3 frames - dish rotates, flies smoothly

#### Gameplay Properties
```javascript
const ROAMING_ROGUE = {
  name: "Roaming Rogue",
  type: "bonus",
  size: {width: 32, height: 32},
  color: "#C0C0C0",
  points: 50,
  health: 1,
  spawnInterval: 20000, // Every 20 seconds
  spawnProbability: 0.5, // 50% chance when interval triggers
  speed: 200, // Pixels per second (horizontal)
  path: "horizontal", // Left-to-right or right-to-left
  yPosition: 50, // Flies across top of screen
  shootRate: null, // Doesn't shoot
  animationFrames: 3,
  animationSpeed: 100,
  bonusReward: 25 // Extra points on hit
};
```

---

### 6. **THE MEGA GLITCH** (Boss Enemy)

**Network Threat**: System Crash / Total Network Failure

#### Visual Design
- **Size**: 64×64 pixels (2x normal enemies)
- **Color**: Multi-colored, constantly shifting
- **Shape**: Corrupted amalgamation of all enemy types
- **Details**:
  - Combines features of all 4 standard enemies
  - Glitching visual effect (color cycling)
  - Data corruption particles
  - Screen distortion effect
  - "ERROR" text glitching on body
- **Animation**: 4 frames - constantly glitching, morphing

#### Gameplay Properties
```javascript
const MEGA_GLITCH = {
  name: "Mega Glitch",
  type: "boss",
  size: {width: 64, height: 64},
  colors: ["#B026FF", "#FFD700", "#00F0FF", "#39FF14", "#FF0000"],
  colorCycleSpeed: 100, // ms per color change
  points: 100,
  health: 10,
  maxHealth: 10,
  spawnCondition: "every_10th_game",
  speed: 50, // Pixels per second (slow)
  movementPattern: "sine_wave",
  amplitude: 50,
  
  // Multi-phase behavior
  phases: {
    phase1: { // HP 10-7
      healthRange: [7, 10],
      projectileCount: 3,
      projectilePattern: "straight",
      shootRate: 2000
    },
    phase2: { // HP 7-4
      healthRange: [4, 7],
      projectileCount: 5,
      projectilePattern: "spread",
      shootRate: 1500,
      speedMultiplier: 1.5
    },
    phase3: { // HP 4-1
      healthRange: [1, 4],
      projectileCount: 8,
      projectilePattern: "rapid_fire",
      shootRate: 500,
      speedMultiplier: 2.0,
      summonMinions: true,
      minionType: "DROPCALL_DRONE",
      minionCount: 6
    }
  },
  
  animationFrames: 4,
  animationSpeed: 150,
  
  rewards: {
    points: 100,
    redClubBonus: 100
  },
  
  effects: {
    screenShake: true,
    screenDistortion: true,
    glitchEffect: true
  }
};
```

---

## 📊 ENEMY COMPARISON TABLE

| Enemy Type | Row | Size | Color | Points | Speed | Shoot Rate | Health | Special |
|------------|-----|------|-------|--------|-------|------------|--------|---------|
| **Lagmites** | 1 | 24×24 | Purple (#B026FF) | 40 | 1.0x | 3.0s | 1 | Loading icon |
| **Spameroids** | 2 | 24×24 | Yellow (#FFD700) | 30 | 1.0x | 2.5s | 1 | Erratic wobble |
| **Buffer Beasts** | 3 | 24×24 | Cyan (#00F0FF) | 20 | 1.0x | 2.0s | 1 | Random pauses |
| **DropCall Drones** | 4 | 24×24 | Green (#39FF14) | 10 | 1.0x | 1.0s | 1 | 3x shoot rate |
| **Roaming Rogues** | - | 32×32 | Silver (#C0C0C0) | 50 | Fast | Never | 1 | Horizontal flight |
| **Mega Glitch** | Boss | 64×64 | Multi | 100 | Slow | Varies | 10 | Multi-phase |

---

## 🎨 VISUAL SPECIFICATIONS

### Color Palette
```css
/* Primary Enemy Colors */
--lagmite-purple: #B026FF;
--spameroid-yellow: #FFD700;
--buffer-cyan: #00F0FF;
--dropcall-green: #39FF14;
--roaming-silver: #C0C0C0;

/* Projectile Colors */
--lagmite-projectile: #B026FF;
--spameroid-projectile: #FFA500;
--buffer-projectile: #00F0FF;
--dropcall-projectile: #39FF14;

/* Effects */
--glitch-red: #FF0000;
--glitch-magenta: #FF00FF;
--background-black: #000000;
--highlight-white: #FFFFFF;
```

### Sprite Sheet Layout
```
Enemy Sprite Sheet (192×192 pixels total)
┌────────────────────────────────────┐
│ [Lagmite 1][Lagmite 2]             │ Row 1: 24×24 each
│ [Spameroid 1][Spameroid 2]         │ Row 2: 24×24 each
│ [Buffer 1][Buffer 2]               │ Row 3: 24×24 each
│ [DropCall 1][DropCall 2]           │ Row 4: 24×24 each
│ [Roaming 1][Roaming 2][Roaming 3]  │ Row 5: 32×32 each
│ [Glitch 1][Glitch 2][Glitch 3][4]  │ Row 6: 64×64 boss
└────────────────────────────────────┘
```

---

## 💥 DESTRUCTION EFFECTS

### Explosion Specifications

```javascript
const EXPLOSION_EFFECTS = {
  lagmite: {
    color: "#B026FF",
    particleCount: 12,
    particleSize: 4,
    particleSpeed: 80,
    duration: 300,
    pattern: "burst_with_loading_shards"
  },
  
  spameroid: {
    color: "#FFD700",
    particleCount: 15,
    particleSize: 3,
    particleSpeed: 100,
    duration: 300,
    pattern: "chaotic_with_text_bits",
    textFragments: ["SPAM", "CLICK", "$$"]
  },
  
  buffer_beast: {
    color: "#00F0FF",
    particleCount: 10,
    particleSize: 5,
    particleSpeed: 60,
    duration: 400,
    pattern: "hexagon_fragments",
    specialEffect: "brief_freeze_0.1s"
  },
  
  dropcall_drone: {
    color: "#39FF14",
    particleCount: 8,
    particleSize: 3,
    particleSpeed: 90,
    duration: 200,
    pattern: "simple_burst"
  },
  
  roaming_rogue: {
    color: "#C0C0C0",
    particleCount: 20,
    particleSize: 6,
    particleSpeed: 120,
    duration: 500,
    pattern: "large_sparkle_burst",
    bonusPopup: true
  },
  
  mega_glitch: {
    colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"],
    particleCount: 50,
    particleSize: 8,
    particleSpeed: 150,
    duration: 2000,
    pattern: "screen_wide_corruption",
    screenShake: 10,
    victoryAnimation: true
  }
};
```

### Explosion Animation Code
```javascript
class Explosion {
  constructor(x, y, enemyType) {
    this.x = x;
    this.y = y;
    this.config = EXPLOSION_EFFECTS[enemyType];
    this.particles = [];
    this.age = 0;
    this.maxAge = this.config.duration;
    
    // Create particles
    for (let i = 0; i < this.config.particleCount; i++) {
      const angle = (Math.PI * 2 / this.config.particleCount) * i;
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * this.config.particleSpeed,
        vy: Math.sin(angle) * this.config.particleSpeed,
        size: this.config.particleSize,
        alpha: 1.0
      });
    }
  }
  
  update(deltaTime) {
    this.age += deltaTime;
    
    this.particles.forEach(particle => {
      particle.x += particle.vx * deltaTime / 1000;
      particle.y += particle.vy * deltaTime / 1000;
      particle.alpha = 1 - (this.age / this.maxAge);
    });
    
    return this.age < this.maxAge; // Return false when done
  }
  
  render(ctx) {
    ctx.save();
    this.particles.forEach(particle => {
      ctx.globalAlpha = particle.alpha;
      ctx.fillStyle = this.config.color;
      ctx.fillRect(
        particle.x - particle.size / 2,
        particle.y - particle.size / 2,
        particle.size,
        particle.size
      );
    });
    ctx.restore();
  }
}
```

---

## 🎯 BEHAVIOR PATTERNS

### Formation Movement

```javascript
class EnemyFormation {
  constructor() {
    this.enemies = [];
    this.direction = 1; // 1 = right, -1 = left
    this.baseSpeed = 1; // Pixels per frame
    this.descending = false;
    this.descentAmount = 10; // Pixels per descent
    
    // Create 4 rows × 9 columns
    const enemyTypes = [LAGMITE, SPAMEROID, BUFFER_BEAST, DROPCALL_DRONE];
    
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 9; col++) {
        const enemy = new Enemy(
          enemyTypes[row],
          col * 32 + 50, // X position
          row * 32 + 50  // Y position
        );
        this.enemies.push(enemy);
      }
    }
  }
  
  update(deltaTime) {
    // Calculate current speed based on remaining enemies
    const aliveCount = this.enemies.filter(e => e.alive).length;
    const speedMultiplier = 1 + (36 - aliveCount) * 0.05; // 5% faster per destroyed enemy
    const currentSpeed = this.baseSpeed * speedMultiplier;
    
    // Check if any enemy hit screen edge
    let hitEdge = false;
    this.enemies.forEach(enemy => {
      if (!enemy.alive) return;
      
      if (this.direction > 0 && enemy.x > 340) hitEdge = true;
      if (this.direction < 0 && enemy.x < 20) hitEdge = true;
    });
    
    // If hit edge, descend and reverse
    if (hitEdge && !this.descending) {
      this.descending = true;
      this.direction *= -1;
    }
    
    // Update all enemies
    this.enemies.forEach(enemy => {
      if (!enemy.alive) return;
      
      if (this.descending) {
        enemy.y += this.descentAmount;
      } else {
        enemy.x += currentSpeed * this.direction;
      }
      
      // Apply special movement
      if (enemy.type.specialMovement === "wobble") {
        enemy.x += (Math.random() - 0.5) * enemy.type.wobbleAmount;
      }
      
      // Handle pause behavior
      if (enemy.type.specialBehavior === "pause") {
        if (!enemy.pauseTimer) enemy.pauseTimer = 0;
        enemy.pauseTimer += deltaTime;
        
        if (enemy.pauseTimer >= enemy.type.pauseInterval) {
          enemy.paused = true;
          setTimeout(() => {
            enemy.paused = false;
            enemy.pauseTimer = 0;
          }, enemy.type.pauseDuration);
        }
      }
      
      enemy.update(deltaTime);
    });
    
    // Reset descending flag after one frame
    if (this.descending) {
      this.descending = false;
    }
  }
  
  // Enemy shooting logic
  shootRandomEnemy() {
    const aliveEnemies = this.enemies.filter(e => e.alive);
    if (aliveEnemies.length === 0) return null;
    
    // Bottom row enemies (DropCall Drones) are 3x more likely to shoot
    const bottomRow = aliveEnemies.filter(e => e.type.row === 4);
    const otherRows = aliveEnemies.filter(e => e.type.row !== 4);
    
    // Weight: 30% chance for bottom row, 70% for others
    let shooter;
    if (Math.random() < 0.3 && bottomRow.length > 0) {
      shooter = bottomRow[Math.floor(Math.random() * bottomRow.length)];
    } else if (otherRows.length > 0) {
      shooter = otherRows[Math.floor(Math.random() * otherRows.length)];
    } else {
      shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    }
    
    return shooter.shoot();
  }
}
```

### Individual Enemy Behavior

```javascript
class Enemy {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.alive = true;
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.shootTimer = 0;
    this.paused = false;
    this.pauseTimer = 0;
  }
  
  update(deltaTime) {
    if (!this.alive || this.paused) return;
    
    // Update animation
    this.animationTimer += deltaTime;
    if (this.animationTimer >= this.type.animationSpeed) {
      this.animationFrame = (this.animationFrame + 1) % this.type.animationFrames;
      this.animationTimer = 0;
    }
    
    // Update shoot timer
    this.shootTimer += deltaTime;
  }
  
  shoot() {
    if (this.shootTimer < this.type.shootRate) return null;
    if (Math.random() > this.type.shootProbability) return null;
    
    this.shootTimer = 0;
    
    return {
      x: this.x + this.type.size.width / 2,
      y: this.y + this.type.size.height,
      vx: 0,
      vy: this.type.projectileSpeed,
      color: this.type.projectileColor,
      owner: "enemy"
    };
  }
  
  hit() {
    this.alive = false;
    return this.type.points;
  }
  
  render(ctx, spriteSheet) {
    if (!this.alive) return;
    
    // If sprites loaded, render sprite
    if (spriteSheet) {
      const spriteX = this.animationFrame * this.type.size.width;
      const spriteY = this.type.row * this.type.size.height;
      
      ctx.drawImage(
        spriteSheet,
        spriteX, spriteY,
        this.type.size.width, this.type.size.height,
        this.x, this.y,
        this.type.size.width, this.type.size.height
      );
    } else {
      // Fallback: render colored rectangle
      ctx.fillStyle = this.type.color;
      ctx.fillRect(this.x, this.y, this.type.size.width, this.type.size.height);
      
      // Draw eyes (simple representation)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(this.x + 6, this.y + 8, 4, 4);
      ctx.fillRect(this.x + 14, this.y + 8, 4, 4);
    }
  }
}
```

---

## 🔊 SOUND EFFECTS

### Sound File Specifications

```javascript
const ENEMY_SOUNDS = {
  // Formation movement (global)
  formation_pulse: {
    file: "sounds/formation_pulse.mp3",
    volume: 0.3,
    loop: true,
    pitchShift: function(enemyCount) {
      // Higher pitch as enemies decrease
      return 1.0 + (36 - enemyCount) * 0.02;
    }
  },
  
  // Enemy shooting sounds
  lagmite_shoot: {
    file: "sounds/lagmite_shoot.mp3",
    volume: 0.4,
    duration: 0.3,
    description: "Slow whoosh, descending pitch"
  },
  
  spameroid_shoot: {
    file: "sounds/spameroid_shoot.mp3",
    volume: 0.4,
    duration: 0.2,
    description: "Chaotic static burst"
  },
  
  buffer_shoot: {
    file: "sounds/buffer_shoot.mp3",
    volume: 0.4,
    duration: 0.4,
    description: "Digital beep beep with pause"
  },
  
  dropcall_shoot: {
    file: "sounds/dropcall_shoot.mp3",
    volume: 0.5,
    duration: 0.2,
    description: "Phone disconnect tone"
  },
  
  // Explosion sounds
  enemy_explode: {
    files: [
      "sounds/explode_1.mp3",
      "sounds/explode_2.mp3",
      "sounds/explode_3.mp3",
      "sounds/explode_4.mp3"
    ],
    volume: 0.5,
    duration: 0.2,
    description: "8-bit explosion, 4 pitch variations"
  },
  
  // Special enemies
  roaming_flyby: {
    file: "sounds/roaming_flyby.mp3",
    volume: 0.6,
    duration: 2.0,
    description: "Doppler effect neeeowww"
  },
  
  roaming_explode: {
    file: "sounds/roaming_explode.mp3",
    volume: 0.7,
    duration: 0.5,
    description: "Bigger explosion + bonus chime"
  },
  
  boss_appear: {
    file: "sounds/boss_appear.mp3",
    volume: 0.8,
    duration: 3.0,
    description: "Dramatic entrance with bass rumble"
  },
  
  boss_shoot: {
    file: "sounds/boss_shoot.mp3",
    volume: 0.7,
    duration: 0.5,
    description: "Distorted bass with glitch"
  },
  
  boss_explode: {
    file: "sounds/boss_explode.mp3",
    volume: 1.0,
    duration: 2.0,
    description: "Epic explosion with glitch cascade"
  }
};
```

### Audio Implementation

```javascript
class AudioManager {
  constructor() {
    this.sounds = {};
    this.musicVolume = 0.7;
    this.sfxVolume = 1.0;
  }
  
  loadSound(name, config) {
    const audio = new Audio(config.file);
    audio.volume = config.volume * this.sfxVolume;
    audio.loop = config.loop || false;
    this.sounds[name] = {audio, config};
  }
  
  play(name, variation = 0) {
    const sound = this.sounds[name];
    if (!sound) return;
    
    // If multiple files (variations), pick one
    if (sound.config.files) {
      const fileIndex = variation % sound.config.files.length;
      const audio = new Audio(sound.config.files[fileIndex]);
      audio.volume = sound.config.volume * this.sfxVolume;
      audio.play();
    } else {
      // Clone audio for overlapping sounds
      const audio = sound.audio.cloneNode();
      audio.volume = sound.config.volume * this.sfxVolume;
      audio.play();
    }
  }
  
  updateFormationPulse(enemyCount) {
    const sound = this.sounds.formation_pulse;
    if (sound && sound.config.pitchShift) {
      sound.audio.playbackRate = sound.config.pitchShift(enemyCount);
    }
  }
}
```

---

## 📈 DIFFICULTY SCALING

### Progressive Difficulty

```javascript
class DifficultyScaling {
  constructor() {
    this.baseSpeed = 1.0;
    this.baseShootRate = 1.0;
  }
  
  // Speed increases as enemies are destroyed
  calculateSpeed(enemiesRemaining, totalEnemies = 36) {
    const percentDestroyed = (totalEnemies - enemiesRemaining) / totalEnemies;
    return this.baseSpeed * (1 + percentDestroyed * 1.0); // Up to 2x speed
  }
  
  // Shoot rate increases in phases
  calculateShootRate(enemiesRemaining, totalEnemies = 36) {
    if (enemiesRemaining > 27) return 60; // 1 shot per second
    if (enemiesRemaining > 18) return 50; // 1.2 shots per second
    if (enemiesRemaining > 9) return 40;  // 1.5 shots per second
    return 30; // 2 shots per second (danger!)
  }
  
  // Adjust for daily threshold achievement
  balanceDifficulty(playerSuccessRate) {
    // playerSuccessRate = % of players reaching 5000+ points
    
    if (playerSuccessRate > 0.6) {
      // Too easy: increase difficulty
      this.baseSpeed *= 1.1;
      this.baseShootRate *= 0.9; // Faster shooting
      console.log("Difficulty increased");
    } else if (playerSuccessRate < 0.3) {
      // Too hard: decrease difficulty
      this.baseSpeed *= 0.9;
      this.baseShootRate *= 1.1; // Slower shooting
      console.log("Difficulty decreased");
    }
    
    // Target: 40% success rate
  }
}
```

---

## 💻 IMPLEMENTATION CODE EXAMPLES

### Complete Enemy Class

```javascript
// File: enemy.js
class Enemy {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.alive = true;
    this.health = type.health;
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.shootTimer = 0;
    this.paused = false;
    this.pauseTimer = 0;
    this.sprite = null;
  }
  
  static preloadSprites(callback) {
    const spriteSheet = new Image();
    spriteSheet.onload = () => callback(spriteSheet);
    spriteSheet.src = "assets/sprites/enemies.png";
  }
  
  update(deltaTime) {
    if (!this.alive || this.paused) return;
    
    // Animation
    this.animationTimer += deltaTime;
    if (this.animationTimer >= this.type.animationSpeed) {
      this.animationFrame = (this.animationFrame + 1) % this.type.animationFrames;
      this.animationTimer = 0;
    }
    
    // Shoot timer
    this.shootTimer += deltaTime;
    
    // Special behaviors
    if (this.type.specialBehavior === "pause") {
      this.pauseTimer += deltaTime;
      if (this.pauseTimer >= this.type.pauseInterval) {
        this.paused = true;
        setTimeout(() => {
          this.paused = false;
          this.pauseTimer = 0;
        }, this.type.pauseDuration);
      }
    }
  }
  
  shoot() {
    if (this.shootTimer < this.type.shootRate) return null;
    if (Math.random() > this.type.shootProbability) return null;
    
    this.shootTimer = 0;
    
    return {
      x: this.x + this.type.size.width / 2,
      y: this.y + this.type.size.height,
      vx: 0,
      vy: this.type.projectileSpeed,
      color: this.type.projectileColor,
      size: {width: 2, height: 6},
      owner: "enemy"
    };
  }
  
  hit(damage = 1) {
    this.health -= damage;
    if (this.health <= 0) {
      this.alive = false;
      return {
        points: this.type.points,
        explosion: this.type.name.toLowerCase()
      };
    }
    return null;
  }
  
  checkCollision(projectile) {
    if (!this.alive) return false;
    
    return (
      projectile.x >= this.x &&
      projectile.x <= this.x + this.type.size.width &&
      projectile.y >= this.y &&
      projectile.y <= this.y + this.type.size.height
    );
  }
  
  isOffScreen(screenHeight) {
    return this.y + this.type.size.height > screenHeight;
  }
  
  render(ctx, spriteSheet) {
    if (!this.alive) return;
    
    if (spriteSheet) {
      // Calculate sprite position in sheet
      const spriteX = this.animationFrame * this.type.size.width;
      const spriteY = (this.type.row - 1) * this.type.size.height;
      
      // Disable smoothing for pixel-perfect rendering
      ctx.imageSmoothingEnabled = false;
      
      ctx.drawImage(
        spriteSheet,
        spriteX, spriteY,
        this.type.size.width, this.type.size.height,
        Math.floor(this.x), Math.floor(this.y),
        this.type.size.width, this.type.size.height
      );
    } else {
      // Fallback rendering
      ctx.fillStyle = this.type.color;
      ctx.fillRect(
        Math.floor(this.x),
        Math.floor(this.y),
        this.type.size.width,
        this.type.size.height
      );
      
      // Simple eyes
      ctx.fillStyle = "#FFFFFF";
      const eyeSize = 4;
      const eyeY = this.y + 8;
      ctx.fillRect(this.x + 6, eyeY, eyeSize, eyeSize);
      ctx.fillRect(this.x + 14, eyeY, eyeSize, eyeSize);
    }
    
    // Debug hitbox (optional)
    if (window.DEBUG_MODE) {
      ctx.strokeStyle = "#FF0000";
      ctx.strokeRect(this.x, this.y, this.type.size.width, this.type.size.height);
    }
  }
}
```

### Game Integration Example

```javascript
// File: game.js
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.formation = new EnemyFormation();
    this.projectiles = [];
    this.explosions = [];
    this.score = 0;
    this.spriteSheet = null;
    
    // Preload sprites
    Enemy.preloadSprites((sheet) => {
      this.spriteSheet = sheet;
      this.start();
    });
  }
  
  update(deltaTime) {
    // Update enemies
    this.formation.update(deltaTime);
    
    // Enemy shooting
    if (Math.random() < 0.016) { // ~1 shot per second at 60fps
      const projectile = this.formation.shootRandomEnemy();
      if (projectile) {
        this.projectiles.push(projectile);
        audioManager.play(projectile.soundEffect);
      }
    }
    
    // Update projectiles
    this.projectiles.forEach(proj => {
      proj.y += proj.vy;
      
      // Check collision with player (if enemy projectile)
      if (proj.owner === "enemy") {
        if (this.checkPlayerCollision(proj)) {
          this.playerHit();
        }
      }
      // Check collision with enemies (if player projectile)
      else {
        this.formation.enemies.forEach(enemy => {
          if (enemy.checkCollision(proj)) {
            const result = enemy.hit();
            if (result) {
              this.score += result.points;
              this.explosions.push(
                new Explosion(enemy.x, enemy.y, result.explosion)
              );
              audioManager.play("enemy_explode", Math.floor(Math.random() * 4));
            }
            proj.dead = true;
          }
        });
      }
    });
    
    // Remove dead projectiles
    this.projectiles = this.projectiles.filter(p => !p.dead && p.y > -10 && p.y < 650);
    
    // Update explosions
    this.explosions = this.explosions.filter(exp => exp.update(deltaTime));
    
    // Check win condition
    const aliveEnemies = this.formation.enemies.filter(e => e.alive).length;
    if (aliveEnemies === 0) {
      this.victory();
    }
    
    // Check lose condition (any enemy off screen)
    this.formation.enemies.forEach(enemy => {
      if (enemy.isOffScreen(this.canvas.height)) {
        this.gameOver();
      }
    });
  }
  
  render() {
    // Clear screen
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render enemies
    this.formation.enemies.forEach(enemy => {
      enemy.render(this.ctx, this.spriteSheet);
    });
    
    // Render projectiles
    this.projectiles.forEach(proj => {
      this.ctx.fillStyle = proj.color;
      this.ctx.fillRect(proj.x - 1, proj.y, proj.size.width, proj.size.height);
    });
    
    // Render explosions
    this.explosions.forEach(exp => {
      exp.render(this.ctx);
    });
    
    // Render score
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "16px 'Press Start 2P'";
    this.ctx.fillText(`SCORE: ${this.score}`, 10, 30);
  }
}
```

---

## ✅ ASSET CHECKLIST

### For Pixel Artist

**Standard Enemies (REQUIRED for MVP)**:
- [ ] Lagmites sprite sheet (24×24 pixels, 2 frames, purple #B026FF)
- [ ] Spameroids sprite sheet (24×24 pixels, 2 frames, yellow #FFD700)
- [ ] Buffer Beasts sprite sheet (24×24 pixels, 2 frames, cyan #00F0FF)
- [ ] DropCall Drones sprite sheet (24×24 pixels, 2 frames, green #39FF14)

**Projectiles (REQUIRED)**:
- [ ] Enemy projectile sprite (2×6 pixels, orange #FFA500)

**Explosions (REQUIRED)**:
- [ ] Purple explosion (3 frames, 24×24 pixels)
- [ ] Yellow explosion (3 frames, 24×24 pixels)
- [ ] Cyan explosion (3 frames, 24×24 pixels)
- [ ] Green explosion (3 frames, 24×24 pixels)

**Special Enemies (OPTIONAL - Future Updates)**:
- [ ] Roaming Rogues sprite sheet (32×32 pixels, 3 frames, silver #C0C0C0)
- [ ] Mega Glitch boss sprite sheet (64×64 pixels, 4 frames, multi-color)
- [ ] Boss health bar UI element

### For Sound Designer

**Enemy Sounds (REQUIRED)**:
- [ ] Formation pulse sound (loopable, pitch-shiftable)
- [ ] Lagmite shoot sound (0.3s, whoosh descending)
- [ ] Spameroid shoot sound (0.2s, static burst)
- [ ] Buffer Beast shoot sound (0.4s, digital beeps)
- [ ] DropCall Drone shoot sound (0.2s, phone tone)
- [ ] Enemy explosion sounds (4 variations, 0.2s each)

**Special Enemy Sounds (OPTIONAL)**:
- [ ] Roaming Rogue flyby sound (2.0s, Doppler effect)
- [ ] Roaming Rogue explosion (0.5s, big boom + chime)
- [ ] Boss appear sound (3.0s, dramatic entrance)
- [ ] Boss shoot sound (0.5s, distorted bass)
- [ ] Boss explosion sound (2.0s, epic destruction)

---

## 🚀 IMPLEMENTATION PRIORITY

### Phase 1: MVP (Week 2-3)
1. ✅ Implement 4 standard enemy types
2. ✅ Formation movement and descent
3. ✅ Enemy shooting mechanics
4. ✅ Collision detection
5. ✅ Basic explosions (colored particles)
6. ✅ Sound effects (formation pulse, shooting, explosions)

### Phase 2: Polish (Week 4)
1. ✅ Load and render pixel art sprites
2. ✅ Smooth animations
3. ✅ Enhanced explosion effects
4. ✅ Balance difficulty (adjust speed/shoot rate)

### Phase 3: Future Updates (Post-Launch)
1. ⬜ Add Roaming Rogues (bonus enemy)
2. ⬜ Add Mega Glitch (boss enemy)
3. ⬜ New enemy types based on player feedback
4. ⬜ Enhanced visual effects

---

## 📞 SUPPORT & QUESTIONS

For implementation questions or clarifications:
- Refer to `SIMPLIFIED_EXECUTION_GUIDE_IDX.md` for step-by-step instructions
- Use Google IDX Assistant with prompts from execution guide
- Reference `PIXEL_ART_REFERENCE.md` for visual style guidance

---

**Document Version**: 1.0  
**Last Updated**: November 2025  
**For**: Google IDX / Antigravity Agent Implementation  
**Status**: Ready for Development
