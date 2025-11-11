import { GameConfig } from '../config/GameConfig.js';

/**
 * GameState - Manages game state and scoring
 */
export class GameState {
  constructor() {
    this.currentState = GameConfig.STATES.LOADING;
    this.score = 0;
    this.distance = 0;
    this.combo = 0;
    this.multiplier = 1;
    this.perfectJumps = 0;
    this.nearMisses = 0;
    this.totalJumps = 0;
    this.highScore = this.loadHighScore();
    this.startTime = 0;
    this.playTime = 0;
  }

  setState(newState) {
    this.currentState = newState;

    if (newState === GameConfig.STATES.PLAYING) {
      this.startTime = Date.now();
    }
  }

  getState() {
    return this.currentState;
  }

  isPlaying() {
    return this.currentState === GameConfig.STATES.PLAYING;
  }

  isPaused() {
    return this.currentState === GameConfig.STATES.PAUSED;
  }

  isGameOver() {
    return this.currentState === GameConfig.STATES.GAME_OVER;
  }

  addScore(points) {
    this.score += Math.floor(points * this.multiplier);
  }

  updateDistance(pixels) {
    this.distance += pixels;
    // Add small score for distance
    this.score += Math.floor(pixels * GameConfig.SCORE.DISTANCE_MULTIPLIER);
  }

  incrementCombo() {
    this.combo++;
    this.updateMultiplier();
  }

  resetCombo() {
    this.combo = 0;
    this.multiplier = 1;
  }

  updateMultiplier() {
    const thresholds = GameConfig.SCORE.COMBO_THRESHOLDS;

    if (this.combo >= thresholds[2]) {
      this.multiplier = 5;
    } else if (this.combo >= thresholds[1]) {
      this.multiplier = 3;
    } else if (this.combo >= thresholds[0]) {
      this.multiplier = 2;
    } else {
      this.multiplier = 1;
    }
  }

  recordPerfectJump() {
    this.perfectJumps++;
    this.addScore(GameConfig.SCORE.PERFECT_JUMP);
    this.incrementCombo();
  }

  recordNearMiss() {
    this.nearMisses++;
    this.addScore(GameConfig.SCORE.NEAR_MISS);
  }

  recordJump() {
    this.totalJumps++;
  }

  recordObstacleCleared() {
    this.incrementCombo();

    if (this.combo % 5 === 0) {
      this.addScore(GameConfig.SCORE.COMBO_BONUS);
    }
  }

  gameOver() {
    this.setState(GameConfig.STATES.GAME_OVER);

    this.playTime = Math.floor((Date.now() - this.startTime) / 1000);

    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
      return true; // New high score
    }

    return false;
  }

  reset() {
    this.score = 0;
    this.distance = 0;
    this.combo = 0;
    this.multiplier = 1;
    this.perfectJumps = 0;
    this.nearMisses = 0;
    this.totalJumps = 0;
    this.playTime = 0;
  }

  loadHighScore() {
    const saved = localStorage.getItem('voiceJumpHighScore');
    return saved ? parseInt(saved) : 0;
  }

  saveHighScore() {
    localStorage.setItem('voiceJumpHighScore', this.highScore.toString());
  }

  getStats() {
    return {
      score: this.score,
      distance: Math.floor(this.distance),
      combo: this.combo,
      multiplier: this.multiplier,
      perfectJumps: this.perfectJumps,
      nearMisses: this.nearMisses,
      totalJumps: this.totalJumps,
      playTime: this.playTime,
      highScore: this.highScore
    };
  }
}
