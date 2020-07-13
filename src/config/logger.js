/**
 * Dependencies
 */
const path = require('path');
const fs = require('fs');
const {
    createLogger,
    format,
    transports,
} = require('winston');
require('winston-daily-rotate-file');


/**
 * Local modules
 */
const {
    env,
} = require('./vars');


const {
    combine,
    label,
    timestamp,
    printf,
    prettyPrint,
} = format;

// Create logs folder if not exists
const pathToLogFolder = path.join(__dirname, '../../logs');
const pathToAccessLogFolder = path.join(__dirname, '../../logs/access');
const pathToErrorLogFolder = path.join(__dirname, '../../logs/error');
const pathToAuditLogFolder = path.join(__dirname, '../../logs/audit');

if (!fs.existsSync(pathToLogFolder)) {
    fs.mkdirSync(pathToLogFolder);
}
if (!fs.existsSync(pathToAccessLogFolder)) {
    fs.mkdirSync(pathToAccessLogFolder);
}
if (!fs.existsSync(pathToErrorLogFolder)) {
    fs.mkdirSync(pathToErrorLogFolder);
}
if (!fs.existsSync(pathToAuditLogFolder)) {
    fs.mkdirSync(pathToAuditLogFolder);
}

const options = {
    info: {
        level: 'info',
        dirname: `${pathToLogFolder}/access`,
        filename: '%DATE%-access.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        auditFile: `${pathToLogFolder}/audit/access-audit.json`,
        maxSize: '20m',
        maxFiles: '7d',
    },
    error: {
        level: 'error',
        dirname: `${pathToLogFolder}/error`,
        filename: '%DATE%-error.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        auditFile: `${pathToLogFolder}/audit/error-audit.json`,
        maxSize: '20m',
        maxFiles: '14d',
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const myFormat = printf((
    {
        level,
        message,
        label,
    },
) => {
    return `[${label}] ${level}: ${decodeURI(message.trim())}`;
});

const logger = createLogger({
    format: combine(
        label({
            label: 'main',
        }),
        // timestamp(),
        prettyPrint(),
        myFormat,
    ),
    transports: [
        new transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

if (env === 'production') {
    logger.add(new transports.DailyRotateFile(options.error));
    logger.add(new transports.DailyRotateFile(options.info));
}

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    },
};

module.exports = logger;
