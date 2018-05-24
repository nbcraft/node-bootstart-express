const winston = require('winston');

const pack = require('../../package');
const config = require('../config/config-local.json');

const myFormat = winston.format.printf(info =>
  `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);

module.exports = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.label({ label: pack.name }),
    winston.format.timestamp(),
    winston.format.splat(),
    myFormat,
  ),
  transports: [new winston.transports.Console()],
});
