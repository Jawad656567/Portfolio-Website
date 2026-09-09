const { test } = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const Profile = require("../models/profile");
const routes = require("../routes/profile");
const userRoutes = require("../routes/user");

test("visitors can read portfolio images while uploads and admin profiles stay protected", async (t) => {
  const images = { banner: "https://example.com/banner.jpg", profilePic: "https://example.com/profile.jpg" };
  const find = t.mock.method(Profile, "findOne", async () => images);
  const save = t.mock.method(Profile.prototype, "save", async () => {
    throw new Error("Public GET must not write to the database");
  });
  const app = express();
  app.use("/api/profile", routes);
  app.use("/api/user", userRoutes);
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;

  const response = await fetch(`${base}/api/profile`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), images);
  assert.equal((await fetch(`${base}/api/profile/upload`, { method: "POST" })).status, 401);
  assert.equal((await fetch(`${base}/api/user/profile`)).status, 401);

  find.mock.mockImplementation(async () => null);
  const empty = await fetch(`${base}/api/profile`);
  assert.equal(empty.status, 200);
  assert.deepEqual(await empty.json(), { banner: null, profilePic: null });
  assert.equal(save.mock.callCount(), 0);
});
