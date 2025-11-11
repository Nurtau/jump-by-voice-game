/**
 * InputHandler - Handles keyboard and other inputs
 */
export class InputHandler {
  constructor() {
    this.keys = {};
    this.keyDownHandlers = {};
    this.keyUpHandlers = {};

    this.init();
  }

  init() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  onKeyDown(e) {
    this.keys[e.code] = true;

    if (this.keyDownHandlers[e.code]) {
      this.keyDownHandlers[e.code](e);
      e.preventDefault();
    }
  }

  onKeyUp(e) {
    this.keys[e.code] = false;

    if (this.keyUpHandlers[e.code]) {
      this.keyUpHandlers[e.code](e);
      e.preventDefault();
    }
  }

  isKeyPressed(code) {
    return this.keys[code] || false;
  }

  onKey(code, downHandler, upHandler) {
    if (downHandler) {
      this.keyDownHandlers[code] = downHandler;
    }
    if (upHandler) {
      this.keyUpHandlers[code] = upHandler;
    }
  }

  clearHandlers() {
    this.keyDownHandlers = {};
    this.keyUpHandlers = {};
  }
}
