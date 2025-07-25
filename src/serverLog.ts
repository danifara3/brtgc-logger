import { formatTimestamp } from "./utils/timestampFormat";

export interface ServerLogOptions {
  level?: "info" | "warn" | "error" | "debug";
  always?: boolean;
}

export async function serverLog(...args: unknown[]) {
  let options: ServerLogOptions = {};
  let messages: unknown[] = args;

  if (
    args.length &&
    typeof args[args.length - 1] === "object" &&
    ("level" in (args[args.length - 1] as object) ||
      "always" in (args[args.length - 1] as object))
  ) {
    options = args[args.length - 1] as ServerLogOptions;
    messages = args.slice(0, -1);
  }

  const { level = "info", always = false } = options;
  const shouldLog = process.env.NODE_ENV === "development" || always;

  if (!shouldLog) return;

  const timestamp = formatTimestamp();

  const colorMap = {
    info: "\x1b[34m",
    warn: "\x1b[33m",
    error: "\x1b[31m",
    debug: "\x1b[32m",
  };
  const resetColor = "\x1b[0m";

  console.log(
    `${colorMap[level] || ""}[${level.toUpperCase()}]${resetColor} ${timestamp}:`,
    ...messages
  );
}
