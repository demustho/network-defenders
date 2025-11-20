// RoamingRogue.js - Special horizontal enemy
// Based on PRD Phase 7

export class RoamingRogue {
    constructor(game, startX) {
        this.game = game;
        this.x = startX;
        this.y = 80; // Fixed y position
        this.width = 32;
        this.height = 32;
        
        this.name = "Roaming Rogue";
        this.points = 50;
        this.speed = 200; // pixels per second
        this.direction = startX < 0 ? 1 : -1; // 1 = right, -1 = left
        
        this.alive = true;
        this.markedForDeletion = false;
        
        // Animation
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animationSpeed = 100;
        
        // Power-up drop chance
        this.dropChance = 0.2; // 20% chance
        
        // Load image
        this.image = new Image();
        this.image.src = 'assets/roaming_rogue.png';
    }

    update(deltaTime) {
        if (!this.alive) return;

        // Animation
        this.animationTimer += deltaTime;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationFrame = (this.animationFrame + 1) % 3;
            this.animationTimer = 0;
        }

        // Movement
        this.x += this.speed * this.direction * (deltaTime / 1000);

        // Check if off screen
        const gameWidth = this.game.canvas ? this.game.canvas.width : this.game.width;
        if ((this.direction > 0 && this.x > gameWidth + 50) ||
            (this.direction < 0 && this.x < -50)) {
            this.markedForDeletion = true;
        }
    }

    shouldDropPowerUp() {
        return Math.random() < this.dropChance;
    }

    getRandomPowerUpId() {
        const powerUpIds = [
            'speed_booster',
            'data_cannon',
            'shield',
            'wifi_radar',
            'laser_beam',
            'bonus_blast'
        ];
        return powerUpIds[Math.floor(Math.random() * powerUpIds.length)];
    }

    draw(ctx) {
        if (!this.alive) return;

        if (this.image.complete && this.image.naturalWidth > 0) {
            // Flip image if going left
            if (this.direction < 0) {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(this.image, -this.x - this.width, this.y, this.width, this.height);
                ctx.restore();
            } else {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        } else {
            // Fallback - silver circle
            ctx.fillStyle = '#C0C0C0';
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Antenna
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y);
            ctx.lineTo(this.x + this.width / 2, this.y - 10);
            ctx.stroke();
        }

        // Glow effect
        ctx.strokeStyle = '#C0C0C0';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#C0C0C0';
        ctx.shadowBlur = 10;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;

        // Label
        ctx.font = '6px "Press Start 2P"';
        ctx.fillStyle = '#FFD700';
        ctx.textAlign = 'center';
        ctx.fillText('BONUS', this.x + this.width / 2, this.y - 5);
    }
}

