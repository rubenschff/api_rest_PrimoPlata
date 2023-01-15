import { Knex } from "knex";
import path from "path";

export const develop: Knex.Config = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "database.sqlite"
    ),
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};

export const teste: Knex.Config = {
    ...develop,
    connection: ':memory:',
};

export const production: Knex.Config = {
    ...develop,
    
};
