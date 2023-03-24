import { Knex } from "knex";
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();

export const development: Knex.Config = {
  client: 'pg',
  searchPath: ['knex', 'public'],
  connection: process.env.DB_CONNECTION,
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
};

export const teste: Knex.Config = {
    ...development,
    connection: ':memory:',
};

export const production: Knex.Config = {
    ...development,
    
};
