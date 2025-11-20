# 🎮 PROMPT FOR GOOGLE IDX/ANTIGRAVITY AGENT
## Revised Game Journey - Ooredoo Network Defenders

---

## 📋 IMPLEMENTATION REQUEST

Create a complete game experience with cinematic intro sequence, fiber cable animation, and seamless transition to gameplay. Below are detailed specifications and code examples.

---

## 🎬 GAME JOURNEY FLOW

```
USER OPENS GAME
    ↓
[INTRO SCREEN - Story Text]
    ↓
[FIBER CABLE ANIMATION - Diving Into Network]
    ↓
[COUNTDOWN - 3...2...1...GO!]
    ↓
[GAMEPLAY - Destroy Enemies]
    ↓
[RESULTS SCREEN - Score & Rewards]
    ↓
[PLAY AGAIN or EXIT]
```

**Total Time from Open to Gameplay**: ~8-10 seconds (skippable after first play)

---

## 📝 DETAILED SPECIFICATIONS

### SCREEN 1: INTRO STORY TEXT (5 seconds)

**Visual Design**:
- Black background with animated stars
- Pixel art font (Press Start 2P)
- Text appears line by line with typing effect
- Ooredoo logo glows at top
- Red accent glow effects

**Story Text**:
```
In the vast digital cosmos 
beneath our fiber networks, 
a silent war rages.

Every login summons 
a new Defender… 

and today, 
that Defender is you.

Dive into the cable core, 
protect the signal, 
and crush the forces 
of slow internet.
```

**Animation Sequence**:
1. Screen fades in from black (0.5s)
2. Ooredoo logo materializes at top (1s)
3. Text appears line by line with typing effect (0.1s per character)
4. Each line has slight glow pulse effect
5. Final line pulses brighter: "slow internet" in red
6. Hold for 1 second
7. Fade to fiber cable animation

**User Interaction**:
- Display "TAP TO SKIP" in small text at bottom
- Tapping anywhere skips to fiber animation
- After first playthrough, show "TAP TO SKIP INTRO" prominently

**Audio**:
- Ambient cosmic sound (low drone)
- Typing sound effect for each character
- Dramatic "whoosh" when text appears
- Building tension music

---

### SCREEN 2: FIBER CABLE DIVE ANIMATION (3 seconds)

**Visual Concept**: 
Player's perspective "diving" into a fiber optic cable, traveling at light speed through glowing data streams.

**Visual Elements**:
1. **Fiber Cable Tunnel**:
   - Cylindrical tunnel perspective
   - Glowing fiber strands (red, cyan, purple streaks)
   - Pulsing light patterns along walls
   - Zoom-in motion blur effect
   - Data packets flying past

2. **Speed Effects**:
   - Radial motion blur from center
   - Light trails streaking backward
   - Particles flowing toward edges
   - Screen shake (subtle)
   - Color shifting (blue → cyan → red)

3. **Center Focal Point**:
   - Bright light at tunnel end
   - Growing brighter as camera approaches
   - Final white flash transition to gameplay

**Animation Stages**:
- **0.0s - 0.5s**: Start outside cable (macro view of fiber strand)
- **0.5s - 1.0s**: Zoom into cable entrance (circular portal)
- **1.0s - 2.5s**: High-speed travel through tunnel (main animation)
- **2.5s - 3.0s**: Approach light at end, white flash
- **3.0s**: Transition to countdown

**Technical Implementation**:
- Canvas-based 3D tunnel effect (pseudo-3D)
- Particle system for data packets
- Radial gradient for tunnel walls
- Perlin noise for organic fiber movement
- Camera shake effect (2-3 pixels)

**Audio**:
- Whoosh sound (accelerating)
- Electronic hum (increasing pitch)
- Digital "zip" sounds (data packets)
- Dramatic crescendo
- Final "impact" sound when reaching light

---

### SCREEN 3: COUNTDOWN (3 seconds)

**Visual Design**:
- Large pixel numbers (128px font)
- Center of screen
- Pulse animation with each number
- Background: Faded view of enemy formation
- Red glow around numbers

**Countdown Sequence**:
```
3... (1 second, big pulse, beep sound)
2... (1 second, bigger pulse, higher beep)
1... (1 second, biggest pulse, highest beep)
GO! (0.5 second, screen flash, epic sound)
```

