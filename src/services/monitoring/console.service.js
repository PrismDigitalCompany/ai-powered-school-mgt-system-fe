import ErrorTrackingService from "./errorTracking.service";

class ConsoleTrackingService extends ErrorTrackingService {
  #user = null;

  captureException(error, context = {}) {
    console.groupCollapsed(`%c Exception`, "color:#dc2626;font-weight:bold;");

    console.error(error);

    if (this.#user) {
      console.info("User", this.#user);
    }

    if (Object.keys(context).length > 0) {
      console.info("Context", context);
    }

    console.groupEnd();
  }

  captureMessage(message, context = {}) {
    console.groupCollapsed(`%c Message`, "color:#2563eb;font-weight:bold;");

    console.info(message);

    if (this.#user) {
      console.info("User", this.#user);
    }

    if (Object.keys(context).length > 0) {
      console.info("Context", context);
    }

    console.groupEnd();
  }

  setUser(user) {
    this.#user = user;
  }

  clearUser() {
    this.#user = null;
  }
}

const consoleTrackingService = new ConsoleTrackingService();

export default consoleTrackingService;
