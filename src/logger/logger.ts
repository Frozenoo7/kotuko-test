import { createLogger, format, transports } from "winston";

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  /**Later on this logs can be integrated to log mangement tools */
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
