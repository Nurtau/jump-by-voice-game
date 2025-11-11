import { GameConfig } from '../config/GameConfig.js';

/**
 * UIManager - Manages all UI rendering
 */
export class UIManager {
  constructor(renderer) {
    this.renderer = renderer;
  }

  renderHUD(gameState, player, voiceController) {
    const ctx = this.renderer.ctx;
    const stats = gameState.getStats();

    // Score (top-left)
    this.renderer.renderText(
      `Score: ${stats.score}`,
      20,
      20,
      { fontSize: 24 }
    );

    // Distance (below score)
    this.renderer.renderText(
      `${stats.distance}m`,
      20,
      60,
      { fontSize: 18 }
    );

    // Lives (top-center)
    this.renderLives(player.lives, ctx);

    // Combo multiplier (top-right)
    if (stats.multiplier > 1) {
      const color = this.getMultiplierColor(stats.multiplier);
      this.renderer.renderText(
        `COMBO x${stats.multiplier}`,
        this.renderer.canvas.width - 20,
        20,
        { fontSize: 20, color, align: 'right' }
      );

      this.renderer.renderText(
        `${stats.combo}`,
        this.renderer.canvas.width - 20,
        50,
        { fontSize: 16, color, align: 'right' }
      );
    }

    // Voice meter (left side)
    if (voiceController.isActive()) {
      this.renderVoiceMeter(voiceController.currentVolume, ctx);
    }

    // High score (top-right, small)
    this.renderer.renderText(
      `Hi: ${stats.highScore}`,
      this.renderer.canvas.width - 20,
      this.renderer.canvas.height - 40,
      { fontSize: 12, align: 'right', color: GameConfig.COLORS.GOLD }
    );
  }

  renderLives(lives, ctx) {
    const centerX = this.renderer.canvas.width / 2;
    const y = 20;
    const heartSize = 30;
    const spacing = 40;

    for (let i = 0; i < 3; i++) {
      const x = centerX - (1.5 * spacing) + (i * spacing);
      const filled = i < lives;

      this.renderHeart(ctx, x, y, heartSize, filled);
    }
  }

  renderHeart(ctx, x, y, size, filled) {
    ctx.save();

    if (filled) {
      ctx.fillStyle = '#FF0000';
    } else {
      ctx.fillStyle = '#666666';
    }

    // Simple heart shape using two circles and a triangle
    ctx.beginPath();
    ctx.arc(x - size / 4, y + size / 4, size / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + size / 4, y + size / 4, size / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - size / 2, y + size / 4);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x + size / 2, y + size / 4);
    ctx.fill();

    // Outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  renderVoiceMeter(volume, ctx) {
    const x = 20;
    const y = 150;
    const width = 40;
    const height = 200;

