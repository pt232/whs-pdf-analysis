import getTimeStamp from "../utils/timestamp";

function info(fileName: string, message: string): void {
  console.info(formatBaseMessage("info", fileName, message));
}

function warn(fileName: string, message: string): void {
  console.warn(formatBaseMessage("warn", fileName, message));
}

function error(fileName: string, message: string): void {
  console.error(formatBaseMessage("error", fileName, message));
}

function debug(fileName: string, message: string): void {
  console.debug(formatBaseMessage("debug", fileName, message));
}

function formatBaseMessage(level: string, fileName: string, message: string): string {
  return `[${getTimeStamp()}] [${level.toUpperCase()}] [${fileName.toUpperCase()}] ${message}`;
}

function formatMessageContent(method: string, url: string, status?: number): string {
  if (status == null) return `METHOD: [${method}] - URL: [${url}]`;
  return `METHOD: [${method}] - URL: [${url}] - STATUS: [${status}]`;
}

export default {
  info,
  warn,
  error,
  debug,
  formatMessageContent,
};
