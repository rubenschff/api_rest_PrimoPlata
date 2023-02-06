import { Knex } from "knex";
import { passwordCrypto } from "../../shared/services";
import { ETableNames } from "../ETableNames";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(ETableNames.usuario).del();

    const password = await passwordCrypto.hashPassword('admin');
    const date = '01/01/1999';

    // Inserts seed entries
    await knex(ETableNames.usuario).insert([
        { name: "admin", nickName: "admin123", password: password, dateOfBirth: date }
    ]);
};
