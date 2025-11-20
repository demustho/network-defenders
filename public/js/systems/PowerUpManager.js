// PowerUpManager - Manages power-up tokens and activation
// Based on PRD pages 259-314

export const POWERUP_TYPES = {
    SPEED_BOOSTER: {
        id: 'speed_booster',
        name: 'Super Speed Booster',
        description: 'Rapid fire mode - 10 shots/sec',
        duration: 5000, // 5 seconds
        color: '#00F0FF',
        icon: '⚡',
        effect: 'rapid_fire',
        fireRate: 100 // ms between shots (10 shots/sec)
    },
    DATA_CANNON: {
        id: 'data_cannon',
        name: 'Mega Data Cannon',
        description: 'Area blast - 3x3 grid explosion',
        duration: 0, // Instant use
        color: '#E30613',
        icon: '💥',
        effect: 'area_blast',
        blastRadius: 100
    },
    SHIELD: {
        id: 'shield',
        name: 'Coverage Shield',
        description: 'Absorbs 3 hits or lasts 10s',
        duration: 10000, // 10 seconds
        color: '#B026FF',
        icon: '🛡️',
        effect: 'shield',
        hits: 3
    },
    WIFI_RADAR: {
        id: 'wifi_radar',
        name: 'WiFi Radar',
        description: 'Slows enemies 50% for 8s',
        duration: 8000, // 8 seconds
        color: '#39FF14',
        icon: '📡',
        effect: 'slow_enemies',
        slowFactor: 0.5
    },
    LASER_BEAM: {
        id: 'laser_beam',
        name: '5G Laser Beam',
        description: 'Continuous vertical beam for 3s',
        duration: 3000, // 3 seconds
        color: '#B026FF',
        icon: '⚡',
        effect: 'laser_beam',
        damage: 10
    },
    BONUS_BLAST: {
        id: 'bonus_blast',
        name: 'Bill Pay Bonus Blast',
        description: 'Smart bomb - clears projectiles, damages enemies',
        duration: 0, // Instant
        color: '#FFD700',
        icon: '✨',
        effect: 'smart_bomb',
        damagePerce: 0.3 // 30% damage to all enemies
    }
};

export class PowerUpManager {
    constructor() {
        this.tokens = this.loadTokens();
        this.activePowerUps = [];
        this.maxTokensPerType = 50;
        this.loadout = []; // Selected power-ups for current game (max 2-3)
        this.maxLoadoutSlots = 2; // Increases to 3 at Colonel+ rank
    }

    loadTokens() {
        const saved = localStorage.getItem('powerup_tokens');
        if (saved) {
            return JSON.parse(saved);
        }
        // Default tokens - give player some to start
        return {
            speed_booster: 5,
            data_cannon: 3,
            shield: 2,
            wifi_radar: 3,
            laser_beam: 1,
            bonus_blast: 2
        };
    }

    saveTokens() {
        localStorage.setItem('powerup_tokens', JSON.stringify(this.tokens));
    }

    getTokenCount(powerUpId) {
        return this.tokens[powerUpId] || 0;
    }

    hasToken(powerUpId) {
        return this.getTokenCount(powerUpId) > 0;
    }

    addTokens(powerUpId, amount) {
        if (!this.tokens[powerUpId]) {
            this.tokens[powerUpId] = 0;
        }
        this.tokens[powerUpId] = Math.min(
            this.tokens[powerUpId] + amount,
            this.maxTokensPerType
        );
        this.saveTokens();
    }

    useToken(powerUpId) {
        if (this.hasToken(powerUpId)) {
            this.tokens[powerUpId]--;
            this.saveTokens();
            return true;
        }
        return false;
    }

    // Loadout management
    addToLoadout(powerUpId) {
        if (this.loadout.length >= this.maxLoadoutSlots) {
            return false;
        }
        if (!this.loadout.includes(powerUpId)) {
            this.loadout.push(powerUpId);
            return true;
        }
        return false;
    }

