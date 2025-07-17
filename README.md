# brtgc-logger

A lightweight client and server logging utility for full-stack TypeScript/JavaScript apps.

## Installation

```bash
npm install brtgc-logger

## Usage

### Server (e.g. in API routes or backend handlers)

```ts
import { serverLog } from "brtgc-logger";

// Logs a warning in development or if `always: true`
await serverLog("Something happened", { user: "admin" }, { level: "warn" });

###Client (e.g. inside React components or frontend scripts)

```ts
import { clientLog } from "brtgc-logger";

// Logs to browser console and optionally sends to server
clientLog("Hello from client!", { level: "info", sendToServer: true });

Happy coding!!!