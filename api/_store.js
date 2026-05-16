function getStore() {
  if (!globalThis.__webhookStore) {
    globalThis.__webhookStore = {
      events: []
    };
  }

  return globalThis.__webhookStore;
}

module.exports = { getStore };
