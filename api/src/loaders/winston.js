const config = require('../config/index');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}] : ${message}`;
  });


//In the future level tag could be impplemented
const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'INFO' }),
        timestamp(),
        myFormat
    ),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new transports.Console(),
      new transports.File({ filename:  config.dir_log, level: 'info' })
      
    ]
  });


module.exports = logger;