**Animation Details**:
- Each number scales from 0.5x to 1.2x to 1.0x
- Red glow pulses outward
- Screen shakes slightly on "GO!"
- Enemy formation visible but dimmed (preview)

**Audio**:
- Three ascending beep tones
- Final "GO!" sound (explosion-like)
- Music transitions to gameplay theme

---

### SCREEN 4: GAMEPLAY (30-45 seconds)

Standard gameplay as specified in other documents:
- Tap to shoot enemies
- Score points
- Defend network
- Session ends at victory or defeat

---

## 💻 COMPLETE IMPLEMENTATION CODE

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ooredoo Network Defenders</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      background: #000;
      overflow: hidden;
      font-family: 'Press Start 2P', monospace;
    }
    
    #gameCanvas {
      display: block;
      width: 100vw;
      height: 100vh;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
    }
    
    .skip-button {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 12px;
      opacity: 0.7;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1.0; }
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>
  <div id="skipButton" class="skip-button" style="display: none;">TAP TO SKIP</div>
  
  <script src="game.js"></script>
</body>
</html>
```

---

### JavaScript Implementation

```javascript
// File: game.js

// ============================================
// GAME STATE MANAGER
// ============================================

class GameStateManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = 'intro'; // intro, fiber_dive, countdown, gameplay, results
    this.hasSeenIntro = localStorage.getItem('hasSeenIntro') === 'true';
    
    // Resize canvas to viewport
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Disable image smoothing for pixel art
    this.ctx.imageSmoothingEnabled = false;
    
    // Initialize states
    this.introScreen = new IntroScreen(this.ctx, this.canvas);
    this.fiberDiveAnimation = new FiberDiveAnimation(this.ctx, this.canvas);
    this.countdownScreen = new CountdownScreen(this.ctx, this.canvas);
    this.gameplay = new Gameplay(this.ctx, this.canvas);
    this.resultsScreen = new ResultsScreen(this.ctx, this.canvas);
    
    // Audio manager
    this.audioManager = new AudioManager();
    
    // Skip functionality
    this.skipButton = document.getElementById('skipButton');
    this.canvas.addEventListener('click', () => this.handleSkip());
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.handleSkip();
    });
    
    // Start game
    this.start();
  }
  
  resizeCanvas() {
    // Set canvas to viewport size but maintain 9:16 aspect ratio
    const aspectRatio = 9 / 16;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    if (width / height > aspectRatio) {
      width = height * aspectRatio;
    } else {
      height = width / aspectRatio;
    }
    
    this.canvas.width = 360;  // Internal resolution
    this.canvas.height = 640;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
  }
  
  start() {
    // If user has seen intro before, skip to countdown
    if (this.hasSeenIntro) {
      this.state = 'countdown';
      this.countdownScreen.start();
    } else {
      this.state = 'intro';
      this.introScreen.start();
      this.skipButton.style.display = 'block';
    }
    
    this.lastTime = performance.now();
    this.gameLoop();
  }
  
  handleSkip() {
    if (this.state === 'intro') {
      this.introScreen.skip();
      this.transitionTo('fiber_dive');
    } else if (this.state === 'fiber_dive') {
      this.fiberDiveAnimation.skip();
      this.transitionTo('countdown');
    }
  }
  
  transitionTo(newState) {
    this.state = newState;
    this.skipButton.style.display = 'none';
    
    switch(newState) {
      case 'fiber_dive':
        this.fiberDiveAnimation.start();
        break;
      case 'countdown':
        localStorage.setItem('hasSeenIntro', 'true');
        this.hasSeenIntro = true;
        this.countdownScreen.start();
        break;
      case 'gameplay':
        this.gameplay.start();
        break;
      case 'results':
        this.resultsScreen.start(this.gameplay.score);
        break;
    }
  }
  
  gameLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Update current state
    let stateComplete = false;
    
    switch(this.state) {
      case 'intro':
        stateComplete = this.introScreen.update(deltaTime);
        this.introScreen.render();
        break;
      case 'fiber_dive':
        stateComplete = this.fiberDiveAnimation.update(deltaTime);
        this.fiberDiveAnimation.render();
        break;
      case 'countdown':
        stateComplete = this.countdownScreen.update(deltaTime);
        this.countdownScreen.render();
        break;
      case 'gameplay':
        stateComplete = this.gameplay.update(deltaTime);
        this.gameplay.render();
        break;
      case 'results':
        stateComplete = this.resultsScreen.update(deltaTime);
        this.resultsScreen.render();
        break;
    }
    
    // Transition to next state if current is complete
    if (stateComplete) {
      const nextState = {
        'intro': 'fiber_dive',
        'fiber_dive': 'countdown',
        'countdown': 'gameplay',
        'gameplay': 'results'
      }[this.state];
      
      if (nextState) {
        this.transitionTo(nextState);
      }
    }
    
    requestAnimationFrame(() => this.gameLoop());
  }
}