    ctx.save();

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x, y, width, height);

    // Volume level
    const fillHeight = (volume / 100) * height;

    // Gradient based on level
    const gradient = ctx.createLinearGradient(x, y + height, x, y);
    gradient.addColorStop(0, '#00FF00');
    gradient.addColorStop(0.5, '#FFFF00');
    gradient.addColorStop(1, '#FF0000');

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y + height - fillHeight, width, fillHeight);

    // Threshold lines
    const ranges = GameConfig.VOICE.RANGES;
    this.drawThresholdLine(ctx, x, y, width, height, ranges.WHISPER, '#FFFFFF');
    this.drawThresholdLine(ctx, x, y, width, height, ranges.NORMAL, '#FFFF00');
    this.drawThresholdLine(ctx, x, y, width, height, ranges.LOUD, '#FF8C00');

    // Border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '10px ' + GameConfig.UI.FONT_FAMILY;
    ctx.textAlign = 'center';
    ctx.fillText('MIC', x + width / 2, y + height + 15);

    ctx.restore();
  }

  drawThresholdLine(ctx, x, y, width, height, threshold, color) {
    const lineY = y + height - (threshold / 100) * height;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(x, lineY);
    ctx.lineTo(x + width, lineY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  getMultiplierColor(multiplier) {
    switch (multiplier) {
      case 2: return '#FFFF00';
      case 3: return '#FF8C00';
      case 5: return '#FF0000';
      default: return '#FFFFFF';
    }
  }

  renderMainMenu(ctx) {
    const width = this.renderer.canvas.width;
    const height = this.renderer.canvas.height;

    // Title
    this.renderer.renderText(
      '🎮 VOICE JUMP 🎮',
      width / 2,
      height * 0.25,
      { fontSize: 40, align: 'center', color: GameConfig.COLORS.GOLD }
    );

    // Instructions
    this.renderer.renderText(
      'TAP & HOLD to jump!',
      width / 2,
      height * 0.4,
      { fontSize: 18, align: 'center' }
    );

    this.renderer.renderText(
      'Hold longer = Higher jump',
      width / 2,
      height * 0.45,
      { fontSize: 14, align: 'center' }
    );

    // Start prompt
    const blinkTime = Math.floor(Date.now() / 500) % 2;
    if (blinkTime === 0) {
      this.renderer.renderText(
        'TAP to start!',
        width / 2,
        height * 0.7,
        { fontSize: 20, align: 'center', color: GameConfig.COLORS.GOLD }
      );
    }

    // Alternative controls info
    this.renderer.renderText(
      'Voice/Spacebar also work',
      width / 2,
      height * 0.85,
      { fontSize: 10, align: 'center', color: '#AAAAAA' }
    );
  }

  renderPauseMenu(ctx) {
    const width = this.renderer.canvas.width;
    const height = this.renderer.canvas.height;

    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, width, height);

    // Paused text
    this.renderer.renderText(
      '⏸️  PAUSED',
      width / 2,
      height * 0.35,
      { fontSize: 36, align: 'center', color: GameConfig.COLORS.GOLD }
    );

    // Resume instruction
    this.renderer.renderText(
      'TAP to resume',
      width / 2,
      height * 0.5,
      { fontSize: 18, align: 'center' }
    );

    // Restart instruction
    this.renderer.renderText(
      'ESC or P also resume',
      width / 2,
      height * 0.6,
      { fontSize: 12, align: 'center', color: '#AAAAAA' }
    );
  }

  renderGameOver(gameState, ctx) {
    const width = this.renderer.canvas.width;
    const height = this.renderer.canvas.height;
    const stats = gameState.getStats();

    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);

    // Game Over text
    this.renderer.renderText(
      '💀 GAME OVER! 💀',
      width / 2,
      height / 2 - 150,
      { fontSize: 40, align: 'center', color: '#FF0000' }
    );

    // Score
    this.renderer.renderText(
      `Score: ${stats.score}`,
      width / 2,
      height / 2 - 60,
      { fontSize: 28, align: 'center', color: GameConfig.COLORS.GOLD }
    );

    // High score
    const isNewHighScore = stats.score === stats.highScore && stats.score > 0;
    if (isNewHighScore) {
      this.renderer.renderText(
        '⭐ NEW HIGH SCORE! ⭐',
        width / 2,
        height / 2 - 20,
        { fontSize: 20, align: 'center', color: '#FFD700' }
      );
    } else {
      this.renderer.renderText(
        `High Score: ${stats.highScore}`,
        width / 2,
        height / 2 - 20,
        { fontSize: 16, align: 'center' }
      );
    }

    // Stats
    const statsY = height / 2 + 40;
    this.renderer.renderText(
      `Distance: ${stats.distance}m`,
      width / 2,
      statsY,
      { fontSize: 14, align: 'center', color: '#AAAAAA' }
    );

    this.renderer.renderText(
      `Best Combo: x${stats.multiplier}`,
      width / 2,
      statsY + 30,
      { fontSize: 14, align: 'center', color: '#AAAAAA' }
    );

    this.renderer.renderText(
      `Perfect Jumps: ${stats.perfectJumps}`,
      width / 2,
      statsY + 60,
      { fontSize: 14, align: 'center', color: '#AAAAAA' }
    );

    // Restart prompt
    const blinkTime = Math.floor(Date.now() / 500) % 2;
    if (blinkTime === 0) {
      this.renderer.renderText(
        'TAP to try again!',
        width / 2,
        height * 0.85,
        { fontSize: 18, align: 'center', color: GameConfig.COLORS.GOLD }
      );
    }
  }

  renderTutorial(ctx, step) {
    const width = this.renderer.canvas.width;
    const height = this.renderer.canvas.height;

    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, width, height);

    // Tutorial text based on step
    this.renderer.renderText(
      'Tutorial',
      width / 2,
      100,
      { fontSize: 24, align: 'center', color: GameConfig.COLORS.GOLD }
    );

    const instructions = [
      'Whisper for small jumps',
      'Speak normally for medium jumps',
      'Shout loudly for high jumps!',
      'Chain jumps for combo bonuses'
    ];

    const instruction = instructions[step % instructions.length];

    this.renderer.renderText(
      instruction,
      width / 2,
      height / 2,
      { fontSize: 20, align: 'center' }
    );

    this.renderer.renderText(
      'Watch the voice meter on the left!',
      width / 2,
      height / 2 + 50,
      { fontSize: 14, align: 'center', color: '#AAAAAA' }
    );
  }

  renderLoading(progress) {
    const width = this.renderer.canvas.width;
    const height = this.renderer.canvas.height;
    const ctx = this.renderer.ctx;

    // Title
    this.renderer.renderText(
      '🎮 VOICE JUMP 🎮',
      width / 2,
      height * 0.35,
      { fontSize: 32, align: 'center', color: GameConfig.COLORS.GOLD }
    );

    // Loading text
    const loadingText = progress < 100 ? 'Loading...' : 'Ready!';
    this.renderer.renderText(
      loadingText,
      width / 2,
      height * 0.5,
      { fontSize: 20, align: 'center' }
    );

    // Progress bar
    const barWidth = 400;
    const barHeight = 30;
    const barX = (width - barWidth) / 2;
    const barY = height * 0.6;

    // Background
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Progress fill
    const fillWidth = (barWidth - 4) * (progress / 100);
    const gradient = ctx.createLinearGradient(barX + 2, barY, barX + barWidth - 2, barY);
    gradient.addColorStop(0, '#4A90E2');
    gradient.addColorStop(1, '#FFD700');

    ctx.fillStyle = gradient;
    ctx.fillRect(barX + 2, barY + 2, fillWidth, barHeight - 4);

    // Border
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    // Percentage text
    this.renderer.renderText(
      `${Math.floor(progress)}%`,
      width / 2,
      barY + barHeight + 20,
      { fontSize: 16, align: 'center', color: '#AAAAAA' }
    );

    ctx.restore();

    // Loading hint
    if (progress < 100) {
      const hints = [
        'Tip: Whisper for small jumps',
        'Tip: Speak normally for medium jumps',
        'Tip: Shout loudly for super jumps!',
        'Tip: Chain jumps for combo bonuses'
      ];
      const hintIndex = Math.floor(progress / 25) % hints.length;

      this.renderer.renderText(
        hints[hintIndex],
        width / 2,
        height * 0.8,
        { fontSize: 12, align: 'center', color: '#888888' }
      );
    }
  }
}
