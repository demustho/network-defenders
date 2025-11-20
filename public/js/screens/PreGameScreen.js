// PreGameScreen - Power-up loadout selection before gameplay
// Based on PRD Phase 3

import { POWERUP_TYPES } from '../systems/PowerUpManager.js';

export class PreGameScreen {
    constructor(ctx, canvas, powerUpManager, progressionManager) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.powerUpManager = powerUpManager;
        this.progressionManager = progressionManager;
        this.selectedPowerUps = [];
        this.hoveredPowerUp = null;
        this.done = false;
        
        // UI Layout
        this.powerUpButtons = [];
        this.startButton = null;
        this.setupUI();
        
        // Background stars
        this.stars = [];
        for (let i = 0; i < 30; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                brightness: Math.random()
            });
        }
    }

    setupUI() {
        const centerX = this.canvas.width / 2;
        const startY = 150;
        const buttonWidth = 150;
        const buttonHeight = 60;
        const spacing = 20;
        
        // Create power-up selection buttons (2 columns, 3 rows)
        let col = 0;
        let row = 0;
        Object.values(POWERUP_TYPES).forEach((powerUp, index) => {
            const x = centerX - buttonWidth - spacing/2 + (col * (buttonWidth + spacing));
            const y = startY + (row * (buttonHeight + spacing));
            
            this.powerUpButtons.push({
                x, y,
                width: buttonWidth,
                height: buttonHeight,
                powerUp: powerUp,
                selected: false
            });
            
            col++;
            if (col >= 2) {
                col = 0;
                row++;
            }
        });
        
        // Start button
        this.startButton = {
            x: centerX - 100,
            y: this.canvas.height - 100,
            width: 200,
            height: 50,
            text: 'DEFEND NETWORK'
        };
    }

    start() {
        this.done = false;
        this.selectedPowerUps = [];
        this.powerUpManager.clearLoadout();
        
        // Reset button selection states
        this.powerUpButtons.forEach(btn => btn.selected = false);
    }

    handleClick(x, y) {
        // Check power-up buttons
        this.powerUpButtons.forEach(button => {
            if (this.isPointInRect(x, y, button)) {
                const hasToken = this.powerUpManager.hasToken(button.powerUp.id);
                
                if (button.selected) {
                    // Deselect
                    button.selected = false;
                    this.powerUpManager.removeFromLoadout(button.powerUp.id);
                } else if (hasToken && this.selectedPowerUps.length < this.powerUpManager.maxLoadoutSlots) {
                    // Select if has tokens and not at max
                    button.selected = true;
                    this.powerUpManager.addToLoadout(button.powerUp.id);
                    this.selectedPowerUps.push(button.powerUp.id);
                }
            }
        });
        
        // Check start button
        if (this.isPointInRect(x, y, this.startButton)) {
            this.done = true;
        }
    }

    isPointInRect(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.width &&
               y >= rect.y && y <= rect.y + rect.height;
    }

    update(deltaTime) {
        if (this.done) return true;
        
        // Update star animation
        this.stars.forEach(star => {
            star.brightness = (Math.sin(Date.now() * 0.001 + star.x) + 1) / 2;
        });
        
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
        
        // Title
        this.ctx.font = '24px "Press Start 2P"';
        this.ctx.fillStyle = '#E30613';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = '#E30613';
        this.ctx.shadowBlur = 20;
        this.ctx.fillText('SELECT POWER-UPS', this.canvas.width / 2, 80);
        this.ctx.shadowBlur = 0;
        
        // Instruction
        this.ctx.font = '10px "Press Start 2P"';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(`Choose up to ${this.powerUpManager.maxLoadoutSlots}`, this.canvas.width / 2, 110);
        
        // Player stats (top right)
        if (this.progressionManager) {
            const rank = this.progressionManager.getCurrentRank();
            this.ctx.font = '8px "Press Start 2P"';
            this.ctx.textAlign = 'right';
            this.ctx.fillStyle = '#00F0FF';
            this.ctx.fillText(rank.name, this.canvas.width - 10, 20);
        }
        
        // Render power-up buttons
        this.powerUpButtons.forEach(button => {
            const hasToken = this.powerUpManager.hasToken(button.powerUp.id);
            const tokenCount = this.powerUpManager.getTokenCount(button.powerUp.id);
            
            // Button background
            if (button.selected) {
                this.ctx.fillStyle = 'rgba(227, 6, 19, 0.8)';
                this.ctx.strokeStyle = '#FFFFFF';
            } else if (!hasToken) {
                this.ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
                this.ctx.strokeStyle = '#666666';
            } else {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                this.ctx.strokeStyle = button.powerUp.color;
            }
            
            this.ctx.fillRect(button.x, button.y, button.width, button.height);
            this.ctx.lineWidth = button.selected ? 3 : 2;
            this.ctx.strokeRect(button.x, button.y, button.width, button.height);
            
            // Icon
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(button.powerUp.icon, button.x + 10, button.y + 30);
            
            // Name
            this.ctx.font = '8px "Press Start 2P"';
            this.ctx.fillStyle = hasToken ? button.powerUp.color : '#666666';
            this.ctx.fillText(
                button.powerUp.name.substring(0, 15),
                button.x + 40,
                button.y + 20
            );
            
            // Token count
            this.ctx.font = '10px "Press Start 2P"';
            this.ctx.fillStyle = hasToken ? '#FFFFFF' : '#666666';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`x${tokenCount}`, button.x + button.width - 10, button.y + button.height - 10);
        });
        
        // Selected power-ups display
        this.ctx.font = '10px "Press Start 2P"';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            `Selected: ${this.selectedPowerUps.length}/${this.powerUpManager.maxLoadoutSlots}`,
            this.canvas.width / 2,
            this.canvas.height - 130
        );
        
        // Start button
        this.ctx.fillStyle = this.selectedPowerUps.length > 0 ? '#E30613' : '#666666';
        this.ctx.fillRect(
            this.startButton.x,
            this.startButton.y,
            this.startButton.width,
            this.startButton.height
        );
        
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(
            this.startButton.x,
            this.startButton.y,
            this.startButton.width,
            this.startButton.height
        );
        
        this.ctx.font = '12px "Press Start 2P"';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            this.startButton.text,
            this.startButton.x + this.startButton.width / 2,
            this.startButton.y + 30
        );
        
        // Reset text styles
        this.ctx.textAlign = 'left';
    }
}

