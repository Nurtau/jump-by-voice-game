import { Entity } from './Entity.js';
import { GameConfig } from '../config/GameConfig.js';

/**
 * Obstacle types
 */
export const ObstacleType = {
  SPIKE: 'spike',
  PIT: 'pit',
  BARREL: 'barrel',
  GAP: 'gap'
};

/**
 * Obstacle configurations
 */
const ObstacleConfigs = {
  [ObstacleType.SPIKE]: {
    width: 40,
    height: 40,
    color: '#8B8B8B',
    deadly: true
  },
  [ObstacleType.PIT]: {
    width: 100,
    height: 40,
    color: GameConfig.COLORS.BRICK_RED,
    deadly: true
  },
  [ObstacleType.BARREL]: {
    width: 50,
    height: 50,
    color: GameConfig.COLORS.GROUND_BROWN,
    deadly: true
  },
  [ObstacleType.GAP]: {
    width: 120,
    height: 100,
    color: null, // No visual (it's a gap)
    deadly: true
  }
};

/**
 * Obstacle - Various obstacles to jump over
 */
export class Obstacle extends Entity {
  constructor(x, type = ObstacleType.SPIKE) {
    const config = ObstacleConfigs[type];
    const y = GameConfig.GROUND_Y - config.height;

    super(x, y, config.width, config.height);

    this.type = type;
    this.config = config;
    this.deadly = config.deadly;
    this.cleared = false; // Has player successfully jumped over it?
  }

  update(deltaTime) {
    // Obstacles are stationary in world space
    // Movement is handled by camera
  }

  render(ctx) {
    const x = this.position.x;
    const y = this.position.y;
    const w = this.size.width;
    const h = this.size.height;

    ctx.save();

    switch (this.type) {
      case ObstacleType.SPIKE:
        this.renderSpike(ctx, x, y, w, h);
        break;

      case ObstacleType.PIT:
        this.renderPit(ctx, x, y, w, h);
        break;

      case ObstacleType.BARREL:
        this.renderBarrel(ctx, x, y, w, h);
        break;

      case ObstacleType.GAP:
        this.renderGap(ctx, x, y, w, h);
        break;
    }

    ctx.restore();
  }

  renderSpike(ctx, x, y, w, h) {
    // Draw spike triangle
    ctx.fillStyle = this.config.color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x + w / 2, y); // Top point
    ctx.lineTo(x, y + h); // Bottom left
    ctx.lineTo(x + w, y + h); // Bottom right
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Add detail lines
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + 5);
    ctx.lineTo(x + w / 2, y + h);
    ctx.stroke();
  }

  renderPit(ctx, x, y, w, h) {
    // Draw fire pit
    ctx.fillStyle = this.config.color;
    ctx.fillRect(x, y, w, h);

    // Add fire effect (simple animated triangles)
    const time = Date.now() / 100;
    ctx.fillStyle = '#FF8C00';

    for (let i = 0; i < w; i += 20) {
      const flameHeight = 10 + Math.sin(time + i) * 5;
      ctx.beginPath();
      ctx.moveTo(x + i + 5, y + h - flameHeight);
      ctx.lineTo(x + i, y + h);
      ctx.lineTo(x + i + 10, y + h);
      ctx.closePath();
      ctx.fill();
    }

    // Yellow flame tips
    ctx.fillStyle = '#FFFF00';
    for (let i = 10; i < w; i += 20) {
      const flameHeight = 8 + Math.cos(time + i) * 4;
      ctx.beginPath();
      ctx.moveTo(x + i + 5, y + h - flameHeight);
      ctx.lineTo(x + i + 2, y + h);
      ctx.lineTo(x + i + 8, y + h);
      ctx.closePath();
      ctx.fill();
    }
  }

  renderBarrel(ctx, x, y, w, h) {
    // Draw barrel
    ctx.fillStyle = this.config.color;

    // Barrel body
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Barrel outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Barrel stripes
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y + h / 3);
    ctx.lineTo(x + w, y + h / 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y + (2 * h) / 3);
    ctx.lineTo(x + w, y + (2 * h) / 3);
    ctx.stroke();
  }

  renderGap(ctx, x, y, w, h) {
    // Draw gap (empty space with darker background)
    const gapY = GameConfig.GROUND_Y;
    const gapHeight = this.size.height;

    // Draw darker background to show depth
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x, gapY, w, gapHeight);

    // Draw danger markers at edges
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(x - 5, gapY, 5, 10);
    ctx.fillRect(x + w, gapY, 5, 10);
  }

  isOffScreen(cameraX, screenWidth) {
    return this.position.x + this.size.width < cameraX - 100;
  }

  isClearedBy(player) {
    // Check if player has passed the obstacle successfully
    if (!this.cleared && player.position.x > this.position.x + this.size.width) {
      this.cleared = true;
      return true;
    }
    return false;
  }
}
