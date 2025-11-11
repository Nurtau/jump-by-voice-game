import { Game } from './core/Game.js';

/**
 * Main entry point
 */

// Update loading progress
function updateLoadingProgress(progress, text) {
  const progressBar = document.getElementById('loadingProgress');
  const loadingText = document.getElementById('loadingText');

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (loadingText && text) {
    loadingText.textContent = text;
  }
}

// Initialize game when DOM is ready
async function init() {
  updateLoadingProgress(20, 'Initializing canvas...');

  // Get canvas element
  const canvas = document.getElementById('gameCanvas');

  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  updateLoadingProgress(40, 'Setting up game systems...');

  // Check browser support
  if (!checkBrowserSupport()) {
    showBrowserError();
    return;
  }

  updateLoadingProgress(60, 'Loading game...');

  // Create and initialize game
  try {
    const game = new Game(canvas);

    updateLoadingProgress(100, 'Ready!');

    // Store game instance globally for debugging
    window.game = game;

    console.log('Game ready! Press SPACE or make a sound to start.');
  } catch (error) {
    console.error('Failed to initialize game:', error);
    showError('Failed to load game. Please refresh the page.');
  }
}

// Check browser support
function checkBrowserSupport() {
  // Check for required APIs
  const hasCanvas = !!document.createElement('canvas').getContext;
  const hasAudioContext = !!(window.AudioContext || window.webkitAudioContext);
  const hasRAF = !!window.requestAnimationFrame;

  if (!hasCanvas) {
    console.error('Canvas not supported');
    return false;
  }

  if (!hasAudioContext) {
    console.warn('Web Audio API not supported - voice control will be disabled');
    // Don't fail, just warn
  }

  if (!hasRAF) {
    console.error('requestAnimationFrame not supported');
    return false;
  }

  return true;
}

// Show browser compatibility error
function showBrowserError() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.innerHTML = `
      <h1 style="color: #FF0000;">⚠️ Browser Not Supported</h1>
      <p style="margin-top: 20px; font-size: 14px; max-width: 500px; text-align: center;">
        This game requires a modern browser with HTML5 Canvas support.
        <br><br>
        Please try using:
        <br>• Chrome 90+
        <br>• Firefox 88+
        <br>• Safari 14+
        <br>• Edge 90+
      </p>
    `;
  }
}

// Show general error
function showError(message) {
  const loadingText = document.getElementById('loadingText');
  if (loadingText) {
    loadingText.textContent = message;
    loadingText.style.color = '#FF0000';
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle window resize
window.addEventListener('resize', () => {
  // Could implement responsive canvas sizing here
  console.log('Window resized');
});

// Prevent context menu on canvas
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'CANVAS') {
    e.preventDefault();
  }
});

// Log game info
console.log(`
🎮 Voice Jump Game
━━━━━━━━━━━━━━━━━━━━━━━━━━
Controls:
  - Voice: Make sounds to jump (louder = higher)
  - Space: Alternative jump control
  - ESC/P: Pause game
  - R: Restart

Tips:
  - Whisper for small jumps
  - Speak normally for medium jumps
  - Shout loudly for super jumps!
  - Chain jumps for combo bonuses

━━━━━━━━━━━━━━━━━━━━━━━━━━
Have fun! 🎉
`);
