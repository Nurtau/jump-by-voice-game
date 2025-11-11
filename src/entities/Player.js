import { Entity } from './Entity.js';
import { GameConfig } from '../config/GameConfig.js';

/**
 * Player - The main character controlled by voice
 */
export class Player extends Entity {
  constructor(x, y) {
    super(x, y, GameConfig.PLAYER.WIDTH, GameConfig.PLAYER.HEIGHT);

    this.hasGravity = true;
    this.runSpeed = GameConfig.PLAYER.RUN_SPEED;
    this.jumpPowers = GameConfig.PLAYER.JUMP_POWERS;
    this.isJumping = false;
    this.canJump = true;
    this.animationState = 'running';
    this.animationFrame = 0;
    this.animationTime = 0;
    this.lives = 3;
    this.invincible = false;
    this.invincibleTime = 0;
  }

  jump() {
    if (this.isGrounded && this.canJump) {
      // Start with a small base jump velocity
      this.velocity.y = -GameConfig.PLAYER.BASE_JUMP_VELOCITY;
      this.isJumping = true;
      this.isGrounded = false;
      this.animationState = 'jumping';
      this.canJump = false;

      // Reset jump cooldown
      setTimeout(() => {
        this.canJump = true;
      }, GameConfig.VOICE.COOLDOWN);

      return true;
    }
    return false;
  }

  /**
   * Apply voice boost while ascending
   * @param {number} strength - Jump strength (0-4) based on voice volume
   */
  applyVoiceBoost(strength) {
    // Only apply boost while ascending (negative velocity = going up)
    if (this.isJumping && this.velocity.y < 0 && strength > 0) {
      // Apply upward acceleration based on voice strength
      const boostPower = GameConfig.PLAYER.VOICE_BOOST_POWERS[strength];
      this.velocity.y -= boostPower;

      // Cap maximum upward velocity to prevent infinite boost
      const maxUpwardVelocity = -GameConfig.PLAYER.MAX_JUMP_VELOCITY;
      if (this.velocity.y < maxUpwardVelocity) {
        this.velocity.y = maxUpwardVelocity;
      }
    }
  }

  onLand() {
    this.isJumping = false;
    this.animationState = 'running';
  }

  takeDamage() {
    if (this.invincible) return false;

    this.lives--;
    this.invincible = true;
    this.invincibleTime = 2.0; // 2 seconds invincibility

    return true;
  }

  update(deltaTime) {
    // Constant forward movement
    this.velocity.x = this.runSpeed;

    // Update invincibility
    if (this.invincible) {
      this.invincibleTime -= deltaTime;
      if (this.invincibleTime <= 0) {
        this.invincible = false;
      }
    }

    // Update animation
    this.animationTime += deltaTime;
    if (this.animationState === 'running' && this.animationTime > 0.1) {
      this.animationFrame = (this.animationFrame + 1) % 4;
      this.animationTime = 0;
    }
  }

  render(ctx) {
    ctx.save();

    // Flicker when invincible
    if (this.invincible && Math.floor(this.invincibleTime * 10) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    // Draw player as a simple character for now
    const x = this.position.x;
    const y = this.position.y;
    const w = this.size.width;
    const h = this.size.height;

    // Body (blue)
    ctx.fillStyle = GameConfig.COLORS.HERO_BLUE;
    ctx.fillRect(x + 8, y + 15, w - 16, h - 25);

    // Head (blue circle)
    ctx.beginPath();
    ctx.arc(x + w / 2, y + 12, 12, 0, Math.PI * 2);
    ctx.fillStyle = GameConfig.COLORS.HERO_BLUE;
    ctx.fill();

    // Eyes (white)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + 12, y + 8, 4, 4);
    ctx.fillRect(x + 24, y + 8, 4, 4);

    // Legs (animated when running)
    ctx.fillStyle = GameConfig.COLORS.HERO_BLUE;
    if (this.animationState === 'running') {
      const legOffset = this.animationFrame < 2 ? 0 : 5;
      ctx.fillRect(x + 10, y + h - 10, 8, 10);
      ctx.fillRect(x + 22 + legOffset, y + h - 10, 8, 10);
    } else {
      ctx.fillRect(x + 10, y + h - 10, 8, 10);
      ctx.fillRect(x + 22, y + h - 10, 8, 10);
    }

    // Arms (orange accents)
    ctx.fillStyle = GameConfig.COLORS.HERO_ORANGE;
    ctx.fillRect(x + 5, y + 25, 6, 15);
    ctx.fillRect(x + 29, y + 25, 6, 15);

    ctx.restore();
  }

  reset() {
    this.position.x = GameConfig.PLAYER.START_X;
    this.position.y = GameConfig.GROUND_Y - this.size.height;
    this.velocity = { x: 0, y: 0 };
    this.lives = 3;
    this.invincible = false;
    this.isJumping = false;
    this.animationState = 'running';
  }
}
