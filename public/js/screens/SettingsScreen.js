// SettingsScreen - Audio, graphics, and accessibility settings
// Based on PRD Phase 9

export class SettingsScreen {
    constructor(ctx, canvas, audioManager) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.audioManager = audioManager;
        this.done = false;
        
        // Load settings from localStorage
        this.settings = this.loadSettings();
        
        // UI elements
        this.closeButton = {
            x: 10,
            y: 10,
            width: 60,
            height: 30,
            text: 'BACK'
        };
        
        this.setupUI();
    }

    loadSettings() {
        const saved = localStorage.getItem('game_settings');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Default settings
        return {
            audio: {
                master: 80,
                music: 70,
                sfx: 100,
                voiceAnnouncements: true
            },
            graphics: {
                quality: 'high', // high, medium, low
                particles: true,
                screenShake: true,
                crtFilter: false
            },
            accessibility: {
                colorblindMode: 'none', // none, protanopia, deuteranopia, tritanopia
                reducedMotion: false,
                hapticFeedback: true,
                visualAudio: false
            },
            language: 'english' // english, dhivehi
        };
    }

    saveSettings() {
        localStorage.setItem('game_settings', JSON.stringify(this.settings));
        this.applySettings();
    }

    applySettings() {
        // Apply audio settings
        if (this.audioManager && this.audioManager.masterGain) {
            this.audioManager.masterGain.gain.value = this.settings.audio.master / 100;
        }
        
        // Other settings would be applied during gameplay
    }

    setupUI() {
        let yPos = 80;
        const leftX = 20;
        const sliderWidth = 200;
        
        // Audio sliders
        this.sliders = [
            { 
                label: 'Master', 
                x: leftX, y: yPos, 
                width: sliderWidth, height: 20,
                getValue: () => this.settings.audio.master,
                setValue: (v) => { this.settings.audio.master = v; }
            },
            {
                label: 'Music',
                x: leftX, y: yPos + 35,
                width: sliderWidth, height: 20,
                getValue: () => this.settings.audio.music,
                setValue: (v) => { this.settings.audio.music = v; }
            },
            {
                label: 'SFX',
                x: leftX, y: yPos + 70,
                width: sliderWidth, height: 20,
                getValue: () => this.settings.audio.sfx,
                setValue: (v) => { this.settings.audio.sfx = v; }
            }
        ];
        
        // Toggle buttons
        yPos += 120;
        this.toggles = [
            {
                label: 'Voice Announcements',
                x: leftX, y: yPos,
                width: 120, height: 25,
                getValue: () => this.settings.audio.voiceAnnouncements,
                setValue: (v) => { this.settings.audio.voiceAnnouncements = v; }
            },
            {
                label: 'Particles',
                x: leftX, y: yPos + 35,
                width: 120, height: 25,
                getValue: () => this.settings.graphics.particles,
                setValue: (v) => { this.settings.graphics.particles = v; }
            },
            {
                label: 'Screen Shake',
                x: leftX, y: yPos + 70,
                width: 120, height: 25,
                getValue: () => this.settings.graphics.screenShake,
                setValue: (v) => { this.settings.graphics.screenShake = v; }
            },
            {
                label: 'Haptic Feedback',
                x: leftX, y: yPos + 105,
                width: 120, height: 25,
                getValue: () => this.settings.accessibility.hapticFeedback,
                setValue: (v) => { this.settings.accessibility.hapticFeedback = v; }
            }
        ];
    }

    handleClick(x, y) {
        // Check close button
        if (this.isPointInRect(x, y, this.closeButton)) {
            this.saveSettings();
            this.done = true;
            return;
        }
        
        // Check sliders
        this.sliders.forEach(slider => {
            if (y >= slider.y && y <= slider.y + slider.height &&
                x >= slider.x && x <= slider.x + slider.width) {
                const value = Math.round(((x - slider.x) / slider.width) * 100);
                slider.setValue(Math.max(0, Math.min(100, value)));
                this.applySettings();
            }
        });
        
        // Check toggles
        this.toggles.forEach(toggle => {
            if (this.isPointInRect(x, y, toggle)) {
                toggle.setValue(!toggle.getValue());
                this.saveSettings();
            }
        });
    }

    isPointInRect(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.width &&
               y >= rect.y && y <= rect.y + rect.height;
    }

    update(deltaTime) {
        return this.done;
    }

    render() {
        // Clear screen
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Title
        this.ctx.font = '20px "Press Start 2P"';
        this.ctx.fillStyle = '#E30613';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = '#E30613';
        this.ctx.shadowBlur = 20;
        this.ctx.fillText('SETTINGS', this.canvas.width / 2, 50);
        this.ctx.shadowBlur = 0;

        // Section headers
        this.ctx.font = '12px "Press Start 2P"';
        this.ctx.fillStyle = '#00F0FF';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('AUDIO', 20, 75);
        this.ctx.fillText('OPTIONS', 20, 200);

        // Render sliders
        this.sliders.forEach(slider => {
            // Label
            this.ctx.font = '8px "Press Start 2P"';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillText(slider.label, slider.x, slider.y - 5);
            
            // Slider track
            this.ctx.fillStyle = '#333333';
            this.ctx.fillRect(slider.x, slider.y, slider.width, slider.height);
            
            // Slider fill
            const fillWidth = (slider.width * slider.getValue()) / 100;
            this.ctx.fillStyle = '#E30613';
            this.ctx.fillRect(slider.x, slider.y, fillWidth, slider.height);
            
            // Slider border
            this.ctx.strokeStyle = '#FFFFFF';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(slider.x, slider.y, slider.width, slider.height);
            
            // Value text
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`${slider.getValue()}%`, slider.x + slider.width + 30, slider.y + 14);
        });

        // Render toggles
        this.toggles.forEach(toggle => {
            const isOn = toggle.getValue();
            
            // Label
            this.ctx.font = '8px "Press Start 2P"';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(toggle.label, toggle.x, toggle.y + 16);
            
            // Toggle button
            const toggleX = toggle.x + toggle.width + 10;
            this.ctx.fillStyle = isOn ? '#00FF00' : '#666666';
            this.ctx.fillRect(toggleX, toggle.y, 40, toggle.height);
            
            this.ctx.strokeStyle = '#FFFFFF';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(toggleX, toggle.y, 40, toggle.height);
            
            this.ctx.font = '8px "Press Start 2P"';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(isOn ? 'ON' : 'OFF', toggleX + 20, toggle.y + 16);
        });

        // Close button
        this.ctx.fillStyle = '#E30613';
        this.ctx.fillRect(this.closeButton.x, this.closeButton.y, this.closeButton.width, this.closeButton.height);
        
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.closeButton.x, this.closeButton.y, this.closeButton.width, this.closeButton.height);
        
        this.ctx.font = '10px "Press Start 2P"';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.closeButton.text, this.closeButton.x + this.closeButton.width / 2, this.closeButton.y + 18);

        // Reset text alignment
        this.ctx.textAlign = 'left';
    }
}

