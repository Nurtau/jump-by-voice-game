import { GameConfig } from '../config/GameConfig.js';

/**
 * Renderer - Handles all canvas rendering
 */
export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.camera = { x: 0, y: 0 };
    this.shake = { x: 0, y: 0, duration: 0 };

    // Enable image smoothing for smooth visuals
    this.ctx.imageSmoothingEnabled = false;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderBackground() {
    // Sky gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, GameConfig.COLORS.SKY_LIGHT);
    gradient.addColorStop(1, GameConfig.COLORS.SKY_BLUE);

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderGround() {
    const groundY = GameConfig.GROUND_Y;
    const groundHeight = this.canvas.height - groundY;

    // Grass layer
    this.ctx.fillStyle = GameConfig.COLORS.GRASS_GREEN;
    this.ctx.fillRect(0, groundY, this.canvas.width, 20);

    // Dirt layer
    const gradient = this.ctx.createLinearGradient(0, groundY + 20, 0, this.canvas.height);
    gradient.addColorStop(0, GameConfig.COLORS.GROUND_BROWN);
    gradient.addColorStop(1, '#654321');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, groundY + 20, this.canvas.width, groundHeight - 20);

    // Grass blades (decorative)
    this.ctx.fillStyle = GameConfig.COLORS.GRASS_DARK;
    for (let x = 0; x < this.canvas.width; x += 40) {
      const offset = Math.sin((x + this.camera.x) * 0.1) * 5;
      this.ctx.fillRect(x + offset, groundY - 10, 3, 10);
      this.ctx.fillRect(x + 10 + offset, groundY - 8, 3, 8);
      this.ctx.fillRect(x + 20 + offset, groundY - 12, 3, 12);
    }
  }

  renderEntity(entity) {
    this.ctx.save();

    // Apply camera transform
    this.ctx.translate(
      -this.camera.x + this.shake.x,
      -this.camera.y + this.shake.y
    );

    // Render the entity
    entity.render(this.ctx);

    this.ctx.restore();
  }

  renderText(text, x, y, options = {}) {
    const {
      fontSize = GameConfig.UI.FONT_SIZE_MEDIUM,
      color = GameConfig.UI.TEXT_COLOR,
      outline = GameConfig.UI.TEXT_OUTLINE,
      outlineWidth = GameConfig.UI.OUTLINE_WIDTH,
      align = 'left'
    } = options;

    this.ctx.save();
    this.ctx.font = `${fontSize}px ${GameConfig.UI.FONT_FAMILY}`;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = 'top';

    // Draw outline
    if (outline) {
      this.ctx.strokeStyle = outline;
      this.ctx.lineWidth = outlineWidth;
      this.ctx.strokeText(text, x, y);
    }

    // Draw text
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);

    this.ctx.restore();
  }

  updateCamera(targetX, targetY) {
    // Smooth camera follow
    const targetCameraX = targetX - this.canvas.width / 3;
    const targetCameraY = 0; // Fixed Y for side-scroller

    // Smooth interpolation
    this.camera.x += (targetCameraX - this.camera.x) * 0.1;
    this.camera.y = targetCameraY;
  }

  addShake(intensity, duration) {
    this.shake.duration = duration;
    this.shake.intensity = intensity;
  }

  updateShake(deltaTime) {
    if (this.shake.duration > 0) {
      this.shake.duration -= deltaTime;

      const intensity = this.shake.intensity || 10;
      this.shake.x = (Math.random() - 0.5) * intensity;
      this.shake.y = (Math.random() - 0.5) * intensity;

      if (this.shake.duration <= 0) {
        this.shake.x = 0;
        this.shake.y = 0;
      }
    }
  }

  getCameraX() {
    return this.camera.x;
  }

  worldToScreen(worldX, worldY) {
    return {
      x: worldX - this.camera.x,
      y: worldY - this.camera.y
    };
  }

  screenToWorld(screenX, screenY) {
    return {
      x: screenX + this.camera.x,
      y: screenY + this.camera.y
    };
  }
}
