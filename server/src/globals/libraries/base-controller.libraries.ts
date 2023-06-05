import { config } from '@root/config';

export class BaseController {
  protected readonly config;
  protected readonly logger;

  constructor(loggerName: string) {
    this.config = config;
    this.logger = config.createLogger(loggerName);
  }
}
