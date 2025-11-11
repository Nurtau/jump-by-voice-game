import { GameConfig } from '../config/GameConfig.js';

/**
 * VoiceController - Handles voice input and analysis
 */
export class VoiceController {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.dataArray = null;
    this.isListening = false;
    this.volumeThreshold = GameConfig.VOICE.THRESHOLD;
    this.sensitivity = GameConfig.VOICE.SENSITIVITY;
    this.currentVolume = 0;
    this.enabled = true;
  }

  async initialize() {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false
        }
      });

      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.microphone = this.audioContext.createMediaStreamSource(stream);

      // Configure analyser
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);

      // Connect microphone to analyser
      this.microphone.connect(this.analyser);
      this.isListening = true;

      console.log('Voice controller initialized successfully');
      return true;
    } catch (error) {
      console.error('Microphone access denied or not available:', error);
      this.isListening = false;
      return false;
    }
  }

  getVolumeLevel() {
    if (!this.isListening || !this.enabled) return 0;

    // Get frequency data
    this.analyser.getByteFrequencyData(this.dataArray);

    // Calculate average volume
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    const average = sum / this.dataArray.length;

    // Normalize to 0-100 range with sensitivity
    const normalized = (average / 255) * 100 * this.sensitivity;

    // Store current volume
    this.currentVolume = Math.min(100, Math.max(0, normalized));

    return this.currentVolume;
  }

  getJumpStrength() {
    const volume = this.getVolumeLevel();

    if (volume < this.volumeThreshold) return 0;

    // Map volume to jump strength (0-4)
    const ranges = GameConfig.VOICE.RANGES;

    if (volume < ranges.WHISPER) return 1; // Small hop
    if (volume < ranges.NORMAL) return 2; // Medium jump
    if (volume < ranges.LOUD) return 3; // High jump
    return 4; // Super jump
  }

  async calibrate() {
    if (!this.isListening) {
      console.warn('Cannot calibrate: microphone not initialized');
      return this.volumeThreshold;
    }

    console.log('Starting calibration...');

    const samples = [];
    const sampleCount = 60; // 1 second at 60fps

    return new Promise((resolve) => {
      let count = 0;
      const interval = setInterval(() => {
        samples.push(this.getVolumeLevel());
        count++;

        if (count >= sampleCount) {
          clearInterval(interval);

          // Calculate average ambient noise
          const avgNoise = samples.reduce((a, b) => a + b, 0) / samples.length;

          // Set threshold slightly above ambient
          this.volumeThreshold = Math.max(10, avgNoise + 5);

          console.log(`Calibration complete. Threshold set to: ${this.volumeThreshold}`);
          resolve(this.volumeThreshold);
        }
      }, 1000 / 60);
    });
  }

  setSensitivity(value) {
    this.sensitivity = Math.max(0.1, Math.min(2.0, value));
  }

  setThreshold(value) {
    this.volumeThreshold = Math.max(0, Math.min(50, value));
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  isActive() {
    return this.isListening && this.enabled;
  }

  dispose() {
    if (this.microphone) {
      this.microphone.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.isListening = false;
  }
}
