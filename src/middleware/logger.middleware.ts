import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

const dateFormat = 'YYYY-MM-DD HH:mm Z';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl } = req;
    const startDate = moment();
    const logStart = `${method} ${originalUrl}`;
    this.logger.log(`${logStart} | ${moment().format(dateFormat)}`);

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const endDate = moment();
      this.logger.log(
        `${logStart} | ${endDate.format(
          dateFormat,
        )} ${statusCode} ${contentLength}`,
      );
      const duration = moment.duration(endDate.diff(startDate));
      this.logger.log(`${logStart} | Duration: ${duration.asMilliseconds()}ms`);
    });
    next();
  }
}
