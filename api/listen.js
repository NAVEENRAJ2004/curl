const { getStore } = require("./_store");

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => resolve(data));
    req.on("error", (error) => reject(error));
  });
}

function parseBody(raw, contentType) {
  if (!raw) {
    return null;
  }

  if (contentType && contentType.includes("application/json")) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }

  return raw;
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const store = getStore();
  const rawBody = await readBody(req);
  const contentType = req.headers["content-type"] || "";

  const entry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    receivedAt: new Date().toISOString(),
    method: req.method,
    headers: req.headers,
    body: parseBody(rawBody, contentType)
  };

  store.events.unshift(entry);
  store.events = store.events.slice(0, 50);

  res.status(200).json({ ok: true, received: entry });
};
