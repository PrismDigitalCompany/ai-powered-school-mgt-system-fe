

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write failures (e.g. storage disabled/full)
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};
