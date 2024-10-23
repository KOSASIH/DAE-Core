import winston from 'winston';

/**
 * Logger utility for logging messages with different severity levels.
 */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

/**
 * Logs an info message.
 * @param {string} message - The message to log.
 */
export const logInfo = (message) => {
    logger.info(message);
};

/**
 * Logs an error message.
 * @param {string} message - The message to log.
 */
export const logError = (message) => {
    logger.error(message);
};

export default logger;