// ============================================
// INTRO SCREEN
// ============================================

class IntroScreen {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.lines = [
      "In the vast digital cosmos",
      "beneath our fiber networks,",
      "a silent war rages.",
      "",
      "Every login summons",
      "a new Defender…",
      "",
      "and today,",
      "that Defender is you.",
      "",
      "Dive into the cable core,",
      "protect the signal,",
      "and crush the forces",
      "of slow internet."
    ];
    this.currentLine = 0;
    this.currentChar = 0;
    this.lineTimer = 0;
    this.charTimer = 0;
    this.charDelay = 50; // ms per character
    this.lineDelay = 300; // ms after line completes
    this.holdTime = 1000; // Hold final screen
    this.done = false;
    this.stars = [];
    
    // Generate starfield
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        brightness: Math.random()
      });
    }
  }
  
  start() {
    this.currentLine = 0;
    this.currentChar = 0;
    this.done = false;
    this.startTime = performance.now();
  }
  
  skip() {
    this.done = true;
  }
  
  update(deltaTime) {
    if (this.done) return true;
    
    // Update starfield
    this.stars.forEach(star => {
      star.y += star.speed;
      if (star.y > this.canvas.height) {
        star.y = 0;
        star.x = Math.random() * this.canvas.width;
      }
      star.brightness = (Math.sin(Date.now() * 0.001 + star.x) + 1) / 2;
    });
    
    // Update text typing
    this.charTimer += deltaTime;
    
    if (this.charTimer >= this.charDelay) {
      this.charTimer = 0;
      
      const currentLineText = this.lines[this.currentLine];
      
      if (currentLineText === "") {
        // Empty line, skip immediately
        this.currentLine++;
        this.currentChar = 0;
      } else if (this.currentChar < currentLineText.length) {
        // Typing character
        this.currentChar++;
        // Play typing sound
        // audioManager.play('type');
      } else {
        // Line complete, wait before next line
        this.lineTimer += deltaTime;
        
        if (this.lineTimer >= this.lineDelay) {
          this.lineTimer = 0;
          this.currentLine++;
          this.currentChar = 0;
          
          // Check if all lines done
          if (this.currentLine >= this.lines.length) {
            // Hold final screen
            setTimeout(() => {
              this.done = true;
            }, this.holdTime);
          }
        }
      }
    }
    
    return false;
  }
  
  render() {
    // Clear screen
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render stars
    this.stars.forEach(star => {
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
      this.ctx.fillRect(star.x, star.y, star.size, star.size);
    });
    
    // Render Ooredoo logo (placeholder - replace with actual logo)
    this.ctx.fillStyle = '#E30613';
    this.ctx.font = '24px "Press Start 2P"';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('OOREDOO', this.canvas.width / 2, 80);
    
    // Add glow to logo
    this.ctx.shadowColor = '#E30613';
    this.ctx.shadowBlur = 20;
    this.ctx.fillText('OOREDOO', this.canvas.width / 2, 80);
    this.ctx.shadowBlur = 0;
    
    // Render story text
    this.ctx.font = '10px "Press Start 2P"';
    this.ctx.textAlign = 'center';
    
    let yPos = 180;
    const lineHeight = 24;
    
    for (let i = 0; i <= this.currentLine && i < this.lines.length; i++) {
      const line = this.lines[i];
      
      if (line === "") {
        yPos += lineHeight / 2;
        continue;
      }
      
      let textToShow = line;
      if (i === this.currentLine) {
        textToShow = line.substring(0, this.currentChar);
      }
      
      // Special styling for "slow internet"
      if (line.includes("slow internet")) {
        this.ctx.fillStyle = '#FF0000';
        this.ctx.shadowColor = '#FF0000';
        this.ctx.shadowBlur = 10;
      } else if (line.includes("Defender")) {
        this.ctx.fillStyle = '#00F0FF';
        this.ctx.shadowColor = '#00F0FF';
        this.ctx.shadowBlur = 8;
      } else {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.shadowBlur = 0;
      }
      
      this.ctx.fillText(textToShow, this.canvas.width / 2, yPos);
      
      // Add pulse effect to current line
      if (i === this.currentLine && this.currentChar === line.length) {
        const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
        this.ctx.globalAlpha = pulse;
        this.ctx.fillText(textToShow, this.canvas.width / 2, yPos);
        this.ctx.globalAlpha = 1.0;
      }
      
      yPos += lineHeight;
    }
    
    // Reset shadow
    this.ctx.shadowBlur = 0;
  }
}

