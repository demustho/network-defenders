// Boss.js - Mega Glitch boss enemy
// Based on PRD Phase 7

export class Boss {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        
        this.name = "Mega Glitch";
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.points = 100;
        this.bonusRedClubPoints = 50;
        
        this.alive = true;
        this.markedForDeletion = false;
        
        // Animation
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animationSpeed = 150;
        
        // Color shifting effect
        this.colorHue = 0;
        
        // Shooting
        this.shootTimer = 0;
        this.shootRate = 2000; // 2 seconds
        
        // Movement
        this.speed = 50;
        this.direction = 1;
        this.moveTimer = 0;
        this.moveInterval = 1000;
        
        // Minion spawning
        this.minionWaveCount = 0;
        this.maxMinionWaves = 2;
        
        // Load image
        this.image = new Image();
        this.image.src = 'assets/mega_glitch.png';
    }

    update(deltaTime) {
        if (!this.alive) return;

        // Animation
        this.animationTimer += deltaTime;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationFrame = (this.animationFrame + 1) % 4;
            this.animationTimer = 0;
        }

        // Color shift
        this.colorHue = (this.colorHue + 2) % 360;

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
        if (!this.canShoot()) return null;
        
        this.shootTimer = 0;
        
        // Boss shoots 3 projectiles in a spread pattern
        const projectiles = [];
        for (let i = -1; i <= 1; i++) {
            const projectile = {
                x: this.x + this.width / 2 - 2 + (i * 15),
                y: this.y + this.height,
                width: 4,
                height: 16,
                speed: 300,
                isEnemy: true,
                color: '#FF0000',
                markedForDeletion: false,
                update: function(deltaTime) {
                    this.y += this.speed * (deltaTime / 1000);
                    if (this.y > 1000) this.markedForDeletion = true;
                },
                draw: function(ctx) {
                    ctx.fillStyle = this.color;
                    ctx.shadowColor = this.color;
                    ctx.shadowBlur = 10;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                    ctx.shadowBlur = 0;
                }
            };
            projectiles.push(projectile);
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
        const hsl = `hsl(${this.colorHue}, 100%, 50%)`;

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
            // Fallback - draw glitchy square
            ctx.fillStyle = hsl;
            ctx.fillRect(this.x + glitchOffset, this.y, this.width, this.height);
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
        ctx.fillText(`${this.health}/${this.maxHealth}`, barX + barWidth / 2, barY + barHeight + 8);
    }
}

