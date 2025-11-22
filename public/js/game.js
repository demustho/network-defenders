import { Player } from './entities/Player.js';
import { EnemyFormation } from './entities/EnemyFormation.js';
import { Projectile } from './entities/Projectile.js';
import { Boss } from './entities/Boss.js';
import { ENEMY_TYPES } from './entities/Enemy.js';
import { AudioManager } from './AudioManager.js';

import { PreGameScreen } from './screens/PreGameScreen.js';

import { PowerUpManager } from './systems/PowerUpManager.js';
import { ProgressionManager } from './systems/ProgressionManager.js';
import { RedClubManager } from './systems/RedClubManager.js';
import { MissionManager } from './systems/MissionManager.js';
import { ParticleSystem } from './utils/ParticleSystem.js';
import { HapticFeedback } from './utils/HapticFeedback.js';
import { SpriteProcessor } from './utils/SpriteProcessor.js';

console.log("game.js module loaded successfully!");

// ============================================

class GameStateManager {
    constructor(canvas) {
        console.log("GameStateManager constructor called with canvas:", canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        console.log("1. Canvas context created");
        this.state = 'intro'; // intro, fiber_dive, countdown, pregame, gameplay, results
        this.hasSeenIntro = localStorage.getItem('hasSeenIntro') === 'true';
        console.log("2. State initialized");

        // Managers
        console.log("3. Creating managers...");
        this.audioManager = new AudioManager();
        console.log("3a. AudioManager created");
        this.powerUpManager = new PowerUpManager();
        console.log("3b. PowerUpManager created");
        this.progressionManager = new ProgressionManager();
        console.log("3c. ProgressionManager created");
        this.redClubManager = new RedClubManager();
        console.log("3d. RedClubManager created");
        this.missionManager = new MissionManager();
        console.log("3e. MissionManager created");
        this.hapticFeedback = new HapticFeedback();
        console.log("3f. HapticFeedback created");
        this.particleSystem = new ParticleSystem();
        console.log("3g. ParticleSystem created");

        // Resize canvas to viewport
        console.log("4. Resizing canvas...");
        this.resizeCanvas();
        console.log("4a. Canvas resized");
        window.addEventListener('resize', () => this.resizeCanvas());

        // Disable image smoothing for pixel art
        this.ctx.imageSmoothingEnabled = false;
        console.log("5. Image smoothing disabled");

        // Initialize states (lazy initialization to avoid class definition order issues)
        console.log("6. Initializing screen instances...");
        this.introScreen = null; // new IntroScreen(this.ctx, this.canvas, this.audioManager);
        this.fiberDiveAnimation = null; // new FiberDiveAnimation(this.ctx, this.canvas, this.audioManager);
        this.countdownScreen = null; // new CountdownScreen(this.ctx, this.canvas, this.audioManager);
        console.log("6a. Screen instances set to null");
        this.preGameScreen = new PreGameScreen(this.ctx, this.canvas, this.powerUpManager, this.progressionManager);
        console.log("6b. PreGameScreen created");
        this.gameplay = null; // Lazy init - class defined later in file
        console.log("6c. Gameplay set to null");
        this.resultsScreen = null; // Lazy init - class defined later in file
        console.log("6d. ResultsScreen set to null");

        // Skip functionality
        this.skipButton = document.getElementById('skipButton');
        this.skipButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent canvas click
            this.handleSkip();
        });

        // Also allow clicking canvas to skip if in intro/dive
        this.canvas.addEventListener('pointerdown', (e) => {
            // Init audio on any click
            if (!this.audioManager.initialized) {
                this.audioManager.init().catch(console.error);
            }

            if (this.state === 'intro' || this.state === 'fiber_dive') {
                this.handleSkip();
            } else if (this.state === 'pregame') {
                // Handle pregame screen clicks
                const rect = this.canvas.getBoundingClientRect();
                const scaleX = this.canvas.width / rect.width;
                const scaleY = this.canvas.height / rect.height;
                const x = (e.clientX - rect.left) * scaleX;
                const y = (e.clientY - rect.top) * scaleY;
                this.preGameScreen.handleClick(x, y);
            }
        });

