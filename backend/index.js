import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Fake auth middleware — replaces Auth0 for local development without credentials
const requiresAuth = () => (req, res, next) => {
  if (!req.headers["x-test-user"] && !req.headers["cookie"]) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  req.oidc = { user: { name: "Ada", email: "ada@test.com" } };
  next();
};

// Public route
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

// Public books route
app.get("/books", (req, res) => {
  res.json([{ id: 1, title: "The Pragmatic Programmer" }]);
});

// Protected profile route
app.get("/profile", requiresAuth(), (req, res) => {
  res.json(req.oidc.user);
});

// Protected secure-data route
app.get("/secure-data", requiresAuth(), (req, res) => {
  res.json({
    message: "This is protected data",
    user: req.oidc.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});