// ============================================
// FIBER CABLE DIVE ANIMATION
// ============================================

class FiberDiveAnimation {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.duration = 3000; // 3 seconds
    this.elapsed = 0;
    this.done = false;
    this.particles = [];
    this.tunnelSegments = [];
    
    // Generate tunnel segments
    for (let i = 0; i < 20; i++) {
      this.tunnelSegments.push({
        z: i * 50,
        radius: 100 + Math.sin(i * 0.5) * 20,
        color: ['#E30613', '#00F0FF', '#B026FF'][i % 3],
        rotation: i * 0.2
      });
    }
    
    // Generate data particles
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 100 + 50,
        z: Math.random() * 1000,
        speed: Math.random() * 5 + 2,
        size: Math.random() * 3 + 1,
        color: ['#E30613', '#00F0FF', '#FFD700'][Math.floor(Math.random() * 3)]
      });
    }
  }
  
  start() {
    this.elapsed = 0;
    this.done = false;
  }
  
  skip() {
    this.done = true;
  }
  
  update(deltaTime) {
    if (this.done) return true;
    
    this.elapsed += deltaTime;
    
    // Update tunnel segments (move toward camera)
    this.tunnelSegments.forEach(segment => {
      segment.z -= 10;
      if (segment.z < -50) {
        segment.z = 950;
      }
      segment.rotation += 0.02;
    });
    
    // Update particles
    this.particles.forEach(particle => {
      particle.z -= particle.speed;
      if (particle.z < 0) {
        particle.z = 1000;
        particle.angle = Math.random() * Math.PI * 2;
        particle.distance = Math.random() * 100 + 50;
      }
    });
    
    if (this.elapsed >= this.duration) {
      this.done = true;
      return true;
    }
    
    return false;
  }
  
  render() {
    // Clear with black
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    // Render tunnel segments (pseudo-3D)
    this.tunnelSegments.forEach(segment => {
      if (segment.z < 0 || segment.z > 1000) return;
      
      // Perspective projection
      const scale = 200 / segment.z;
      const radius = segment.radius * scale;
      
      // Draw ring
      this.ctx.strokeStyle = segment.color;
      this.ctx.lineWidth = 3 * scale;
      this.ctx.globalAlpha = 1 - (segment.z / 1000);
      
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.stroke();
      
      // Draw connecting lines (fiber strands)
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i + segment.rotation;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = segment.color;
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.3;
        this.ctx.stroke();
      }
    });
    
    this.ctx.globalAlpha = 1.0;
    
    // Render data particles
    this.particles.forEach(particle => {
      if (particle.z < 0 || particle.z > 1000) return;
      
      const scale = 200 / particle.z;
      const x = centerX + Math.cos(particle.angle) * particle.distance * scale;
      const y = centerY + Math.sin(particle.angle) * particle.distance * scale;
      const size = particle.size * scale;
      
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = 1 - (particle.z / 1000);
      this.ctx.fillRect(x - size/2, y - size/2, size, size);
    });
    
    this.ctx.globalAlpha = 1.0;
    
    // Radial motion blur effect
    const progress = this.elapsed / this.duration;
    const blurIntensity = progress * 0.3;
    
    const gradient = this.ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, this.canvas.width
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, `rgba(0,0,0,${blurIntensity})`);
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Light at end of tunnel (grows brighter)
    const lightSize = 50 + (progress * 300);
    const lightGradient = this.ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, lightSize
    );
    lightGradient.addColorStop(0, `rgba(255,255,255,${progress * 0.8})`);
    lightGradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    this.ctx.fillStyle = lightGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Final white flash
    if (progress > 0.9) {
      const flashIntensity = (progress - 0.9) / 0.1;
      this.ctx.fillStyle = `rgba(255,255,255,${flashIntensity})`;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Screen shake effect
    if (progress > 0.5) {
      const shakeX = (Math.random() - 0.5) * 4 * progress;
      const shakeY = (Math.random() - 0.5) * 4 * progress;
      this.ctx.translate(shakeX, shakeY);
    }
  }
}