    removeFromLoadout(powerUpId) {
        const index = this.loadout.indexOf(powerUpId);
        if (index > -1) {
            this.loadout.splice(index, 1);
            return true;
        }
        return false;
    }

    clearLoadout() {
        this.loadout = [];
    }

    // Active power-up management (during gameplay)
    activatePowerUp(powerUpId, game) {
        const powerUpConfig = Object.values(POWERUP_TYPES).find(p => p.id === powerUpId);
        if (!powerUpConfig) return false;

        const activePowerUp = {
            ...powerUpConfig,
            startTime: performance.now(),
            active: true
        };

        // Apply instant effects
        switch (powerUpConfig.effect) {
            case 'area_blast':
                this.applyAreaBlast(game, powerUpConfig);
                return true; // Instant, don't add to active list

            case 'smart_bomb':
                this.applySmartBomb(game, powerUpConfig);
                return true; // Instant, don't add to active list

            default:
                // Duration-based effects
                this.activePowerUps.push(activePowerUp);
                return true;
        }
    }

    update(deltaTime, game) {
        // Update active power-ups
        this.activePowerUps = this.activePowerUps.filter(powerUp => {
            const elapsed = performance.now() - powerUp.startTime;
            
            if (elapsed >= powerUp.duration) {
                // Power-up expired
                this.onPowerUpExpire(powerUp, game);
                return false;
            }

            // Apply continuous effects
            this.applyContinuousEffect(powerUp, game, deltaTime);
            return true;
        });
    }

    applyContinuousEffect(powerUp, game, deltaTime) {
        switch (powerUp.effect) {
            case 'laser_beam':
                // Draw laser and damage enemies in path
                this.applyLaserBeam(game);
                break;

            case 'shield':
                // Shield is passive, checked during collision
                break;

            case 'slow_enemies':
                // Slow effect applied in enemy update
                break;

            case 'rapid_fire':
                // Fire rate increased, handled in player shoot logic
                break;
        }
    }

    applyAreaBlast(game, powerUpConfig) {
        // Fire explosive projectile from player
        if (!game.player) return;

        const blastProjectile = {
            x: game.player.x + game.player.width / 2 - 10,
            y: game.player.y,
            width: 20,
            height: 20,
            speed: 400,
            isEnemy: false,
            isBlast: true,
            blastRadius: powerUpConfig.blastRadius,
            color: powerUpConfig.color,
            markedForDeletion: false,
            update: function(deltaTime) {
                this.y -= this.speed * (deltaTime / 1000);
                if (this.y < -50) this.markedForDeletion = true;
            },
            draw: function(ctx) {
                // Draw blast projectile
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            },
            explode: function(game) {
                // Damage all enemies within blast radius
                game.enemyFormation.enemies.forEach(enemy => {
                    const dx = enemy.x - this.x;
                    const dy = enemy.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance <= this.blastRadius) {
                        enemy.markedForDeletion = true;
                        game.score += enemy.type.points;
                        game.shotsHit++;
                    }
                });
                
                // Visual explosion effect
                this.markedForDeletion = true;
            }
        };

