export class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 64; // 64x64 sprite
        this.height = 64;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 20;
        this.speed = 300; // pixels per second
        this.color = '#E30613'; // Ooredoo Red
        this.isShooting = false;
        this.lastShotTime = 0;
        this.shootDelay = 300; // ms

        this.image = new Image();
        // [CHANGED] Use processed image if available (for transparency)
        if (Player.processedImage) {
            this.image = Player.processedImage;
        } else {
            this.image.src = 'assets/sprites/player/ship_idle_01.png';
        }

        // [CHANGED] Hitbox dimensions (smaller than sprite for fairness)
        this.hitbox = {
            width: 32, // 50% of sprite width
            height: 48, // 75% of sprite height
            offsetX: 16, // Center X
            offsetY: 8   // Center Y
        };
    }

    update(deltaTime, input) {
        // Movement
        if (input.left) {
            this.x -= this.speed * (deltaTime / 1000);
        }
        if (input.right) {
            this.x += this.speed * (deltaTime / 1000);
        }

        // Touch/Mouse follow (simplified)
        if (input.x !== null) {
            this.x = input.x - this.width / 2;
        }

        // Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.canvas.width) this.x = this.canvas.width - this.width;
    }

    draw(ctx) {
        if (this.image.complete) {
            // [CHANGED] Draw image directly (no rotation needed as sprite faces up)
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

            // Debug: Draw hitbox
            // ctx.strokeStyle = 'yellow';
            // ctx.strokeRect(this.x + this.hitbox.offsetX, this.y + this.hitbox.offsetY, this.hitbox.width, this.hitbox.height);
        } else {
            // Fallback
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height);
            ctx.lineTo(this.x + this.width / 2, this.y + this.height - 10);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.closePath();
            ctx.fill();
        }
    }

    // [NEW] Helper to get bullet spawn position
    getBulletSpawnPoint() {
        return {
            x: this.x + this.width / 2 - 2, // Center - half bullet width
            y: this.y // Top of the sprite (nose)
        };
    }

    // [NEW] Helper to get hitbox for collision
    getHitbox() {
        return {
            x: this.x + this.hitbox.offsetX,
            y: this.y + this.hitbox.offsetY,
            width: this.hitbox.width,
            height: this.hitbox.height
        };
    }
}
