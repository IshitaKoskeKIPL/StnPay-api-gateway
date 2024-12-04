import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { Config } from 'src/config';
import * as winston from 'winston';
import * as WinstonCloudwatch from 'winston-cloudwatch';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  constructor() {
    super();
    winston.add(
      new WinstonCloudwatch({
        name: 'API-GATEWAY',
        logGroupName: `${Config.aws.logGroupName}-${
          process.env.NODE_ENV || 'dev'
        }`,
        logStreamName: Config.aws.logStreamName || 'default',
        awsRegion: Config.aws.region,
        awsOptions: {
          // credentials: {
          //   accessKeyId: '',
          //   secretAccessKey: '',
          // },
        },
        level: 'debug',
        retentionInDays: 365,
        jsonMessage: true,
      }),
    );
  }

  log(message: string, context: string) {
    if (process.env.NODE_ENV != 'production') super.log(message, context);
    winston.info(message, context);
  }
  error(message: string, trace: string) {
    if (process.env.NODE_ENV != 'production') super.error(message, trace);
    winston.error(message, trace);
  }
  warn(message: string, context: string) {
    if (process.env.NODE_ENV != 'production') super.warn(message, context);
    winston.warn(message, context);
  }
  debug(message: string, context: string) {
    if (process.env.NODE_ENV != 'production') super.debug(message, context);
    winston.debug(message, context);
  }
  verbose(message: string, context) {
    if (process.env.NODE_ENV != 'production') super.verbose(message, context);
    winston.verbose(message, context);
  }
}
// const winston = require('winston'),
//   WinstonCloudWatch = require('winston-cloudwatch');
// const logger = new winston.createLogger({
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console({
//       timestamp: true,
//       colorize: true,
//     }),
//   ],
// });
// if (process.env.NODE_ENV === 'production') {
//   const cloudwatchConfig = {
//     logGroupName: Config.aws.logGroupName,
//     logStreamName: `${Config.aws.logStreamName}-${process.env.NODE_ENV}`,
//     awsAccessKeyId: Config.aws.accessKeyId,
//     awsSecretKey: Config.aws.secretKey,
//     awsRegion: Config.aws.region,
//     messageFormatter: ({ level, message, additionalInfo }) =>
//       `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(
//         additionalInfo,
//       )}}`,
//   };
//   logger.add(new WinstonCloudWatch(cloudwatchConfig));
// }
// module.exports = logger;
