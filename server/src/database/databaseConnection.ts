/* eslint-disable @typescript-eslint/no-var-requires */
const databaseConfig = require('../../knexfile');
const knexStringcase = require('knex-stringcase');
import { types } from 'pg';
import knex from 'knex';

export const knexConnection = () => {
  const keyKonverter = knexStringcase(databaseConfig);
  const connection = knex(keyKonverter);
  types.setTypeParser(1700, 'text', parseFloat);
  types.setTypeParser(1082, (str) => str);
  return connection;
};
