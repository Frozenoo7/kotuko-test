import { createLogger, format, transports } from "winston";

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: "app-error.log",
      level: "error",
    }),
    new transports.File({
      filename: "app-warn.log",
      level: "warn",
    }),
  ],
});

export { logger };