        // Hide loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.style.display = 'none';

        // Start game
        this.preloadAssets().then(() => {
            console.log("Assets loaded, starting game...");
            this.start();
        }).catch(error => {
            console.error("Error loading assets:", error);
            // Start anyway to allow gameplay
            this.start();
        });
    }

    async preloadAssets() {
        console.log("Starting asset preload...");

        try {
            const types = Object.keys(ENEMY_TYPES);
            console.log("Enemy types to process:", types);

            const promises = types.map(async (key) => {
                const type = ENEMY_TYPES[key];
                if (type.imageSrc) {
                    try {
                        const processed = await SpriteProcessor.removeBackground(type.imageSrc);
                        type.processedImage = processed;
                        console.log(`Processed ${type.name}`);
                    } catch (e) {
                        console.error(`Failed to process ${type.name}:`, e);
                    }
                }
            });

            // Also process player ship
            try {
                const playerImg = await SpriteProcessor.removeBackground('assets/sprites/player/ship_idle_01.png');
                Player.processedImage = playerImg;
                console.log("Processed Player Ship sprite");
            } catch (e) {
                console.error("Failed to process player ship:", e);
            }

            await Promise.all(promises);
            console.log("Assets preloaded successfully.");
        } catch (error) {
            console.error("Error in preloadAssets:", error);
            throw error;
        }
    }

    resizeCanvas() {
        // Set canvas to viewport size but maintain 9:16 aspect ratio
        // Or just fill screen for now to ensure gameplay works as before?
        // The prompt requested 9:16, but that might leave black bars.
        // Let's stick to full screen for now to match previous behavior, 
        // but we can enforce a logical resolution if needed.
        // Actually, let's try to follow the prompt's aspect ratio logic but keep it responsive.

        const aspectRatio = 9 / 16;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // If we want to enforce aspect ratio:
        /*
        if (width / height > aspectRatio) {
            width = height * aspectRatio;
        } else {
            height = width / aspectRatio;
        }
        */
        // For now, let's keep full screen to avoid "black bars" complaints unless requested.
        // But we WILL set the internal resolution to be lower for that pixel art look if desired.
        // The prompt suggested 360x640.

        // this.canvas.width = 360;
        // this.canvas.height = 640;
        // this.canvas.style.width = width + 'px';
        // this.canvas.style.height = height + 'px';

        // Reverting to full resolution for now to ensure physics/movement doesn't break
        // as EnemyFormation relies on canvas width.
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.imageSmoothingEnabled = false;

        if (this.gameplay && this.gameplay.player) {
            this.gameplay.player.y = this.canvas.height - this.gameplay.player.height - 150;
        }
    }

    start() {
        // Update power-up max slots based on rank
        this.powerUpManager.maxLoadoutSlots = this.progressionManager.getMaxPowerUpSlots();

        // Always play intro as requested
        this.transitionTo('intro');

        this.lastTime = performance.now();
        this.gameLoop();
    }

    handleSkip() {
        // Init audio on first interaction
        if (!this.audioManager.initialized) {
            this.audioManager.init().catch(console.error);
        }

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

        // UI Visibility
        if (this.skipButton) this.skipButton.style.display = 'none';

        const uiLayer = document.getElementById('ui-layer');
        if (uiLayer) uiLayer.style.display = 'none';

        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) gameOverScreen.classList.add('hidden');

        switch (newState) {
            case 'intro':
                // Lazy initialization
                if (!this.introScreen) {
                    this.introScreen = new IntroScreen(this.ctx, this.canvas, this.audioManager);
                }
                this.skipButton.style.display = 'block';
                this.introScreen.start();
                break;
            case 'fiber_dive':
                // Lazy initialization
                if (!this.fiberDiveAnimation) {
                    this.fiberDiveAnimation = new FiberDiveAnimation(this.ctx, this.canvas, this.audioManager);
                }
                this.skipButton.style.display = 'block';
                this.fiberDiveAnimation.start();
                break;
            case 'countdown':
                // Lazy initialization
                if (!this.countdownScreen) {
                    this.countdownScreen = new CountdownScreen(this.ctx, this.canvas, this.audioManager);
                }
                localStorage.setItem('hasSeenIntro', 'true');
                this.hasSeenIntro = true;
                this.countdownScreen.start();
                break;
            case 'pregame':
                this.preGameScreen.start();
                break;
            case 'gameplay':
                // Lazy initialization for Gameplay
                if (!this.gameplay) {
                    this.gameplay = new Gameplay(
                        this.ctx,
                        this.canvas,
                        this.audioManager,
                        this,
                        this.powerUpManager,
                        this.progressionManager,
                        this.hapticFeedback,
                        this.particleSystem
                    );
                }
                document.getElementById('ui-layer').style.display = 'flex';
                this.gameplay.start();
                break;
            case 'results':
                // Lazy initialization for ResultsScreen
                if (!this.resultsScreen) {
                    this.resultsScreen = new ResultsScreen(this.ctx, this.canvas, this.progressionManager);
                }
                const accuracy = this.gameplay.shotsFired > 0
                    ? Math.round((this.gameplay.shotsHit / this.gameplay.shotsFired) * 100)
                    : 0;
                this.resultsScreen.start(
                    this.gameplay.score,
                    this.gameplay.victory,
                    this.gameplay.sessionTimeRemaining,
                    accuracy
                );
                break;
        }
    }

    gameLoop() {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update current state
        let stateComplete = false;

        switch (this.state) {
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
            case 'pregame':
                stateComplete = this.preGameScreen.update(deltaTime);
                this.preGameScreen.render();
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
                'countdown': 'gameplay', // Skip pregame
                'pregame': 'gameplay',
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
    constructor(ctx, canvas, audioManager) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.audioManager = audioManager;
        this.lines = [
            "In the vast digital cosmos",
            "beneath our fiber networks,",
            "a silent war rages.",
            "",
            "Every login summons",
            "a new Defender...",
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
        this.charDelay = 30; // ms per character (faster)
        this.lineDelay = 300; // ms after line completes
        this.holdTime = 1000; // Hold final screen
        this.holdStartTime = null;
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
        this.holdStartTime = null;
        this.done = false;
        this.startTime = performance.now();

        // Play intro music
        this.audioManager.playIntroMusic();
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

            // Check if all lines are done
            if (this.currentLine >= this.lines.length) {
                // Hold final screen
                if (!this.holdStartTime) {
                    this.holdStartTime = performance.now();
                } else if (performance.now() - this.holdStartTime >= this.holdTime) {
                    this.done = true;
                }
                return false;
            }

            const currentLineText = this.lines[this.currentLine];

            if (currentLineText === "") {
                // Empty line, skip immediately
                this.currentLine++;
                this.currentChar = 0;
            } else if (this.currentChar < currentLineText.length) {
                // Typing character
                this.currentChar++;
                // Play typing sound if available
                // this.audioManager.playType();
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

        // Render Ooredoo logo (text for now)
        this.ctx.font = '24px "Press Start 2P", monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('OOREDOO', this.canvas.width / 2, 80);

        // Add glow to logo
        this.ctx.shadowColor = '#E30613';
        this.ctx.shadowBlur = 20;
        this.ctx.fillText('OOREDOO', this.canvas.width / 2, 80);
        this.ctx.shadowBlur = 0;

        // Render story text
        this.ctx.font = '14px "Press Start 2P", monospace'; // Slightly larger
        this.ctx.textAlign = 'center';

        let yPos = 180;
        const lineHeight = 30;
        const horizontalPadding = 40; // Padding from screen edges
        const maxWidth = this.canvas.width - (horizontalPadding * 2); // Maximum text width

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

            // Special styling
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

            // Draw text with max width constraint for padding
            this.ctx.fillText(textToShow, this.canvas.width / 2, yPos, maxWidth);

            // Add pulse effect to current line
            if (i === this.currentLine && this.currentChar === line.length) {
                const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
                this.ctx.globalAlpha = pulse;
                this.ctx.fillText(textToShow, this.canvas.width / 2, yPos, maxWidth);
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
    constructor(ctx, canvas, audioManager) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.audioManager = audioManager;
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

        // Play warp sound effect
        this.audioManager.playWarpSound();
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
            this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
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
    constructor(ctx, canvas, audioManager) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.audioManager = audioManager;
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

            // Play beep sound with different pitch for each number
            if (this.count === 2) {
                this.audioManager.playSciFiBeep(1.0);
            } else if (this.count === 1) {
                this.audioManager.playSciFiBeep(1.2);
            } else if (this.count === 0) {
                this.audioManager.playSciFiBeep(1.5);
            }

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
        this.ctx.font = '128px "Press Start 2P", monospace';
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
// GAMEPLAY
// ============================================

class Gameplay {
    constructor(ctx, canvas, audioManager, gameStateManager, powerUpManager, progressionManager, hapticFeedback, particleSystem) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.audioManager = audioManager;
        this.gameStateManager = gameStateManager;
        this.powerUpManager = powerUpManager;
        this.progressionManager = progressionManager;
        this.hapticFeedback = hapticFeedback;
        this.particleSystem = particleSystem;

        this.score = 0;
        this.lives = 3;
        this.player = null;
        this.projectiles = [];
        this.enemyFormation = null;
        this.boss = null; // Boss instance
        this.bossSpawned = false;
        this.bossSpawnTime = 30000; // Boss spawns at 30 seconds
        this.gameTime = 0;
        this.isGameOver = false;

        // Session timer (45 seconds as per PRD)
        this.sessionDuration = 45000; // 45 seconds in ms
        this.sessionTimeRemaining = this.sessionDuration;
        this.sessionStartTime = 0;

        // Win/Loss tracking
        this.victory = false;
        this.shotsFired = 0;
        this.shotsHit = 0;

        // Input State
        this.input = {
            left: false,
            right: false,
            x: null // For touch/mouse
        };

        // Bind Input Events
        window.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') this.input.left = true;
            if (e.key === 'ArrowRight') this.input.right = true;
            if (e.code === 'Space' && !this.isGameOver) this.shoot();
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowLeft') this.input.left = false;
            if (e.key === 'ArrowRight') this.input.right = false;
        });

        // Touch/Mouse - only for movement, no manual shooting
        canvas.addEventListener('pointerdown', e => {
            if (!this.isGameOver) {
                this.input.x = e.clientX;
            }
        });
        canvas.addEventListener('pointermove', e => {
            if (!this.isGameOver && this.input.x !== null) {
                this.input.x = e.clientX;
            }
        });
        canvas.addEventListener('pointerup', () => {
            this.input.x = null;
        });

        // Restart button listener (needs to be bound once)
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                // Reload page or reset state?
                // For now, simple reload to restart journey or just reset game
                // Let's reset game
                this.gameStateManager.start();
            });
        }
    }

    start() {
        console.log("Gameplay Start");
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;
        this.victory = false;
        this.projectiles = [];
        this.boss = null;
        this.bossSpawned = false;
        this.gameTime = 0;
        this.sessionTimeRemaining = this.sessionDuration;
        this.sessionStartTime = performance.now();
        this.shotsFired = 0;
        this.shotsHit = 0;

        // Update UI
        document.getElementById('score').innerText = this.score;
        document.getElementById('lives').innerText = this.lives;

        // Initialize Player
        this.player = new Player(this.canvas);

        // Initialize EnemyFormation
        const gameRef = {
            canvas: this.canvas,
            width: this.canvas.width,
            height: this.canvas.height,
            gameOver: () => this.gameOver()
        };
        this.enemyFormation = new EnemyFormation(gameRef);

        this.audioManager.playStart();
    }

    update(deltaTime) {
        if (this.isGameOver) return true; // End state

        this.gameTime += deltaTime;

        // Update session timer
        this.sessionTimeRemaining = this.sessionDuration - this.gameTime;

        // Check if time expired
        if (this.sessionTimeRemaining <= 0) {
            this.sessionTimeRemaining = 0;
            this.victory = true; // Win condition met: Survived!

            // Calculate time bonus (should be 0 if time ran out, but maybe bonus for lives?)
            const lifeBonus = this.lives * 100;
            this.score += lifeBonus;

            this.gameOver();
            return false;
        }

        // Update timer display
        const secondsRemaining = Math.ceil(this.sessionTimeRemaining / 1000);
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.innerText = secondsRemaining;
            // Add warning color when time is low
            if (secondsRemaining <= 10) {
                timerElement.style.color = '#FF0000';
            } else if (secondsRemaining <= 20) {
                timerElement.style.color = '#FFA500';
            } else {
                timerElement.style.color = '#FFFFFF';
            }
        }

        // Player
        if (this.player) {
            this.player.update(deltaTime, this.input);

            // Auto-shooting
            if (this.player.shouldAutoShoot()) {
                this.shoot();
            }
        }

        // Projectiles
        this.projectiles.forEach(p => p.update(deltaTime, this.canvas.height));
        this.projectiles = this.projectiles.filter(p => !p.markedForDeletion);

        // Update power-ups
        if (this.powerUpManager) {
            this.powerUpManager.update(deltaTime, this);
        }

        // Update particle system
        if (this.particleSystem) {
            this.particleSystem.update(deltaTime);
        }

        // Boss spawn logic - spawn at 30 seconds (15 seconds remaining)
        if (!this.bossSpawned && this.gameTime >= this.bossSpawnTime) {
            this.spawnBoss();
        }

        // Update Boss
        if (this.boss) {
            this.boss.update(deltaTime);

            // Boss shooting
            const bossProjectiles = this.boss.shoot();
            if (bossProjectiles && bossProjectiles.length > 0) {
                this.projectiles.push(...bossProjectiles);
            }

            // Check if boss defeated (WIN CONDITION)
            if (this.boss.markedForDeletion) {
                // Trigger epic boss explosion
                if (this.particleSystem) {
                    this.particleSystem.createBossExplosion(
                        this.boss.x + this.boss.width / 2,
                        this.boss.y + this.boss.height / 2
                    );
                }

                // Play boss explosion sound
                this.audioManager.playBossExplosion();

                // Show victory message after explosion delay
                const victoryMessages = [
                    "You defeated the Slow Internet!",
                    "Lag Destroyed. Speed Restored.",
                    "Connection Secured!",
                    "Network Defended!",
                    "Bandwidth Protected!",
                    "Glitch Eliminated!"
                ];
                const randomMessage = victoryMessages[Math.floor(Math.random() * victoryMessages.length)];

                setTimeout(() => {
                    const victoryOverlay = document.getElementById('victory-message');
                    const victoryText = document.getElementById('victory-text');
                    if (victoryOverlay && victoryText) {
                        victoryText.innerText = randomMessage;
                        victoryOverlay.classList.remove('hidden');
                    }
                }, 1500); // Show after 1.5 seconds

                this.victory = true;
                // Big bonus for defeating boss
                const timeBonus = Math.floor(this.sessionTimeRemaining / 1000) * 10;
                this.score += timeBonus;

                // Delay game over to show explosion
                setTimeout(() => {
                    this.gameOver();
                }, 3000); // 3 seconds total (1.5s explosion + 1.5s message)

                return false;
            }
        }

        // Enemy Formation (only if boss hasn't spawned yet)
        if (this.enemyFormation && !this.bossSpawned) {
            this.enemyFormation.update(deltaTime);

            // Check if all enemies destroyed - don't end game, wait for boss
            if (this.enemyFormation.enemies.length === 0) {
                // Clear enemy formation but don't end game
                this.enemyFormation = null;
            }

            // Enemy Shooting
            if (this.enemyFormation && Math.random() < 0.02) {
                const enemyProjectile = this.enemyFormation.shoot();
                if (enemyProjectile) {
                    this.projectiles.push(enemyProjectile);
                }
            }
        }

        // Collision Detection
        this.checkCollisions();

        return false;
    }

    spawnBoss() {
        console.log("Boss spawning!");
        this.bossSpawned = true;

        // Clear remaining enemies
        if (this.enemyFormation) {
            this.enemyFormation.enemies = [];
            this.enemyFormation = null;
        }

        // Create boss
        const gameRef = {
            canvas: this.canvas,
            width: this.canvas.width,
            height: this.canvas.height
        };
        this.boss = new Boss(gameRef);

        // Play boss music or sound effect
        this.audioManager.playExplosion(); // Placeholder for boss entrance sound
    }

    render() {
        // Clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.player) this.player.draw(this.ctx);
        this.projectiles.forEach(p => p.draw(this.ctx));
        if (this.enemyFormation) this.enemyFormation.draw(this.ctx);
        if (this.boss) this.boss.draw(this.ctx); // Draw boss

        // Render particle effects
        if (this.particleSystem) {
            this.particleSystem.draw(this.ctx);
        }

        // Render power-up indicators
        if (this.powerUpManager) {
            this.powerUpManager.render(this.ctx, this.canvas);
        }
    }

    shoot() {
        if (!this.player) return;
        // [CHANGED] Use player's helper method for spawn point
        const spawn = this.player.getBulletSpawnPoint();
        const p = new Projectile(spawn.x, spawn.y);
        this.projectiles.push(p);
        this.shotsFired++;
        this.audioManager.playShoot();

        // Haptic feedback
        if (this.hapticFeedback) {
            this.hapticFeedback.shoot();
        }
    }

    checkCollisions() {
        // Player Projectiles hitting Enemies
        this.projectiles.forEach(projectile => {
            if (projectile.isEnemy) return;

            // Check collision with regular enemies
            if (this.enemyFormation) {
                this.enemyFormation.enemies.forEach(enemy => {
                    if (!enemy.markedForDeletion && !projectile.markedForDeletion &&
                        this.rectIntersect(projectile.x, projectile.y, projectile.width, projectile.height,
                            enemy.x, enemy.y, enemy.width, enemy.height)) {

                        enemy.markedForDeletion = true;
                        projectile.markedForDeletion = true;
                        this.score += enemy.type.points;
                        this.shotsHit++;
                        document.getElementById('score').innerText = this.score;
                        this.audioManager.playExplosion();

                        // Haptic feedback and particle effect
                        if (this.hapticFeedback) {
                            this.hapticFeedback.hit();
                        }
                        if (this.particleSystem) {
                            this.particleSystem.createExplosion(
                                enemy.x + enemy.width / 2,
                                enemy.y + enemy.height / 2,
                                enemy.type.color,
                                15
                            );
                        }
                    }
                });
            }

            // Check collision with Boss
            if (this.boss && !this.boss.markedForDeletion && !projectile.markedForDeletion) {
                const bossHitbox = this.boss.getHitbox ? this.boss.getHitbox() :
                    { x: this.boss.x, y: this.boss.y, width: this.boss.width, height: this.boss.height };

                if (this.rectIntersect(projectile.x, projectile.y, projectile.width, projectile.height,
                    bossHitbox.x, bossHitbox.y, bossHitbox.width, bossHitbox.height)) {

                    projectile.markedForDeletion = true;
                    this.boss.takeDamage(1);
                    this.score += 10; // Points per hit
                    this.shotsHit++;
                    document.getElementById('score').innerText = this.score;
                    this.audioManager.playExplosion();

                    // Haptic feedback and particle effect
                    if (this.hapticFeedback) {
                        this.hapticFeedback.hit();
                    }
                    if (this.particleSystem) {
                        this.particleSystem.createExplosion(
                            this.boss.x + this.boss.width / 2,
                            this.boss.y + this.boss.height / 2,
                            '#8B00FF',
                            20
                        );
                    }
                }
            }
        });

        // Enemy Projectiles hitting Player
        this.projectiles.forEach(projectile => {
            if (!projectile.isEnemy) return;

            if (!projectile.markedForDeletion && this.player) {
                // [CHANGED] Use player's hitbox for fairer collision
                const playerHitbox = this.player.getHitbox();
                if (this.rectIntersect(projectile.x, projectile.y, projectile.width, projectile.height,
                    playerHitbox.x, playerHitbox.y, playerHitbox.width, playerHitbox.height)) {

                    projectile.markedForDeletion = true;

                    // Check if player has shield
                    if (this.powerUpManager && this.powerUpManager.hasShield()) {
                        // Shield absorbs hit
                        this.powerUpManager.consumeShieldHit();
                        this.audioManager.playExplosion();
                    } else {
                        // Player Hit Logic
                        this.lives--;
                        document.getElementById('lives').innerText = this.lives;
                        this.audioManager.playExplosion();

                        if (this.lives <= 0) {
                            this.gameOver();
                        } else {
                            // Respawn / Reset
                            this.projectiles = this.projectiles.filter(p => !p.isEnemy);
                            this.player.x = this.canvas.width / 2 - this.player.width / 2;
                        }
                    }
                }
            }
        });

        // Clean up dead enemies
        if (this.enemyFormation) {
            this.enemyFormation.enemies = this.enemyFormation.enemies.filter(e => !e.markedForDeletion);
        }
    }

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
    }

    gameOver() {
        this.isGameOver = true;
        this.audioManager.playGameOver();
        // Trigger state transition to results
        // Actually, we can just show the overlay here and let the GameStateManager switch to 'results'
        // But GameStateManager expects 'true' from update() to switch.
        // So update() returns true if isGameOver.
    }
}

