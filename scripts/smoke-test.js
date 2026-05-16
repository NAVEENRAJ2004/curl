const listen = require("../api/listen");
const events = require("../api/events");

if (typeof listen !== "function") {
  throw new Error("listen handler missing");
}

if (typeof events !== "function") {
  throw new Error("events handler missing");
}

console.log("smoke ok");
