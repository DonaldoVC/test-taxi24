import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLogger implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { method, originalUrl} = request;

    this.logger.log(`${method} ${originalUrl}`);
    this.logger.log(`Body: ${JSON.stringify(request.body)}`)

    response.on('finish', () => {
      const { statusCode,  } = response;
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

      this.logger.log(`Execution: status: ${statusCode}, time: ${responseTime}ms`);
    });

    next();
  }
}