// ============================================
// RESULTS SCREEN
// ============================================

class ResultsScreen {
    constructor(ctx, canvas, progressionManager) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.progressionManager = progressionManager;
        this.score = 0;
    }

    start(score, victory, timeRemaining, accuracy) {
        this.score = score;
        this.victory = victory;
        this.timeRemaining = timeRemaining;
        this.accuracy = accuracy;

        // Update progression
        if (this.progressionManager) {
            this.progressionResult = this.progressionManager.addGameResult(score, victory);
        }

        document.getElementById('game-over-screen').classList.remove('hidden');

        // Update victory/defeat message
        const title = document.querySelector('#game-over-screen h1');
        const rewardMsg = document.getElementById('reward-message');
        const restartBtn = document.getElementById('restart-btn');

        if (victory) {
            title.innerText = 'MISSION ACCOMPLISHED!';
            title.style.color = '#00FF00';
            if (rewardMsg) {
                rewardMsg.style.display = 'block';
                rewardMsg.innerHTML = 'REWARD UNLOCKED:<br><span style="color: #E30613; font-size: 1.2em;">20GB Data</span><br><span style="font-size: 0.8em;">(Valid for 2 hours)</span>';
            }
            restartBtn.innerText = 'PLAY AGAIN';

            // Grant Reward Hook
            this.grantReward(score);
        } else {
            title.innerText = 'CONNECTION LOST';
            title.style.color = '#FF0000';
            if (rewardMsg) rewardMsg.style.display = 'none';
            restartBtn.innerText = 'RECONNECT';
        }

        document.getElementById('final-score').innerText = this.score;
    }

    async grantReward(score) {
        try {
            const response = await fetch('/api/reward/grant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 'player1', // Mock ID
                    rewardId: '20gb_data_2h',
                    score: score
                })
            });
            const data = await response.json();
            console.log('Reward granted:', data);
        } catch (e) {
            console.error('Failed to grant reward:', e);
        }
    }

    update(deltaTime) {
        return false; // Wait for user input (restart button)
    }

    render() {
        // Draw nothing or background, the DOM overlay handles the UI
        // Maybe draw the last frame of the game dimmed?
        // For now just black background
        // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// ============================================
// INITIALIZE GAME
// ============================================

console.log("Setting up window load listener...");

window.addEventListener('load', () => {
    console.log("Window loaded, initializing game...");
    const canvas = document.getElementById('gameCanvas');
    console.log("Canvas element:", canvas);
    const game = new GameStateManager(canvas);
    console.log("GameStateManager created:", game);
});
