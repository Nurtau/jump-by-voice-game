import { GameLoop } from './GameLoop.js';
import { Renderer } from './Renderer.js';
import { PhysicsEngine } from './PhysicsEngine.js';
import { Player } from '../entities/Player.js';
import { VoiceController } from '../systems/VoiceController.js';
import { LevelGenerator } from '../systems/LevelGenerator.js';
import { GameState } from '../systems/GameState.js';
import { UIManager } from '../ui/UIManager.js';
import { ParticleSystem } from '../utils/ParticleSystem.js';
import { InputHandler } from '../utils/InputHandler.js';
import { GameConfig } from '../config/GameConfig.js';

/**
 * Game - Main game class that orchestrates everything
 */
export class Game {
  constructor(canvas) {
    this.canvas = canvas;

    // Core systems
    this.renderer = new Renderer(canvas);
    this.physics = new PhysicsEngine();
    this.gameLoop = new GameLoop(
      (dt) => this.update(dt),
      () => this.render()
    );

    // Game systems
    this.voiceController = new VoiceController();
    this.levelGenerator = new LevelGenerator();
    this.gameState = new GameState();
    this.uiManager = new UIManager(this.renderer);
    this.particles = new ParticleSystem();
    this.input = new InputHandler();

    // Entities
    this.player = null;

    // State
    this.voiceEnabled = false;
    this.lastJumpTime = 0;
    this.backgroundOffset = 0;

    // Initialize
    this.init();
  }

  init() {
    console.log('Initializing game...');

    // Create player
    this.player = new Player(
      GameConfig.PLAYER.START_X,
      GameConfig.GROUND_Y - GameConfig.PLAYER.HEIGHT
    );
    this.physics.addEntity(this.player);

    // Set up input handlers
    this.setupInput();

    // Set initial state
    this.gameState.setState(GameConfig.STATES.MENU);

    // Hide loading screen immediately - don't wait for voice
    this.hideLoadingScreen();

    // Start game loop
    this.gameLoop.start();

    console.log('Game initialized successfully');

    // Try to initialize voice controller in background (non-blocking)
    // This allows the game to start even if user doesn't grant mic permission
    this.initializeVoiceAsync();
  }

  async initializeVoiceAsync() {
    try {
      // Add timeout to prevent hanging
      const voicePromise = this.voiceController.initialize();
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve(false), 5000)
      );

