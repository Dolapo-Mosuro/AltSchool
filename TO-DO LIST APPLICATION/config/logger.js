// logger.js
const winston = require("winston");
const { createLogger, format, transports } = winston;

const logger = createLogger({
	level: "info", // Log only info and above levels
	format: format.combine(
		format.colorize(),
		format.timestamp(),
		format.printf(({ timestamp, level, message }) => {
			return `${timestamp} [${level}]: ${message}`;
		})
	),
	transports: [
		new transports.Console(), // Log to the console
		new transports.DailyRotateFile({
			filename: "logs/%DATE%.log",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "14d", // Keep logs for 14 days
		}),
	],
});

module.exports = logger;
