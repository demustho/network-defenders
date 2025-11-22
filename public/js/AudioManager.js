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

    playBossExplosion() {
        if (!this.initialized) return;

        // Layered explosion sound - much more intense than regular explosion
        const bufferSize = this.ctx.sampleRate * 1.5; // 1.5 seconds
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate white noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        // Deep bass layer
        const bassNoise = this.ctx.createBufferSource();
        bassNoise.buffer = buffer;
        const bassGain = this.ctx.createGain();
        bassGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        bassGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.0);
        const bassFilter = this.ctx.createBiquadFilter();
        bassFilter.type = 'lowpass';
        bassFilter.frequency.value = 200;
        bassNoise.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(this.masterGain);
        bassNoise.start();

        // Mid-range crackle
        const midNoise = this.ctx.createBufferSource();
        midNoise.buffer = buffer;
        const midGain = this.ctx.createGain();
        midGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        midGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.7);
        const midFilter = this.ctx.createBiquadFilter();
        midFilter.type = 'bandpass';
        midFilter.frequency.value = 800;
        midNoise.connect(midFilter);
        midFilter.connect(midGain);
        midGain.connect(this.masterGain);
        midNoise.start();

        // High-frequency sizzle tail
        const highNoise = this.ctx.createBufferSource();
        highNoise.buffer = buffer;
        const highGain = this.ctx.createGain();
        highGain.gain.setValueAtTime(0.3, this.ctx.currentTime + 0.2);
        highGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
        const highFilter = this.ctx.createBiquadFilter();
        highFilter.type = 'highpass';
        highFilter.frequency.value = 2000;
        highNoise.connect(highFilter);
        highFilter.connect(highGain);
        highGain.connect(this.masterGain);
        highNoise.start(this.ctx.currentTime + 0.2);
    }

    playIntroMusic() {
        if (!this.initialized) return;

        // Ethereal sci-fi intro melody
        const notes = [
            { freq: 440, time: 0, duration: 0.4 },      // A
            { freq: 523, time: 0.4, duration: 0.4 },    // C
            { freq: 659, time: 0.8, duration: 0.4 },    // E
            { freq: 784, time: 1.2, duration: 0.6 },    // G
            { freq: 659, time: 1.8, duration: 0.4 },    // E
            { freq: 523, time: 2.2, duration: 0.8 }     // C (held)
        ];

        notes.forEach(note => {
            this.playTone(note.freq, 'sine', note.duration, note.time);
            // Add harmonic for richness
            this.playTone(note.freq * 2, 'sine', note.duration, note.time);
        });
    }

    playSciFiBeep(pitch = 1) {
        if (!this.initialized) return;

        // Short beep with pitch variation
        const baseFreq = 800 * pitch;
        this.playTone(baseFreq, 'square', 0.08);
    }

    playWarpSound() {
        if (!this.initialized) return;

        // Frequency sweep from high to low (whoosh effect)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';

        // Sweep from 2000Hz to 100Hz
        osc.frequency.setValueAtTime(2000, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.5);
    }
}
