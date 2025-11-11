/**
 * Entity - Base class for all game entities
 */
export class Entity {
  constructor(x, y, width, height) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.size = { width, height };
    this.active = true;
    this.hasGravity = false;
    this.isGrounded = false;
  }

  update(deltaTime) {
    // Override in subclasses
  }

  render(ctx) {
    // Override in subclasses
  }

  getBounds() {
    return {
      left: this.position.x,
      right: this.position.x + this.size.width,
      top: this.position.y,
      bottom: this.position.y + this.size.height
    };
  }

  intersects(other) {
    const a = this.getBounds();
    const b = other.getBounds();

    return !(
      a.right < b.left ||
      a.left > b.right ||
      a.bottom < b.top ||
      a.top > b.bottom
    );
  }

  destroy() {
    this.active = false;
  }
}
