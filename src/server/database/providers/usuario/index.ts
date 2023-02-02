import * as count  from './count';
import * as create from './create';
import * as deleteById from "./deleteById";
import * as getAll from './getAll';
import * as getById  from './getById';
import * as updateById  from './updateById';
import * as getByNickName from './getByNickName';

export const UsuarioProvider = {
    ...create,
    ...deleteById,
    ...getAll,
    ...getById,
    ...updateById,
    ...count,
    ...getByNickName,
    
}