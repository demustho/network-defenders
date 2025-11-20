// HapticFeedback - Vibration feedback for mobile devices
// Based on PRD Phase 12

export class HapticFeedback {
    constructor() {
        this.enabled = this.loadSettings();
        this.supported = 'vibrate' in navigator;
    }

    loadSettings() {
        const settings = localStorage.getItem('game_settings');
        if (settings) {
            const parsed = JSON.parse(settings);
            return parsed.accessibility?.hapticFeedback !== false;
        }
        return true;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }

    vibrate(pattern) {
        if (!this.enabled || !this.supported) return;
        
        try {
            navigator.vibrate(pattern);
        } catch (error) {
            console.warn('Haptic feedback not available:', error);
        }
    }

    // Predefined patterns
    light() {
        this.vibrate(10);
    }

    medium() {
        this.vibrate(20);
    }

    heavy() {
        this.vibrate(40);
    }

    shoot() {
        this.vibrate(5);
    }

    hit() {
        this.vibrate(15);
    }

    explosion() {
        this.vibrate([20, 10, 20]);
    }

    powerUp() {
        this.vibrate([10, 5, 10, 5, 20]);
    }

    victory() {
        this.vibrate([30, 20, 30, 20, 50]);
    }

    defeat() {
        this.vibrate([50, 30, 50]);
    }
}

