import { Game } from './core/Game.js';

/**
 * Main entry point
 */

// Initialize game when DOM is ready
function init() {
  console.log('Starting game initialization...');

  // Get UI elements
  const loadingScreen = document.getElementById('loadingScreen');
  const errorScreen = document.getElementById('errorScreen');
  const errorMessage = document.getElementById('errorMessage');

  // Get canvas element
  const canvas = document.getElementById('gameCanvas');

  if (!canvas) {
    console.error('Canvas element not found!');
    showError('Canvas element not found! The game cannot render without a canvas element.', errorScreen, errorMessage);
    hideLoading(loadingScreen);
    return;
  }

  // Verify canvas context is available
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas 2D context not available!');
    showError('Canvas 2D context not available! Your browser may not support HTML5 Canvas.', errorScreen, errorMessage);
    hideLoading(loadingScreen);
    return;
  }

  // Draw a diagnostic test pattern to verify canvas is working
  try {
    console.log('Drawing diagnostic test pattern...');
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFD700';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Initializing...', canvas.width / 2, canvas.height / 2);
    console.log('✓ Canvas rendering works!');
  } catch (error) {
    console.error('Canvas test draw failed:', error);
    showError('Canvas rendering failed: ' + error.message, errorScreen, errorMessage);
    hideLoading(loadingScreen);
    return;
  }

  // Check browser support
  if (!checkBrowserSupport()) {
    showBrowserError(errorScreen, errorMessage);
    hideLoading(loadingScreen);
    return;
  }

  // Create and initialize game
  try {
    console.log('Creating game instance...');
    const game = new Game(canvas);

    // Store game instance globally for debugging
    window.game = game;

    // Hide loading screen after successful initialization
    setTimeout(() => {
      hideLoading(loadingScreen);
      console.log('✓ Game ready! Tap screen or press SPACE to start.');
    }, 500);

  } catch (error) {
    console.error('Failed to initialize game:', error);
    showError('Failed to initialize game: ' + error.message + '\n\nStack trace:\n' + error.stack, errorScreen, errorMessage);
    hideLoading(loadingScreen);
  }
}

// Show error on screen
function showError(message, errorScreen, errorMessage) {
  if (errorScreen && errorMessage) {
    errorMessage.textContent = message;
    errorScreen.classList.add('visible');
  } else {
    alert('Error: ' + message);
  }
}

// Hide loading screen
function hideLoading(loadingScreen) {
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
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
function showBrowserError(errorScreen, errorMessage) {
  const message = '⚠️ Browser Not Supported\n\nThis game requires a modern browser with HTML5 Canvas support.\n\nPlease try using:\n• Chrome 90+\n• Firefox 88+\n• Safari 14+\n• Edge 90+';
  showError(message, errorScreen, errorMessage);
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

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  const errorScreen = document.getElementById('errorScreen');
  const errorMessage = document.getElementById('errorMessage');
  const loadingScreen = document.getElementById('loadingScreen');

  if (errorScreen && errorMessage) {
    showError('Unexpected error: ' + (event.error ? event.error.message : event.message), errorScreen, errorMessage);
    hideLoading(loadingScreen);
  }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  const errorScreen = document.getElementById('errorScreen');
  const errorMessage = document.getElementById('errorMessage');
  const loadingScreen = document.getElementById('loadingScreen');

  if (errorScreen && errorMessage) {
    showError('Promise rejection: ' + (event.reason ? event.reason.message || event.reason : 'Unknown error'), errorScreen, errorMessage);
    hideLoading(loadingScreen);
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
