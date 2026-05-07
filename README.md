# Security Testing — Authentication

Practice exercise for security and authentication testing using Express, Auth0 (mocked), Vitest, and React.

## Project Structure

```
├── backend/
│   ├── index.js              # Express server with fake auth middleware
│   ├── index.test.js         # Integration tests for /profile and /books
│   ├── middleware/
│   │   ├── auth.js           # Auth0 config (uses fake middleware locally)
│   │   └── index.test.js     # Tests for /profile and /secure-data
│   └── .env.example          # Environment variable template
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Profile.jsx          # Profile component with axios + withCredentials
│   │   │   └── Profile.test.jsx     # Component tests with mocked axios
│   │   └── setupTests.js
│   └── vite.config.js
```

## Getting Started

### Backend
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:3000`

### Client
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`

## API Routes

| Method | Route | Auth required | Description |
|--------|-------|---------------|-------------|
| GET | `/` | No | Health check |
| GET | `/books` | No | Returns hardcoded book list |
| GET | `/profile` | Yes | Returns logged-in user data |
| GET | `/secure-data` | Yes | Returns protected message |

## Fake Authentication (local dev)

Since Auth0 is not configured locally, the backend uses a fake middleware.  
To simulate an authenticated request, add this header:

```
x-test-user: true
```

Without it → `401 Unauthorized`  
With it → `200` + user data

## Running Tests

```bash
# Backend
cd backend && npx vitest --run

# Client
cd client && npx vitest --run
```

## Part 4 — Reflection

A **session cookie** is like a wristband at an amusement park — the server remembers it and knows who you are every time you come back. A **JWT** is like a ticket with your name printed on it — you carry it yourself and show it to whoever needs to verify you, without anyone having to remember you. I would use a session cookie for a normal website with a login, like an online store. I would use a JWT when a mobile app needs to talk to multiple different servers.
