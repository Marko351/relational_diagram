import { Knex } from 'knex';
import { config as appConfig } from './src/config';

// Update with your config settings.

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: appConfig.DB_HOST,
    port: appConfig.DB_PORT,
    user: appConfig.DB_USER,
    password: appConfig.DB_PASSWORD,
    database: appConfig.DB_DATABASE,
    ssl: appConfig.DB_SSL,
  },
  pool: {
    min: 2,
    max: 60,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false, // <- default is true, set to false
  },
  seeds: {
    timestampFilenamePrefix: true,
    directory: './src/database/seeds',
  },
  migrations: {
    directory: './src/database/migrations',
  },
};

module.exports = config;
