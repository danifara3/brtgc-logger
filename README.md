# brtgc-logger

A lightweight and flexible logging utility for both client and server environments in full-stack TypeScript/JavaScript apps.

---

## 📦 Installation

Install via npm:

```bash
npm install brtgc-logger

```bash
npm install --save-dev brtgc-logger

## ✨ Features

Works in Node.js (server) and browser (client) environments

Supports log levels: info, warn, error, debug

Styled browser console output

Optional server-side forwarding from the client

Includes timestamp and user/device metadata


## 🚀 Usage

### Server (e.g. in API routes, backend services, CLI tools)

import { serverLog } from "brtgc-logger";

// Basic info log
await serverLog("Starting app...");

// Log with object context
await serverLog("DB connection failed", { retry: true });

// Log with level and options
await serverLog("User not authorized", { userId: 123 }, { level: "warn" });

// Force log in production (override NODE_ENV check)
await serverLog("CRITICAL: Payment gateway down!", { orderId: "A12" }, { always: true });


### Client (e.g. inside React components, Next.js pages, browser scripts)

import { clientLog } from "brtgc-logger";

// Simple info log
clientLog("Component mounted");

// With metadata and log level
clientLog("Fetching data", { userId: "abc123" }, { level: "debug" });

// Send to server (e.g. for crash/error tracking)
clientLog("Unhandled error", { errorCode: 500 }, { level: "error", sendToServer: true });

### 📝 Note: When sendToServer: true is set, logs are POSTed to /api/client-log. You'll need to create this API endpoint in your app to receive and handle logs.

## 📄 API Reference

### serverLog(...messages: unknown[], options?: ServerLogOptions)

| Option   | Type                                     | Description                       |
| -------- | ---------------------------------------- | --------------------------------- |
| `level`  | `"info"`, `"warn"`, `"error"`, `"debug"` | Log level                         |
| `always` | `boolean`                                | If `true`, log even in production |

### clientLog(...messages: unknown[], config?: ClientLogConfig)

| Option         | Type                                     | Description                                        |
| -------------- | ---------------------------------------- | -------------------------------------------------- |
| `level`        | `"info"`, `"warn"`, `"error"`, `"debug"` | Log level                                          |
| `sendToServer` | `boolean`                                | If `true`, sends log to `/api/client-log` endpoint |

### Example Server Log Output

[INFO] 2025-07-17 21:00:00: User created { id: "123", email: "test@example.com" }
[ERROR] 2025-07-17 21:01:30: Payment failed { orderId: "A100" }

### Example Client Log Output (Browser Console)

[INFO] 2025-07-17 21:01:30: Client side message

### Sending Client Logs to Server

Make sure you have an API route like /api/client-log in your app to handle logs sent from the frontend:

// pages/api/client-log.ts (Next.js example)
export default async function handler(req, res) {
  const body = req.body;

  // Save to database, forward to external logging service, etc.
  console.log("[CLIENT LOG]", body);

  res.status(200).json({ success: true });
}

MIT © 2025 — Developed by BRTGC - https://brtgc.org/


Happy coding!!!