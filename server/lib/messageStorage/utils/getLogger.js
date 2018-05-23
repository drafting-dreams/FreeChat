const {createLogger, format, transports} = require('winston');
const {combine, prettyPrint, printf} = format;


const myFormat = printf(info => {
  const stringifiedRest = JSON.stringify(Object.assign({}, info, {
    level: undefined,
    message: undefined,
    splat: undefined,
    timestamp: undefined
  }));

  return `[${info.level}]: ${JSON.stringify(info.message)}  ${stringifiedRest.length > 2 ? stringifiedRest:''}`;
});
const logger = createLogger({
  level: 'debug',
  format: combine(
    format.colorize(),
    // format.align(),
    // format.json(),
    prettyPrint(),
    // format.simple()
    myFormat
  ),
  transports: [
    new transports.Console()
    // new transports.File({filename: 'combined.log'})
  ]
});

module.exports = logger;