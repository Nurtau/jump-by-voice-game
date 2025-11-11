import { GameConfig } from '../config/GameConfig.js';

/**
 * PhysicsEngine - Handles physics simulation
 */
export class PhysicsEngine {
  constructor() {
    this.gravity = GameConfig.GRAVITY;
    this.entities = [];
  }

  addEntity(entity) {
    if (!this.entities.includes(entity)) {
      this.entities.push(entity);
    }
  }

  removeEntity(entity) {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      if (!entity.active) return;

      // Apply gravity
      if (entity.hasGravity) {
        entity.velocity.y += this.gravity * deltaTime;

        // Cap fall speed
        if (entity.velocity.y > GameConfig.PLAYER.MAX_FALL_SPEED) {
          entity.velocity.y = GameConfig.PLAYER.MAX_FALL_SPEED;
        }
      }

      // Update position based on velocity
      entity.position.x += entity.velocity.x * deltaTime;
      entity.position.y += entity.velocity.y * deltaTime;

      // Ground collision for entities with gravity
      if (entity.hasGravity) {
        const groundY = GameConfig.GROUND_Y - entity.size.height;
        if (entity.position.y >= groundY) {
          entity.position.y = groundY;
          entity.velocity.y = 0;
          entity.isGrounded = true;

          if (entity.onLand) {
            entity.onLand();
          }
        } else {
          entity.isGrounded = false;
        }
      }
    });
  }

  checkCollision(entity1, entity2) {
    if (!entity1.active || !entity2.active) return false;

    const bounds1 = entity1.getBounds();
    const bounds2 = entity2.getBounds();

    return !(
      bounds1.right < bounds2.left ||
      bounds1.left > bounds2.right ||
      bounds1.bottom < bounds2.top ||
      bounds1.top > bounds2.bottom
    );
  }

  checkCollisions(player, obstacles) {
    const collisions = [];

    obstacles.forEach(obstacle => {
      if (this.checkCollision(player, obstacle)) {
        collisions.push(obstacle);
      }
    });

    return collisions;
  }

  reset() {
    this.entities = [];
  }
}
