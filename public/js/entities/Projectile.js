export class Projectile {
    constructor(x, y, isEnemy = false, color = '#fff', speed = 500) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 16; // 2x scale
        this.speed = speed;
        this.color = color;
        this.markedForDeletion = false;
        this.isEnemy = isEnemy;

        this.image = new Image();
        this.image.src = isEnemy ? 'assets/projectile_enemy_v2.png' : 'assets/projectile_player.png';
    }

    update(deltaTime, canvasHeight = 1000) {
        if (this.isEnemy) {
            this.y += this.speed * (deltaTime / 1000);
        } else {
            this.y -= this.speed * (deltaTime / 1000);
        }

        if (this.y + this.height < 0 || this.y > canvasHeight) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
