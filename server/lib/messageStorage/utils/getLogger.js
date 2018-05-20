const {createLogger, format, transports} = require('winston');
const {combine, timestamp, prettyPrint} = format;

const logger = createLogger({
  format: combine(
    format.colorize(),
    format.align(),
    timestamp(),
    prettyPrint(),
    format.simple(),
  ),
  transports: [
    new transports.Console()
    // new transports.File({filename: 'combined.log'})
  ]
});

module.exports = logger;