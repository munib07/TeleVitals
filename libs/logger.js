// Description: This file contains the logger configuration.
const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const logger = winston.createLogger({
    format: combine(
        timestamp({ format: timestampFormat }),
        printf(({ timestamp, level, message, ...data }) => {
            const response = {
                level,
                timestamp,
                message,
                data,
            };

            return `${timestamp} [${level}]: ${message} ${Object.keys(data).length ? JSON.stringify(data) : ''}`;
        })
    ),
    // store logs in the console
    transports: [
        new winston.transports.Console()
    ],
});

module.exports = logger;