// ============================================
// COUNTDOWN SCREEN
// ============================================

class CountdownScreen {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.count = 3;
    this.elapsed = 0;
    this.countDuration = 1000; // 1 second per number
    this.done = false;
  }
  
  start() {
    this.count = 3;
    this.elapsed = 0;
    this.done = false;
  }
  
  update(deltaTime) {
    if (this.done) return true;
    
    this.elapsed += deltaTime;
    
    if (this.elapsed >= this.countDuration) {
      this.elapsed = 0;
      this.count--;
      
      // Play beep sound (increasing pitch)
      // audioManager.play('countdown_beep', 3 - this.count);
      
      if (this.count < 0) {
        this.done = true;
        return true;
      }
    }
    
    return false;
  }
  
  render() {
    // Clear screen
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render countdown number or "GO!"
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    // Calculate scale animation (pulse effect)
    const progress = this.elapsed / this.countDuration;
    const scale = 0.5 + (1 - progress) * 0.7; // Start big, shrink to normal
    
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.scale(scale, scale);
    
    // Draw number
    this.ctx.font = '128px "Press Start 2P"';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    const text = this.count > 0 ? this.count.toString() : 'GO!';
    
    // Glow effect
    this.ctx.shadowColor = '#E30613';
    this.ctx.shadowBlur = 30;
    this.ctx.fillStyle = '#E30613';
    this.ctx.fillText(text, 0, 0);
    
    // White core
    this.ctx.shadowBlur = 10;
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(text, 0, 0);
    
    this.ctx.restore();
    
    // Screen flash on "GO!"
    if (this.count === 0) {
      this.ctx.fillStyle = `rgba(255,255,255,${1 - progress})`;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ============================================
// GAMEPLAY (Placeholder - integrate your existing game)
// ============================================

class Gameplay {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.score = 0;
    // ... rest of your game code
  }
  
  start() {
    this.score = 0;
    // Initialize game
  }
  
  update(deltaTime) {
    // Game logic
    // Return true when game ends
    return false;
  }
  
  render() {
    // Render game
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Placeholder text
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '16px "Press Start 2P"';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAMEPLAY HERE', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 30);
  }
}

// ============================================
// RESULTS SCREEN (Placeholder)
// ============================================

class ResultsScreen {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.score = 0;
  }
  
  start(score) {
    this.score = score;
  }
  
  update(deltaTime) {
    return false; // Never auto-advance, wait for user input
  }
  
  render() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '16px "Press Start 2P"';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('RESULTS', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 30);
  }
}

// ============================================
// AUDIO MANAGER (Placeholder)
// ============================================

class AudioManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
  }
  
  play(soundName, variation = 0) {
    if (!this.enabled) return;
    // Play sound
    console.log(`Playing sound: ${soundName}, variation: ${variation}`);
  }
}

// ============================================
// INITIALIZE GAME
// ============================================

