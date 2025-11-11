import { Game } from './core/Game.js';

/**
 * Main entry point
 */

// Initialize game when DOM is ready
function init() {
  // Get canvas element
  const canvas = document.getElementById('gameCanvas');

  if (!canvas) {
    console.error('Canvas element not found!');
    alert('Error: Canvas element not found. Please refresh the page.');
    return;
  }

  // Check browser support
  if (!checkBrowserSupport()) {
    showBrowserError();
    return;
  }

  // Create and initialize game
  try {
    const game = new Game(canvas);

    // Store game instance globally for debugging
    window.game = game;

    console.log('Game ready! Tap screen or press SPACE to start.');
  } catch (error) {
    console.error('Failed to initialize game:', error);
    alert('Failed to load game: ' + error.message + '\nPlease refresh the page.');
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
  alert('⚠️ Browser Not Supported\n\nThis game requires a modern browser with HTML5 Canvas support.\n\nPlease try using:\n• Chrome 90+\n• Firefox 88+\n• Safari 14+\n• Edge 90+');
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
