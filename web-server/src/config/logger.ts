const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, timestamp }: any) => {
    return `${timestamp} ${level}: ${message}`;
});

const options = {
  fileInfo: new transports.File({
    level: 'info',
    filename: 'logs/combined.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: format.combine(
      format.timestamp(),
      format.json(),
      myFormat
    ),
  }),
  fileError: new transports.File({
    level: 'error',
    filename: 'logs/error.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: format.combine(
      format.timestamp(),
      format.json(),
      myFormat
    ),
  }),
  console: new transports.Console({
    level: 'debug',
    handleExceptions: true,
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
  }),
};

const logger = createLogger({
  transports: [
    options.fileInfo,
    options.fileError,
    options.console
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default logger;
