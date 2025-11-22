// Boss.js - Mega Glitch boss enemy
// Based on PRD Phase 7

export class Boss {
    constructor(game, x, y) {
        this.game = game;
        // Boss spawns from above the screen
        this.width = 200; // Much larger than regular enemies
        this.height = 200;
        this.x = x || (game.canvas ? game.canvas.width / 2 - this.width / 2 : game.width / 2 - this.width / 2);
        this.y = y || -this.height; // Start above screen

        this.name = "Internet Trouble Monster";
        this.maxHealth = 50; // Much more health for epic battle
        this.health = this.maxHealth;
        this.points = 500; // Big reward for defeating boss
        this.bonusRedClubPoints = 200;

        this.alive = true;
        this.markedForDeletion = false;

        // Entry animation
        this.hasEntered = false;
        this.entrySpeed = 80;
        this.targetY = 50; // Stop near top of screen

        // Animation
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animationSpeed = 150;

        // Color shifting effect
        this.colorHue = 0;

        // Shooting
        this.shootTimer = 0;
        this.shootRate = 1500; // 1.5 seconds between attacks
        this.attackPattern = 0; // Cycle through different patterns

        // Movement
        this.speed = 60;
        this.direction = 1;
        this.moveTimer = 0;
        this.moveInterval = 1000;

        // Minion spawning
        this.minionWaveCount = 0;
        this.maxMinionWaves = 2;

        // Visual effects
        this.pulseScale = 1;

        // Load image
        this.image = new Image();
        this.image.src = 'assets/mega_glitch.png';
    }

    update(deltaTime) {
        if (!this.alive) return;

        // Entry animation - descend from above
        if (!this.hasEntered) {
            this.y += this.entrySpeed * (deltaTime / 1000);
            if (this.y >= this.targetY) {
                this.y = this.targetY;
                this.hasEntered = true;
            }
            // Don't do other updates during entry
            return;
        }

        // Animation
        this.animationTimer += deltaTime;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationFrame = (this.animationFrame + 1) % 4;
            this.animationTimer = 0;
        }

        // Color shift
        this.colorHue = (this.colorHue + 2) % 360;

        // Pulse animation
        this.pulseScale = 1 + Math.sin(Date.now() * 0.003) * 0.05;

        // Movement
        this.moveTimer += deltaTime;
        if (this.moveTimer >= this.moveInterval) {
            this.x += this.speed * this.direction;

            // Bounce off edges
            const gameWidth = this.game.canvas ? this.game.canvas.width : this.game.width;
            if (this.x <= 20 || this.x + this.width >= gameWidth - 20) {
                this.direction *= -1;
            }

            this.moveTimer = 0;
        }

