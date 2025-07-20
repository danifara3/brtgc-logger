import { formatTimestamp } from "./utils/timestampFormat";

export interface ClientLogConfig {
  level?: "info" | "warn" | "error" | "debug";
  sendToServer?: boolean;
}

export function clientLog(...args: unknown[]) {
  if (process.env.NODE_ENV !== "development") return;

  let config: ClientLogConfig = {};
  let logArgs: unknown[] = args;

  if (
    args.length &&
    typeof args[args.length - 1] === "object" &&
    args[args.length - 1] !== null
  ) {
    const lastArg = args[args.length - 1] as Record<string, unknown>;
    if ("level" in lastArg || "sendToServer" in lastArg) {
      config = lastArg as ClientLogConfig;
      logArgs = args.slice(0, -1);
    }
  }

  const { level = "info", sendToServer = false } = config;
  const timestamp = formatTimestamp();

const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const styleMap = {
  info: isDarkMode ? "color: #91cfff;" : "color: #004085;",
  warn: isDarkMode ? "color: #ffcc66;" : "color: #856404;",
  error: isDarkMode ? "color: #ff6b6b;" : "color: #721c24;",
  debug: isDarkMode ? "color: #a5e075;" : "color: #155724;",
};


  console.log(
    `%c[${level.toUpperCase()}] ${timestamp}`,
    styleMap[level] || "color: grey;",
    ...logArgs
  );

  if (sendToServer) {
    const payload = {
      message: logArgs
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        )
        .join(" "),
      level,
      args: logArgs,
      timestamp,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
    };

    fetch("/api/client-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(console.error);
  }
}
