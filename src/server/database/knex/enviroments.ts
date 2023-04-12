import { Knex } from "knex";
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();

export const development: Knex.Config = {
  client: 'pg',
  searchPath: ['knex', 'public'],
  connection: {
      host : process.env.HOST,
      port: parseInt(process.env.PORT_DATABASE!),
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD
  },
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
    client: 'pg',
    searchPath: ['knex', 'public'],
    connection: {
        host : process.env.HOST,
        port: parseInt(process.env.PORT_DATABASE!),
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD
    },
    migrations: {
        directory: path.resolve(__dirname, "..", "migrations"),
    },
    seeds: {
        directory: path.resolve(__dirname, "..", "seeds"),
    },
};
