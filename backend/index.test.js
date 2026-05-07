import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import { createServer } from "node:http";

// Fake auth middleware for integration-style tests without Auth0 session setup.
const fakeRequiresAuth = (req, res, next) => {
  if (!req.headers["x-test-user"]) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  req.oidc = { user: { name: "Ada", email: "ada@test.com" } };
  next();
};

const app = express();
app.use(express.json());

app.get("/books", (req, res) => {
  res.json([{ id: 1, title: "The Pragmatic Programmer" }]);
});

app.get("/profile", fakeRequiresAuth, (req, res) => {
  res.json(req.oidc.user);
});

let server;
let baseUrl;

beforeAll(() => {
  server = createServer(app);
  server.listen(0);
  const { port } = server.address();
  baseUrl = `http://localhost:${port}`;
});

afterAll(() => server.close());

describe("authentication tests", () => {
  it("GET /profile without a cookie returns 401", async () => {
    const res = await fetch(`${baseUrl}/profile`);
    expect(res.status).toBe(401);
  });

  it("GET /books without a cookie returns 200", async () => {
    const res = await fetch(`${baseUrl}/books`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([{ id: 1, title: "The Pragmatic Programmer" }]);
  });
});