      this.voiceEnabled = await Promise.race([voicePromise, timeoutPromise]);
      console.log('Voice control:', this.voiceEnabled ? 'enabled' : 'disabled (use spacebar/touch)');
    } catch (error) {
      console.warn('Voice control not available:', error);
      this.voiceEnabled = false;
    }
  }

  setupInput() {
    // Space bar for jumping (alternative to voice)
    let spaceHoldTime = 0;

    this.input.onKey('Space',
      () => {
        const state = this.gameState.getState();

        if (state === GameConfig.STATES.MENU) {
          this.startGame();
        } else if (state === GameConfig.STATES.PLAYING) {
          spaceHoldTime = 0;
        } else if (state === GameConfig.STATES.GAME_OVER) {
          this.restartGame();
        }
      },
      () => {
        if (this.gameState.isPlaying()) {
          // Calculate jump strength based on hold time
          const strength = Math.min(4, Math.floor(spaceHoldTime / 0.15) + 1);
          this.handleJump(strength);
          spaceHoldTime = 0;
        }
      }
    );

    // Pause/unpause
    this.input.onKey('Escape', () => this.togglePause());
    this.input.onKey('KeyP', () => this.togglePause());

    // Restart
    this.input.onKey('KeyR', () => {
      if (this.gameState.isGameOver() || this.gameState.isPaused()) {
        this.restartGame();
      }
    });

    // Track space hold time
    this.spaceHoldTimeTracker = () => {
      if (this.input.isKeyPressed('Space') && this.gameState.isPlaying()) {
        spaceHoldTime += 1 / 60; // Assuming 60fps
      }
    };

    // Touch controls for mobile
    this.setupTouchControls();
  }

  setupTouchControls() {
    let touchStartTime = 0;
    let isTouching = false;

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isTouching = true;
      touchStartTime = Date.now();

      const state = this.gameState.getState();
      if (state === GameConfig.STATES.MENU) {
        this.startGame();
      } else if (state === GameConfig.STATES.GAME_OVER) {
        this.restartGame();
      }
    });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();

      if (this.gameState.isPlaying() && isTouching) {
        const holdTime = (Date.now() - touchStartTime) / 1000;
        // Calculate jump strength based on hold time
        const strength = Math.min(4, Math.floor(holdTime / 0.15) + 1);
        this.handleJump(strength);
      }

      isTouching = false;
      touchStartTime = 0;
    });

    // Also handle mouse for desktop
    let mouseStartTime = 0;
    let isMouseDown = false;

    this.canvas.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      mouseStartTime = Date.now();

      const state = this.gameState.getState();
      if (state === GameConfig.STATES.MENU) {
        this.startGame();
      } else if (state === GameConfig.STATES.GAME_OVER) {
        this.restartGame();
      }
    });

    this.canvas.addEventListener('mouseup', (e) => {
      if (this.gameState.isPlaying() && isMouseDown) {
        const holdTime = (Date.now() - mouseStartTime) / 1000;
        const strength = Math.min(4, Math.floor(holdTime / 0.15) + 1);
        this.handleJump(strength);
      }

      isMouseDown = false;
      mouseStartTime = 0;
    });
  }

  update(deltaTime) {
    const state = this.gameState.getState();

    // Update based on current state
    switch (state) {
      case GameConfig.STATES.MENU:
        this.updateMenu(deltaTime);
        break;

      case GameConfig.STATES.PLAYING:
        this.updatePlaying(deltaTime);
        break;

      case GameConfig.STATES.PAUSED:
        // Don't update game, only render
        break;

      case GameConfig.STATES.GAME_OVER:
        this.updateGameOver(deltaTime);
        break;
    }

    // Always update particles
    this.particles.update(deltaTime);

    // Update shake effect
    this.renderer.updateShake(deltaTime);

    // Background scrolling
    this.backgroundOffset += deltaTime * 50;
  }

  updateMenu(deltaTime) {
    // Check for voice input to start
    if (this.voiceEnabled) {
      const volume = this.voiceController.getVolumeLevel();
      if (volume > GameConfig.VOICE.THRESHOLD) {
        this.startGame();
      }
    }
  }

  updatePlaying(deltaTime) {
    // Track space hold time
    if (this.spaceHoldTimeTracker) {
      this.spaceHoldTimeTracker();
    }

    // Update player
    this.player.update(deltaTime);

    // Check voice input for jumping
    if (this.voiceEnabled) {
      const strength = this.voiceController.getJumpStrength();
      if (strength > 0 && Date.now() - this.lastJumpTime > GameConfig.VOICE.COOLDOWN) {
        this.handleJump(strength);
      }
    }

    // Update physics
    this.physics.update(deltaTime);

    // Update distance
    const distanceTraveled = this.player.velocity.x * deltaTime;
    this.gameState.updateDistance(distanceTraveled);

    // Update camera
    this.renderer.updateCamera(this.player.position.x, this.player.position.y);

    // Update level generation
    const cameraX = this.renderer.getCameraX();
    this.levelGenerator.update(cameraX, this.gameState.distance);

    // Check collisions
    const obstacles = this.levelGenerator.getObstacles();
    const collisions = this.physics.checkCollisions(this.player, obstacles);

    if (collisions.length > 0) {
      this.handleCollision(collisions[0]);
    }

    // Check for cleared obstacles
    obstacles.forEach(obstacle => {
      if (obstacle.isClearedBy(this.player)) {
        this.gameState.recordObstacleCleared();
        // Could emit particles here
      }
    });

    // Check if player fell off screen
    if (this.player.position.y > GameConfig.CANVAS_HEIGHT + 100) {
      this.handleDeath();
    }
  }

  updateGameOver(deltaTime) {
    // Could add some effects here
  }

  handleJump(strength) {
    if (this.player.jump(strength)) {
      this.lastJumpTime = Date.now();
      this.gameState.recordJump();

      // Emit jump particles
      this.particles.emitJump(
        this.player.position.x + this.player.size.width / 2,
        this.player.position.y + this.player.size.height
      );
    }
  }

  handleCollision(obstacle) {
    if (this.player.takeDamage()) {
      // Emit collision particles
      this.particles.emitCollision(
        this.player.position.x + this.player.size.width / 2,
        this.player.position.y + this.player.size.height / 2
      );

      // Screen shake
      this.renderer.addShake(15, 0.3);

      // Reset combo
      this.gameState.resetCombo();

      // Check if game over
      if (this.player.lives <= 0) {
        this.handleDeath();
      }
    }
  }

  handleDeath() {
    this.gameState.gameOver();
  }

  render() {
    // Clear canvas
    this.renderer.clear();

    // Render background
    this.renderer.renderBackground();
    this.renderer.renderGround();

    const state = this.gameState.getState();

    if (state === GameConfig.STATES.MENU) {
      this.uiManager.renderMainMenu(this.renderer.ctx);
    } else if (state === GameConfig.STATES.PLAYING || state === GameConfig.STATES.PAUSED) {
      // Render obstacles
      const obstacles = this.levelGenerator.getObstacles();
      obstacles.forEach(obstacle => {
        this.renderer.renderEntity(obstacle);
      });

      // Render player
      this.renderer.renderEntity(this.player);

      // Render particles
      this.particles.render(this.renderer.ctx);

      // Render HUD
      this.uiManager.renderHUD(this.gameState, this.player, this.voiceController);

      // Render pause overlay
      if (state === GameConfig.STATES.PAUSED) {
        this.uiManager.renderPauseMenu(this.renderer.ctx);
      }
    } else if (state === GameConfig.STATES.GAME_OVER) {
      // Render final game state
      const obstacles = this.levelGenerator.getObstacles();
      obstacles.forEach(obstacle => {
        this.renderer.renderEntity(obstacle);
      });
      this.renderer.renderEntity(this.player);

      // Render game over screen
      this.uiManager.renderGameOver(this.gameState, this.renderer.ctx);
    }

    // Debug info (FPS)
    this.renderDebug();
  }

  renderDebug() {
    if (process.env.NODE_ENV === 'development') {
      this.renderer.renderText(
        `FPS: ${this.gameLoop.getFPS()}`,
        this.renderer.canvas.width - 100,
        10,
        { fontSize: 10, align: 'right', color: '#00FF00' }
      );
    }
  }

  startGame() {
    console.log('Starting game...');
    this.gameState.setState(GameConfig.STATES.PLAYING);
    this.gameState.reset();
    this.player.reset();
    this.levelGenerator.reset();
    this.particles.clear();
  }

  restartGame() {
    console.log('Restarting game...');
    this.startGame();
  }

  togglePause() {
    if (this.gameState.isPlaying()) {
      this.gameState.setState(GameConfig.STATES.PAUSED);
      console.log('Game paused');
    } else if (this.gameState.isPaused()) {
      this.gameState.setState(GameConfig.STATES.PLAYING);
      console.log('Game resumed');
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      // Hide immediately - no delay needed
      loadingScreen.classList.add('hidden');
      console.log('Loading screen hidden');
    } else {
      console.warn('Loading screen element not found');
    }
  }
}
