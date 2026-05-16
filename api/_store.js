function getStore() {
  if (!globalThis.__webhookStore) {
    globalThis.__webhookStore = {
      events: []
    };
  }

  return globalThis.__webhookStore;
}

function getRedisConfig() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_URL ||
    process.env.REDIS_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_REST_TOKEN;

  return { url, token };
}

function isRedisConfigured() {
  const { url, token } = getRedisConfig();
  return Boolean(url && token);
}

function getRedisClient() {
  const { Redis } = require("@upstash/redis");
  const { url, token } = getRedisConfig();
  return new Redis({ url, token });
}

async function appendEvent(entry) {
  if (isRedisConfigured()) {
    const redis = getRedisClient();
    await redis.lpush("webhook:events", JSON.stringify(entry));
    await redis.ltrim("webhook:events", 0, 49);
    return;
  }

  const store = getStore();
  store.events.unshift(entry);
  store.events = store.events.slice(0, 50);
}

async function readEvents() {
  if (isRedisConfigured()) {
    const redis = getRedisClient();
    const items = await redis.lrange("webhook:events", 0, 49);
    return (items || []).map((item) => {
      try {
        return JSON.parse(item);
      } catch {
        return { raw: item };
      }
    });
  }

  const store = getStore();
  return store.events;
}

module.exports = {
  appendEvent,
  readEvents
};
