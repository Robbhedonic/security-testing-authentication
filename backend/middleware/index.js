import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/auth.js";
import { requiresAuth } from "express-openid-connect";

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
app.use(authMiddleware);

// Public route
app.get("/", (req, res) => {
  res.json({ message: "API running", isAuthenticated: req.oidc.isAuthenticated() });
});

// Optional challenge: return current user or null (no auth required)
app.get("/me", (req, res) => {
  res.json(req.oidc.isAuthenticated() ? req.oidc.user : null);
});

// Task A: protected profile route
app.get("/profile", requiresAuth(), (req, res) => {
  res.json(req.oidc.user);
});

// Task B: protected secure-data route
app.get("/secure-data", requiresAuth(), (req, res) => {
  res.json({
    message: "This is protected data",
    user: req.oidc.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});