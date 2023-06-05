import { config } from '@root/config';
import { knexConnection } from '@root/database/databaseConnection';

export class BaseRepository {
  protected readonly config;
  protected readonly logger;
  protected readonly knex;

  constructor(loggerName: string) {
    this.config = config;
    this.logger = config.createLogger(loggerName);
    this.knex = knexConnection();
  }
}