        // Shooting
        this.shootTimer += deltaTime;
    }

    canShoot() {
        return this.shootTimer >= this.shootRate;
    }

    shoot() {
        if (!this.canShoot() || !this.hasEntered) return null;

        this.shootTimer = 0;

        // Cycle through attack patterns
        this.attackPattern = (this.attackPattern + 1) % 3;

        const projectiles = [];

        switch (this.attackPattern) {
            case 0: // Spread shot (5 projectiles in a fan)
                for (let i = -2; i <= 2; i++) {
                    projectiles.push({
                        x: this.x + this.width / 2 - 2,
                        y: this.y + this.height,
                        width: 6,
                        height: 16,
                        speed: 250,
                        angle: i * 0.4, // Spread angle
                        isEnemy: true,
                        color: '#FF0000',
                        markedForDeletion: false,
                        update: function (deltaTime) {
                            this.y += this.speed * Math.cos(this.angle) * (deltaTime / 1000);
                            this.x += this.speed * Math.sin(this.angle) * (deltaTime / 1000);
                            if (this.y > 1000 || this.x < -50 || this.x > 1000) this.markedForDeletion = true;
                        },
                        draw: function (ctx) {
                            ctx.fillStyle = this.color;
                            ctx.shadowColor = this.color;
                            ctx.shadowBlur = 10;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            ctx.shadowBlur = 0;
                        }
                    });
                }
                break;

            case 1: // Triple shot straight down
                for (let i = 0; i < 3; i++) {
                    projectiles.push({
                        x: this.x + this.width * (0.25 + i * 0.25) - 2,
                        y: this.y + this.height,
                        width: 6,
                        height: 16,
                        speed: 300,
                        angle: 0,
                        isEnemy: true,
                        color: '#FF0000',
                        markedForDeletion: false,
                        update: function (deltaTime) {
                            this.y += this.speed * (deltaTime / 1000);
                            if (this.y > 1000) this.markedForDeletion = true;
                        },
                        draw: function (ctx) {
                            ctx.fillStyle = this.color;
                            ctx.shadowColor = this.color;
                            ctx.shadowBlur = 10;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            ctx.shadowBlur = 0;
                        }
                    });
                }
                break;

            case 2: // Side shots + center
                // Left angled
                projectiles.push({
                    x: this.x + 20,
                    y: this.y + this.height / 2,
                    width: 6,
                    height: 16,
                    speed: 250,
                    angle: -0.6,
                    isEnemy: true,
                    color: '#FF0000',
                    markedForDeletion: false,
                    update: function (deltaTime) {
                        this.y += this.speed * Math.cos(this.angle) * (deltaTime / 1000);
                        this.x += this.speed * Math.sin(this.angle) * (deltaTime / 1000);
                        if (this.y > 1000 || this.x < -50 || this.x > 1000) this.markedForDeletion = true;
                    },
                    draw: function (ctx) {
                        ctx.fillStyle = this.color;
                        ctx.shadowColor = this.color;
                        ctx.shadowBlur = 10;
                        ctx.fillRect(this.x, this.y, this.width, this.height);
                        ctx.shadowBlur = 0;
                    }
                });
                // Right angled
                projectiles.push({
                    x: this.x + this.width - 20,
                    y: this.y + this.height / 2,
                    width: 6,
                    height: 16,
                    speed: 250,
                    angle: 0.6,
                    isEnemy: true,
                    color: '#FF0000',
                    markedForDeletion: false,
                    update: function (deltaTime) {
                        this.y += this.speed * Math.cos(this.angle) * (deltaTime / 1000);
                        this.x += this.speed * Math.sin(this.angle) * (deltaTime / 1000);
                        if (this.y > 1000 || this.x < -50 || this.x > 1000) this.markedForDeletion = true;
                    },
                    draw: function (ctx) {
                        ctx.fillStyle = this.color;
                        ctx.shadowColor = this.color;
                        ctx.shadowBlur = 10;
                        ctx.fillRect(this.x, this.y, this.width, this.height);
                        ctx.shadowBlur = 0;
                    }
                });
                // Center straight
                projectiles.push({
                    x: this.x + this.width / 2 - 3,
                    y: this.y + this.height,
                    width: 6,
                    height: 16,
                    speed: 300,
                    angle: 0,
                    isEnemy: true,
                    color: '#FF0000',
                    markedForDeletion: false,
                    update: function (deltaTime) {
                        this.y += this.speed * (deltaTime / 1000);
                        if (this.y > 1000) this.markedForDeletion = true;
                    },
                    draw: function (ctx) {
                        ctx.fillStyle = this.color;
                        ctx.shadowColor = this.color;
                        ctx.shadowBlur = 10;
                        ctx.fillRect(this.x, this.y, this.width, this.height);
                        ctx.shadowBlur = 0;
                    }
                });
                break;
        }

        return projectiles;
    }

    takeDamage(amount = 1) {
        this.health -= amount;

        // Spawn minions at 66% and 33% health
        if (this.health <= this.maxHealth * 0.66 && this.minionWaveCount === 0) {
            this.minionWaveCount++;
            return 'spawn_minions';
        }
        if (this.health <= this.maxHealth * 0.33 && this.minionWaveCount === 1) {
            this.minionWaveCount++;
            return 'spawn_minions';
        }

        if (this.health <= 0) {
            this.alive = false;
            this.markedForDeletion = true;
            return 'defeated';
        }

        return 'hit';
    }

    draw(ctx) {
        if (!this.alive) return;

        // Glitching effect
        const glitchOffset = Math.random() < 0.1 ? (Math.random() - 0.5) * 4 : 0;

        // Color shifting
        const hsl = `hsl(${this.colorHue}, 100 %, 50 %)`;

        if (this.image.complete && this.image.naturalWidth > 0) {
            // Apply color filter effect
            ctx.save();
            ctx.globalAlpha = 0.8;
            ctx.filter = `hue-rotate(${this.colorHue}deg)`;
            ctx.drawImage(this.image, this.x + glitchOffset, this.y, this.width, this.height);
            ctx.filter = 'none';
            ctx.globalAlpha = 1.0;
            ctx.restore();
        } else {
            // Fallback: Draw without white background - just outline and effects
            // Don't fill with white, just draw the outline
            ctx.strokeStyle = hsl;
            ctx.lineWidth = 4;
            ctx.strokeRect(this.x + glitchOffset, this.y, this.width, this.height);

            // Draw some visual elements to show it's a boss
            // Menacing eyes
            ctx.fillStyle = '#FF0000';
            const eyeY = this.y + this.height * 0.3;
            const eyeSize = 15;
            ctx.fillRect(this.x + this.width * 0.3 - eyeSize / 2, eyeY, eyeSize, eyeSize);
            ctx.fillRect(this.x + this.width * 0.7 - eyeSize / 2, eyeY, eyeSize, eyeSize);

            // Glitch lines
            ctx.strokeStyle = hsl;
            ctx.lineWidth = 2;
            for (let i = 0; i < 5; i++) {
                const lineY = this.y + (this.height / 6) * (i + 1);
                ctx.beginPath();
                ctx.moveTo(this.x, lineY);
                ctx.lineTo(this.x + this.width, lineY);
                ctx.stroke();
            }
        }

        // Draw health bar
        this.drawHealthBar(ctx);

        // Glow effect
        ctx.strokeStyle = hsl;
        ctx.lineWidth = 2;
        ctx.shadowColor = hsl;
        ctx.shadowBlur = 15;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;

        // Boss label
        ctx.font = '8px "Press Start 2P"';
        ctx.fillStyle = '#FF0000';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 10;
        ctx.fillText('BOSS', this.x + this.width / 2, this.y - 10);
        ctx.shadowBlur = 0;
    }

    drawHealthBar(ctx) {
        const barWidth = this.width;
        const barHeight = 6;
        const barX = this.x;
        const barY = this.y - 20;

        // Background
        ctx.fillStyle = '#000000';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Health
        const healthPercent = this.health / this.maxHealth;
        const healthWidth = barWidth * healthPercent;

        // Color based on health
        let healthColor;
        if (healthPercent > 0.66) {
            healthColor = '#00FF00';
        } else if (healthPercent > 0.33) {
            healthColor = '#FFA500';
        } else {
            healthColor = '#FF0000';
        }

        ctx.fillStyle = healthColor;
        ctx.fillRect(barX, barY, healthWidth, barHeight);

        // Border
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);

        // Health text
        ctx.font = '6px "Press Start 2P"';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(`${this.health} /${this.maxHealth}`, barX + barWidth / 2, barY + barHeight + 8);
    }
}

