// Game Configuration
export const GameConfig = {
  // Canvas
  CANVAS_WIDTH: 1280,
  CANVAS_HEIGHT: 720,

  // Physics
  GRAVITY: 2000, // pixels per second squared
  GROUND_Y: 600, // Y position of ground

  // Player
  PLAYER: {
    WIDTH: 40,
    HEIGHT: 60,
    RUN_SPEED: 300,
    START_X: 200,
    JUMP_POWERS: [0, 400, 600, 800, 1000], // Jump strengths 0-4
    MAX_FALL_SPEED: 1200
  },

  // Voice Control
  VOICE: {
    THRESHOLD: 10, // Minimum volume to register
    SENSITIVITY: 1.0,
    COOLDOWN: 100, // ms between jumps
    RANGES: {
      WHISPER: 30,
      NORMAL: 60,
      LOUD: 85,
      SHOUT: 100
    }
  },

  // Obstacles
  OBSTACLES: {
    MIN_SPACING: 200,
    MAX_SPACING: 500,
    SPAWN_DISTANCE: 1500, // Spawn obstacles this far ahead
    CLEANUP_DISTANCE: 500 // Remove obstacles this far behind
  },

  // Level Generation
  LEVEL: {
    CHUNK_SIZE: 800,
    DIFFICULTY_INCREASE_RATE: 0.0002 // Per distance unit
  },

  // Scoring
  SCORE: {
    DISTANCE_MULTIPLIER: 1,
    PERFECT_JUMP: 10,
    NEAR_MISS: 5,
    COMBO_BONUS: 25,
    COMBO_THRESHOLDS: [3, 5, 10] // Combo levels for multipliers
  },

  // Game States
  STATES: {
    LOADING: 'loading',
    MENU: 'menu',
    TUTORIAL: 'tutorial',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
  },

  // UI
  UI: {
    FONT_FAMILY: "'Press Start 2P', monospace",
    FONT_SIZE_LARGE: 32,
    FONT_SIZE_MEDIUM: 20,
    FONT_SIZE_SMALL: 14,
    TEXT_COLOR: '#FFFFFF',
    TEXT_OUTLINE: '#000000',
    OUTLINE_WIDTH: 4
  },

  // Colors (Mario-inspired)
  COLORS: {
    SKY_BLUE: '#5C94FC',
    SKY_LIGHT: '#87CEEB',
    GRASS_GREEN: '#7EC850',
    GRASS_DARK: '#228B22',
    BRICK_RED: '#D84030',
    GOLD: '#FFD700',
    HERO_BLUE: '#4A90E2',
    HERO_ORANGE: '#FF8C42',
    GROUND_BROWN: '#8B4513',
    CLOUD_WHITE: '#FFFFFF'
  }
};