window.addEventListener('load', () => {
  const canvas = document.getElementById('gameCanvas');
  const game = new GameStateManager(canvas);
});
```

---

## 🎨 VISUAL STYLE SPECIFICATIONS

### Intro Screen Colors
```css
--background: #000000
--text-primary: #FFFFFF
--text-accent: #E30613 (Ooredoo red)
--text-defender: #00F0FF (cyan)
--text-danger: #FF0000 (for "slow internet")
--star-color: #FFFFFF
--glow-color: #E30613
```

### Fiber Cable Animation Colors
```css
--tunnel-red: #E30613
--tunnel-cyan: #00F0FF
--tunnel-purple: #B026FF
--particle-red: #E30613
--particle-cyan: #00F0FF
--particle-yellow: #FFD700
--light-white: #FFFFFF
```

### Countdown Colors
```css
--countdown-text: #FFFFFF
--countdown-glow: #E30613
--flash-white: #FFFFFF
```

---

## 🔊 AUDIO SPECIFICATIONS

### Intro Screen Audio
- **Background**: Ambient cosmic drone (looping)
- **Typing Effect**: Subtle "tick" per character (0.05s)
- **Line Complete**: Soft "whoosh" (0.2s)
- **Special Words**: Emphasize "Defender" with chime, "slow internet" with ominous tone

### Fiber Cable Dive Audio
- **Acceleration**: Rising "whoooosh" (3 seconds, pitch increases)
- **Data Packets**: Random "zip" sounds (0.1s each)
- **Tunnel Echo**: Reverb/echo effect on whoosh
- **Final Impact**: Large "boom" when reaching light (0.5s)

### Countdown Audio
- **3**: Beep (440 Hz, 0.2s)
- **2**: Beep (550 Hz, 0.2s)
- **1**: Beep (660 Hz, 0.2s)
- **GO!**: Explosion sound (0.5s, dramatic)

---

## 📱 MOBILE OPTIMIZATIONS

### Touch Interactions
```javascript
// Prevent scrolling during gameplay
document.body.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });

// Larger tap target for skip button
const skipButton = document.getElementById('skipButton');
skipButton.style.padding = '20px';
skipButton.style.fontSize = '14px';
```

### Performance
- Limit particle count on low-end devices (detect via frame rate)
- Reduce blur effects if FPS < 30
- Skip intro animations after first playthrough
- Cache localStorage flag for "hasSeenIntro"

---

## ✅ TESTING CHECKLIST

### Intro Screen
- [ ] Text appears character by character
- [ ] Lines have correct timing
- [ ] "Slow internet" appears in red
- [ ] Stars animate smoothly
- [ ] Logo glows at top
- [ ] Skip button works
- [ ] Transitions to fiber dive after completion

### Fiber Cable Animation
- [ ] Tunnel perspective works correctly
- [ ] Particles fly toward screen edges
- [ ] Colors cycle (red, cyan, purple)
- [ ] Motion blur effect visible
- [ ] Light grows brighter at end
- [ ] Screen shake effect works
- [ ] White flash transition smooth
- [ ] Skip button works

### Countdown
- [ ] Numbers appear 3, 2, 1, GO!
- [ ] Each number pulses correctly
- [ ] Sound pitch increases
- [ ] "GO!" has dramatic effect
- [ ] Screen flash on final count
- [ ] Transitions to gameplay immediately

### User Experience
- [ ] Total intro time: ~8-10 seconds
- [ ] Can skip at any point
- [ ] Skipping is intuitive (tap anywhere)
- [ ] Intro only shows once (localStorage check)
- [ ] Smooth transitions between states
- [ ] No lag or frame drops
- [ ] Works on mobile (portrait orientation)
- [ ] Touch events registered correctly

---

## 🐛 COMMON ISSUES & SOLUTIONS

### Issue: Intro text too slow
**Solution**: Reduce `charDelay` from 50ms to 30ms

### Issue: Fiber animation choppy
**Solution**: Reduce particle count from 100 to 50, simplify tunnel segments

### Issue: Skip button not visible
**Solution**: Increase font size, add white background, stronger pulse animation

### Issue: Audio doesn't play on mobile
**Solution**: Initialize audio after first user interaction (iOS requirement)

### Issue: Canvas sizing wrong on mobile
**Solution**: Use viewport meta tag, CSS `width: 100vw; height: 100vh`

---

## 📝 SUMMARY FOR IDX/ANTIGRAVITY AGENT

**REQUEST**: Implement the complete game journey as specified above.

**KEY FEATURES**:
1. Cinematic intro with story text (5s)
2. Fiber cable dive animation with 3D tunnel effect (3s)
3. Countdown sequence (3s)
4. Seamless transition to gameplay
5. Skip functionality (tap anywhere)
6. Remember user preference (skip intro on subsequent plays)

**DELIVERABLES**:
- Single HTML file with embedded CSS
- Complete JavaScript implementation in `game.js`
- All animations working smoothly at 60 FPS
- Mobile-optimized (portrait orientation)
- Pixel art aesthetic maintained throughout

**ESTIMATED TIME**: 4-6 hours of development

**PRIORITY**: High - This is the first thing users see

---

**Status**: Ready for Implementation  
**For**: Google IDX / Antigravity Agent  
**Version**: 1.0
