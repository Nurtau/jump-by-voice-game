/**
 * Particle - Single particle
 */
class Particle {
  constructor(x, y, vx, vy, color, size, lifetime) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.lifetime = lifetime;
    this.age = 0;
    this.active = true;
  }

  update(deltaTime) {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.vy += 500 * deltaTime; // Gravity
    this.age += deltaTime;

    if (this.age >= this.lifetime) {
      this.active = false;
    }
  }

  render(ctx) {
    if (!this.active) return;

    const alpha = 1 - (this.age / this.lifetime);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

/**
 * ParticleSystem - Manages particle effects
 */
export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(x, y, count, options = {}) {
    const {
      color = '#FFFFFF',
      size = 4,
      lifetime = 0.5,
      speed = 200,
      spread = Math.PI * 2
    } = options;

    for (let i = 0; i < count; i++) {
      const angle = (spread * i / count) + (Math.random() - 0.5) * 0.5;
      const velocity = speed * (0.5 + Math.random() * 0.5);

      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      this.particles.push(new Particle(
        x,
        y,
        vx,
        vy,
        color,
        size,
        lifetime
      ));
    }
  }

  emitJump(x, y) {
    this.emit(x, y, 5, {
      color: '#87CEEB',
      size: 3,
      lifetime: 0.3,
      speed: 100,
      spread: Math.PI
    });
  }

  emitLanding(x, y) {
    this.emit(x, y, 8, {
      color: '#7EC850',
      size: 4,
      lifetime: 0.4,
      speed: 150,
      spread: Math.PI
    });
  }

  emitCollision(x, y) {
    this.emit(x, y, 15, {
      color: '#FF0000',
      size: 5,
      lifetime: 0.6,
      speed: 250,
      spread: Math.PI * 2
    });
  }

  emitPerfectJump(x, y) {
    this.emit(x, y, 12, {
      color: '#FFD700',
      size: 6,
      lifetime: 0.8,
      speed: 180,
      spread: Math.PI * 2
    });
  }

  update(deltaTime) {
    // Update all particles
    this.particles.forEach(particle => particle.update(deltaTime));

    // Remove dead particles
    this.particles = this.particles.filter(p => p.active);
  }

  render(ctx) {
    this.particles.forEach(particle => particle.render(ctx));
  }

  clear() {
    this.particles = [];
  }
}
