import { Enemy, ENEMY_TYPES } from './Enemy.js';

export class EnemyFormation {
    constructor(game) {
        this.game = game;
        this.enemies = [];
        this.direction = 1; // 1 = right, -1 = left
        this.baseSpeed = 50; // Pixels per second (horizontal)
        this.descending = false;
        this.descentAmount = 20; // Pixels per descent
        this.descentSpeed = 100; // Pixels per second (vertical)
        this.isDescending = false;
        this.targetY = 0;
        this.descentCooldown = 0; // Prevent rapid descent

        this.spawnFormation();
    }

    spawnFormation() {
        this.enemies = [];
        // Create 4 rows × 9 columns
        // Row 1: Lagmites
        // Row 2: Spameroids
        // Row 3: Buffer Beasts
        // Row 4: DropCall Drones

        const rows = [
            ENEMY_TYPES.LAGMITE,
            ENEMY_TYPES.SPAMEROID,
            ENEMY_TYPES.BUFFER_BEAST,
            ENEMY_TYPES.DROPCALL_DRONE
        ];

        const startX = 50;
        const startY = 50;
        const spacingX = 40;
        const spacingY = 40;

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 9; col++) {
                const enemyType = rows[row];
                const x = startX + col * spacingX;
                const y = startY + row * spacingY;

                const enemy = new Enemy(this.game, x, y, enemyType);
                this.enemies.push(enemy);
            }
        }
    }

    update(deltaTime) {
        // Filter out dead enemies
        this.enemies = this.enemies.filter(e => !e.markedForDeletion);

        if (this.enemies.length === 0) {
            this.spawnFormation();
            return;
        }

        // Calculate tick rate based on remaining enemies
        // Fewer enemies = faster ticks
        // Base interval: 1000ms (1 sec) -> Min interval: 100ms
        const aliveCount = this.enemies.length;
        const maxInterval = 1000;
        const minInterval = 100;
        const interval = minInterval + (maxInterval - minInterval) * (aliveCount / 36);

        this.moveTimer = (this.moveTimer || 0) + deltaTime;

        if (this.moveTimer >= interval) {
            this.moveTimer = 0;
            this.step();
        }

        // Update animations/timers for individual enemies (e.g. wobble, shoot timers)
        this.enemies.forEach(enemy => enemy.update(deltaTime));

        // Check Game Over
        const gameHeight = this.game.canvas ? this.game.canvas.height : this.game.height;
        let bottommost = 0;
        this.enemies.forEach(enemy => {
            if (enemy.y > bottommost) bottommost = enemy.y;
        });

        if (bottommost >= gameHeight - 80) {
            this.game.gameOver();
        }
    }

    step() {
        const gameWidth = this.game.canvas ? this.game.canvas.width : this.game.width;
        const stepSizeX = 10; // Horizontal step size
        const stepSizeY = 20; // Vertical step size

        let hitEdge = false;
        let rightmost = 0;
        let leftmost = gameWidth;

        this.enemies.forEach(enemy => {
            if (enemy.x > rightmost) rightmost = enemy.x;
            if (enemy.x < leftmost) leftmost = enemy.x;
        });

        if (this.direction > 0 && rightmost + 24 + stepSizeX > gameWidth - 20) {
            hitEdge = true;
        } else if (this.direction < 0 && leftmost - stepSizeX < 20) {
            hitEdge = true;
        }

        if (hitEdge) {
            // Move down and reverse direction
            this.direction *= -1;
            this.enemies.forEach(e => e.y += stepSizeY);
        } else {
            // Move horizontally
            this.enemies.forEach(e => e.x += stepSizeX * this.direction);
        }

        // Play step sound if available
        // this.game.audioManager.playStep(); 
    }

    draw(ctx) {
        this.enemies.forEach(enemy => enemy.draw(ctx));
    }

    // Shooting Logic
    shoot() {
        // Pick a random enemy to shoot
        // Prefer bottom enemies?
        // The guide says:
        // "Weight: 30% chance for bottom row, 70% for others"
        // Actually guide says: "Bottom row enemies (DropCall Drones) are 3x more likely to shoot"

        // Simple implementation: Pick random, if it can shoot
        if (this.enemies.length === 0) return null;

        const shooterIndex = Math.floor(Math.random() * this.enemies.length);
        const shooter = this.enemies[shooterIndex];

        return shooter.shoot();
    }
}
