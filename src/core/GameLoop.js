/**
 * GameLoop - Manages the main game loop
 */
export class GameLoop {
  constructor(updateFn, renderFn) {
    this.update = updateFn;
    this.render = renderFn;
    this.lastTime = 0;
    this.running = false;
    this.rafId = null;
    this.fps = 60;
    this.frameCount = 0;
    this.lastFpsUpdate = 0;
    this.currentFps = 60;
  }

  start() {
    if (this.running) return;

    this.running = true;
    this.lastTime = performance.now();
    this.lastFpsUpdate = this.lastTime;
    this.loop(this.lastTime);
  }

  loop(currentTime) {
    if (!this.running) return;

    // Calculate delta time in seconds
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    // Update FPS counter
    this.frameCount++;
    if (currentTime - this.lastFpsUpdate >= 1000) {
      this.currentFps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = currentTime;
    }

    // Update and render
    this.update(deltaTime);
    this.render();

    // Schedule next frame
    this.rafId = requestAnimationFrame((time) => this.loop(time));
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  pause() {
    this.running = false;
  }

  resume() {
    if (!this.running) {
      this.running = true;
      this.lastTime = performance.now();
      this.loop(this.lastTime);
    }
  }

  getFPS() {
    return this.currentFps;
  }
}
