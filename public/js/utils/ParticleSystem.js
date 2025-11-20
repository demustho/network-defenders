// ParticleSystem - Visual effects for explosions and power-ups
// Based on PRD Phase 12

export class Particle {
    constructor(x, y, color, velocity, lifetime) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = velocity.x;
        this.vy = velocity.y;
        this.lifetime = lifetime;
        this.age = 0;
        this.size = Math.random() * 3 + 2;
        this.alpha = 1.0;
    }

    update(deltaTime) {
        this.x += this.vx * (deltaTime / 1000);
        this.y += this.vy * (deltaTime / 1000);
        this.age += deltaTime;
        
        // Fade out over lifetime
        this.alpha = 1.0 - (this.age / this.lifetime);
        
        return this.age < this.lifetime;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

export class ParticleSystem {
    constructor() {
        this.particles = [];
        this.enabled = this.loadSettings();
    }

    loadSettings() {
        const settings = localStorage.getItem('game_settings');
        if (settings) {
            const parsed = JSON.parse(settings);
            return parsed.graphics?.particles !== false;
        }
        return true;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }

    update(deltaTime) {
        if (!this.enabled) {
            this.particles = [];
            return;
        }

        this.particles = this.particles.filter(p => p.update(deltaTime));
    }

    draw(ctx) {
        if (!this.enabled) return;
        this.particles.forEach(p => p.draw(ctx));
    }

    createExplosion(x, y, color, count = 20) {
        if (!this.enabled) return;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 50 + Math.random() * 100;
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            const lifetime = 300 + Math.random() * 200;
            
            this.particles.push(new Particle(x, y, color, velocity, lifetime));
        }
    }

    createPowerUpEffect(x, y, color) {
        if (!this.enabled) return;

        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 30 + Math.random() * 70;
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            const lifetime = 500 + Math.random() * 300;
            
            this.particles.push(new Particle(x, y, color, velocity, lifetime));
        }
    }

    createTrail(x, y, color) {
        if (!this.enabled) return;

        if (Math.random() < 0.3) {
            const velocity = {
                x: (Math.random() - 0.5) * 20,
                y: Math.random() * 30 + 10
            };
            const lifetime = 200 + Math.random() * 100;
            
            this.particles.push(new Particle(x, y, color, velocity, lifetime));
        }
    }

    clear() {
        this.particles = [];
    }
}