        game.projectiles.push(blastProjectile);
    }

    applySmartBomb(game, powerUpConfig) {
        // Clear all enemy projectiles
        game.projectiles = game.projectiles.filter(p => !p.isEnemy);

        // Damage all enemies by 30%
        game.enemyFormation.enemies.forEach(enemy => {
            // Since enemies have 1 HP, 30% damage = instant kill for most
            // For boss (10 HP), would reduce HP by 3
            if (enemy.health !== undefined && enemy.health > 1) {
                enemy.health = Math.max(0, enemy.health - Math.ceil(enemy.health * powerUpConfig.damagePercent));
                if (enemy.health <= 0) {
                    enemy.markedForDeletion = true;
                    game.score += enemy.type.points;
                }
            } else {
                // Regular enemies - instant kill
                enemy.markedForDeletion = true;
                game.score += enemy.type.points;
                game.shotsHit++;
            }
        });

        // Screen flash effect
        if (game.ctx) {
            game.ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
            game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
        }
    }

    applyLaserBeam(game) {
        if (!game.player) return;

        // Draw vertical laser beam
        const laserX = game.player.x + game.player.width / 2;
        const laserWidth = 10;

        // Damage all enemies in beam path
        game.enemyFormation.enemies.forEach(enemy => {
            if (enemy.x < laserX + laserWidth && enemy.x + enemy.width > laserX) {
                enemy.markedForDeletion = true;
                game.score += enemy.type.points;
                game.shotsHit++;
            }
        });
    }

    onPowerUpExpire(powerUp, game) {
        // Handle cleanup when power-up expires
        console.log(`Power-up expired: ${powerUp.name}`);
    }

    isActive(effect) {
        return this.activePowerUps.some(p => p.effect === effect);
    }

    getActivePowerUp(effect) {
        return this.activePowerUps.find(p => p.effect === effect);
    }

    hasShield() {
        return this.isActive('shield');
    }

    consumeShieldHit() {
        const shield = this.getActivePowerUp('shield');
        if (shield) {
            shield.hits--;
            if (shield.hits <= 0) {
                // Remove shield
                const index = this.activePowerUps.indexOf(shield);
                if (index > -1) {
                    this.activePowerUps.splice(index, 1);
                }
            }
            return true;
        }
        return false;
    }

    getRapidFireDelay() {
        if (this.isActive('rapid_fire')) {
            return POWERUP_TYPES.SPEED_BOOSTER.fireRate;
        }
        return 300; // Normal fire rate
    }

    getEnemySlowFactor() {
        if (this.isActive('slow_enemies')) {
            return POWERUP_TYPES.WIFI_RADAR.slowFactor;
        }
        return 1.0; // Normal speed
    }

    // Mock functions to simulate earning tokens from Ooredoo features
    grantTokensForSpeedTest() {
        this.addTokens('speed_booster', 3);
        console.log('Granted 3 Speed Booster tokens for completing Speed Test');
    }

    grantTokensForDataRenewal() {
        this.addTokens('data_cannon', 2);
        console.log('Granted 2 Data Cannon tokens for renewing data pack');
    }

    grantTokensForLoginStreak() {
        this.addTokens('shield', 1);
        console.log('Granted 1 Shield token for 3-day login streak');
    }

    grantTokensForWiFiMap() {
        this.addTokens('wifi_radar', 3);
        console.log('Granted 3 WiFi Radar tokens for checking WiFi map');
    }

    grantTokensFor5GMap() {
        this.addTokens('laser_beam', 1);
        console.log('Granted 1 5G Laser token for viewing 5G map');
    }

    grantTokensForBillPay() {
        this.addTokens('bonus_blast', 1);
        console.log('Granted 1 Bonus Blast token for paying bill');
    }

    render(ctx, canvas) {
        // Render active power-up indicators
        const startX = 10;
        const startY = 60;
        const spacing = 40;

        this.activePowerUps.forEach((powerUp, index) => {
            const x = startX;
            const y = startY + (index * spacing);
            
            // Background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(x, y, 150, 30);
            
            // Icon
            ctx.font = '16px Arial';
            ctx.fillText(powerUp.icon, x + 5, y + 20);
            
            // Time remaining
            const elapsed = performance.now() - powerUp.startTime;
            const remaining = Math.ceil((powerUp.duration - elapsed) / 1000);
            
            ctx.fillStyle = powerUp.color;
            ctx.font = '12px "Press Start 2P"';
            ctx.fillText(`${remaining}s`, x + 30, y + 18);
            
            // Progress bar
            const progress = 1 - (elapsed / powerUp.duration);
            ctx.fillStyle = powerUp.color;
            ctx.fillRect(x + 70, y + 8, 75 * progress, 15);
            
            ctx.strokeStyle = '#FFFFFF';
            ctx.strokeRect(x + 70, y + 8, 75, 15);
        });
    }
}

