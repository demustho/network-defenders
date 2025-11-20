import { Projectile } from './Projectile.js';

export const ENEMY_TYPES = {
    LAGMITE: {
        name: "Lagmite",
        row: 1,
        width: 24, height: 24,
        color: "#B026FF",
        points: 40,
        health: 1,
        speed: 1.0,
        shootRate: 3000,
        shootProbability: 0.1,
        projectileColor: "#B026FF",
        projectileSpeed: 240,
        animationFrames: 2,
        animationSpeed: 250,
        imageSrc: 'assets/lagmite.png'
    },
    SPAMEROID: {
        name: "Spameroid",
        row: 2,
        width: 24, height: 24,
        color: "#FFD700",
        points: 30,
        health: 1,
        speed: 1.0,
        shootRate: 2500,
        shootProbability: 0.12,
        projectileColor: "#FFA500",
        projectileSpeed: 240,
        animationFrames: 2,
        animationSpeed: 200,
        specialMovement: "wobble",
        wobbleAmount: 2,
        imageSrc: 'assets/spameroid.png'
    },
    BUFFER_BEAST: {
        name: "Buffer Beast",
        row: 3,
        width: 24, height: 24,
        color: "#00F0FF",
        points: 20,
        health: 1,
        speed: 1.0,
        shootRate: 2000,
        shootProbability: 0.15,
        projectileColor: "#00F0FF",
        projectileSpeed: 240,
        animationFrames: 2,
        animationSpeed: 300,
        specialBehavior: "pause",
        pauseInterval: 5000,
        pauseDuration: 500,
        imageSrc: 'assets/buffer_beast.png'
    },
    DROPCALL_DRONE: {
        name: "DropCall Drone",
        row: 4,
        width: 24, height: 24,
        color: "#39FF14",
        points: 10,
        health: 1,
        speed: 1.0,
        shootRate: 1000,
        shootProbability: 0.3,
        projectileColor: "#39FF14",
        projectileSpeed: 300,
        animationFrames: 2,
        animationSpeed: 150,
        specialTrait: "aggressive_shooter",
        imageSrc: 'assets/dropcall_drone.png'
    },
    ROAMING_ROGUE: {
        name: "Roaming Rogue",
        type: "bonus",
        width: 32, height: 32,
        color: "#C0C0C0",
        points: 50,
        health: 1,
        speed: 200,
        shootRate: null,
        animationFrames: 3, // Assuming 3 frames generated or just cycle
        animationSpeed: 100,
        imageSrc: 'assets/roaming_rogue.png'
    },
    MEGA_GLITCH: {
        name: "Mega Glitch",
        type: "boss",
        width: 64, height: 64,
        color: "#FF0000",
        points: 100,
        health: 10,
        speed: 50,
        shootRate: 2000,
        animationFrames: 4,
        animationSpeed: 150,
        imageSrc: 'assets/mega_glitch.png'
    }
};

export class Enemy {
    constructor(game, x, y, typeConfig) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = typeConfig;

        this.width = this.type.width;
        this.height = this.type.height;

        this.alive = true;
        this.markedForDeletion = false;

        this.animationFrame = 0;
        this.animationTimer = 0;
        this.shootTimer = Math.random() * this.type.shootRate; // Randomize start

        this.paused = false;
        this.pauseTimer = 0;

        if (this.type.processedImage) {
            console.log(`Enemy ${this.type.name} using processed image`);
            this.image = this.type.processedImage;
        } else {
            console.log(`Enemy ${this.type.name} using RAW image`);
            this.image.src = this.type.imageSrc;
        }
    }

    update(deltaTime) {
        if (!this.alive || this.paused) return;

        // Animation
        this.animationTimer += deltaTime;
        if (this.animationTimer >= this.type.animationSpeed) {
            this.animationFrame = (this.animationFrame + 1) % this.type.animationFrames;
            this.animationTimer = 0;
        }

        // Special Behaviors
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

        // Shooting (Handled by Formation usually, but individual logic here for now if needed)
        // We'll let the Formation/Game loop handle shooting to control frequency better, 
        // or implement a simple timer here.
        // The guide suggests `shootRandomEnemy` in Formation, but individual `shoot` method is useful.
        this.shootTimer += deltaTime;
    }

    shoot() {
        // Reset timer
        this.shootTimer = 0;

        // Create projectile
        // We need to pass the projectile back to the game or add it to a list.
        // Since we don't have direct access to the game's projectile list here easily without passing it,
        // we'll return the projectile object and let the caller handle it.

        return new Projectile(
            this.x + this.width / 2 - 2,
            this.y + this.height,
            true, // isEnemy
            this.type.projectileColor,
            this.type.projectileSpeed
        );
    }

    draw(ctx) {
        if (!this.alive) return;

        if (this.image.complete && this.image.naturalWidth > 0) {
            // Assuming sprite sheet or single image. 
            // If single image, we might not have frames yet.
            // If we generated single images, we can't do animation frames unless we simulate it 
            // (e.g. wobble or scale) or if we generated a sprite sheet.
            // Since we generated single images, we'll just draw the image.
            // To support "animation", we might flip it or move it slightly.

            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

            // Visual debug for "animation" if single frame
            if (this.type.animationFrames > 1) {
                // Maybe bob up and down slightly based on frame?
                // ctx.drawImage(this.image, this.x, this.y + (this.animationFrame % 2) * 2, this.width, this.height);
            }
        } else {
            // Fallback
            ctx.fillStyle = this.type.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
