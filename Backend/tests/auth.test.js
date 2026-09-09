const { test } = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const getAuthCookieOptions = require("../utils/authCookie");
const routes = require("../routes/user");

test("cookie settings support local HTTP and production cross-site HTTPS", () => {
  const previous = { NODE_ENV: process.env.NODE_ENV, VERCEL: process.env.VERCEL };
  try {
    process.env.NODE_ENV = "development";
    delete process.env.VERCEL;
    assert.deepEqual(getAuthCookieOptions(), {
      httpOnly: true, secure: false, sameSite: "lax", path: "/",
    });
    process.env.NODE_ENV = "production";
    assert.equal(getAuthCookieOptions().sameSite, "none");
    assert.equal(getAuthCookieOptions().secure, true);
    process.env.NODE_ENV = "development";
    process.env.VERCEL = "1";
    assert.equal(getAuthCookieOptions().secure, true);
    assert.equal(getAuthCookieOptions().sameSite, "none");
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("login issues cookie, profile accepts it, and logout clears matching cookie", async (t) => {
  const previous = { NODE_ENV: process.env.NODE_ENV, ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET };
  process.env.NODE_ENV = "production";
  process.env.ACCESS_TOKEN_SECRET = "test-only-secret";
  t.after(() => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  const user = { _id: "test-user", username: "admin" };
  t.mock.method(User, "findOne", async () => ({
    ...user,
    isPasswordCorrect: async (password) => password === "correct-password",
    generateAccessToken: () => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" }),
  }));
  t.mock.method(User, "findById", () => ({ select: async () => user }));
  const app = express();
  app.use(express.json(), cookieParser());
  app.use("/api/user", routes);
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}/api/user`;
  const login = await fetch(`${base}/login`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "correct-password" }),
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie");
  for (const attribute of ["HttpOnly", "Secure", "SameSite=None", "Path=/"]) {
    assert.ok(cookie.includes(attribute), attribute);
  }
  assert.equal((await login.json()).accessToken, undefined);
  const headers = { Cookie: cookie.split(";")[0] };
  const profile = await fetch(`${base}/profile`, { headers });
  assert.equal(profile.status, 200);
  assert.deepEqual((await profile.json()).user, user);
  assert.equal((await fetch(`${base}/profile`)).status, 401);
  const logout = await fetch(`${base}/logout`, { method: "POST", headers });
  assert.equal(logout.status, 200);
  const cleared = logout.headers.get("set-cookie");
  assert.ok(cleared.startsWith("accessToken=;"));
  for (const attribute of ["HttpOnly", "Secure", "SameSite=None", "Path=/", "Expires=Thu, 01 Jan 1970"]) {
    assert.ok(cleared.includes(attribute), attribute);
  }
});
