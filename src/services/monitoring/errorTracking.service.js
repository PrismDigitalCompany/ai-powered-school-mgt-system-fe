class ErrorTrackingService {
  constructor() {
    if (new.target === ErrorTrackingService) {
      throw new TypeError(
        "ErrorTrackingService is an abstract class and cannot be instantiated directly.",
      );
    }
  }

  captureException(error, context = {}) {
    this.#notImplemented("captureException");
  }

  captureMessage(message, context = {}) {
    this.#notImplemented("captureMessage");
  }

  setUser(user) {
    this.#notImplemented("setUser");
  }

  clearUser() {
    this.#notImplemented("clearUser");
  }

  #notImplemented(method) {
    throw new Error(`${this.constructor.name} must implement "${method}()".`);
  }
}

export default ErrorTrackingService;
