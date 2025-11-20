export class AudioManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.initialized = false;
    }

    async init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.3;
            this.masterGain.connect(this.ctx.destination);
        }

        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
        this.initialized = true;
    }

    playTone(freq, type, duration, startTime = 0) {
        if (!this.initialized) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
    }

    playShoot() {
        // High pitched square wave with fast decay
        this.playTone(880, 'square', 0.1);
        this.playTone(440, 'square', 0.1, 0.05); // Slide down effect
    }

    playExplosion() {
        if (!this.initialized) return;
        // White noise buffer for explosion
        const bufferSize = this.ctx.sampleRate * 0.5; // 0.5 seconds
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

        // Lowpass filter to make it sound like an explosion
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start();
    }

    playStart() {
        // Ascending arpeggio
        this.playTone(440, 'square', 0.1, 0);
        this.playTone(554, 'square', 0.1, 0.1);
        this.playTone(659, 'square', 0.1, 0.2);
        this.playTone(880, 'square', 0.4, 0.3);
    }

    playGameOver() {
        // Descending sad tones
        this.playTone(880, 'sawtooth', 0.3, 0);
        this.playTone(830, 'sawtooth', 0.3, 0.3);
        this.playTone(783, 'sawtooth', 0.3, 0.6);
        this.playTone(740, 'sawtooth', 0.8, 0.9);
    }
}
