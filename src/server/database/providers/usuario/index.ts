import * as create from './create';
import * as deleteById from "./deleteById";

export const UsuarioProvider = {
    ...create,
    ...deleteById,
}