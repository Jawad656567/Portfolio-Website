const { test } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const { requireDatabase } = require("../middlewares/database");

test("concurrent requests wait for one database connection before entering routes", async (t) => {
  let resolveConnection;
  const pending = new Promise((resolve) => { resolveConnection = resolve; });
  const connect = t.mock.method(mongoose, "connect", () => pending);
  let entered = 0;
  const first = requireDatabase({}, {}, () => { entered++; });
  const second = requireDatabase({}, {}, () => { entered++; });
  assert.equal(entered, 0);
  assert.equal(connect.mock.callCount(), 1);
  resolveConnection();
  await Promise.all([first, second]);
  assert.equal(entered, 2);
});

test("failed connections return 503 and the next request retries", async (t) => {
  const connect = t.mock.method(mongoose, "connect", async () => { throw new Error("offline"); });
  t.mock.method(console, "error", () => {});
  const response = {
    set(name, value) { assert.equal(name, "Retry-After"); assert.equal(value, "5"); },
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; },
  };
  let entered = false;
  await requireDatabase({}, response, () => { entered = true; });
  assert.equal(response.code, 503);
  assert.equal(entered, false);
  connect.mock.mockImplementation(async () => {});
  await requireDatabase({}, {}, () => { entered = true; });
  assert.equal(connect.mock.callCount(), 2);
  assert.equal(entered, true);
});
