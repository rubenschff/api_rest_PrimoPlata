import * as getById from './getById'
import * as create from './getOrCreate'
import * as updadeById from './updateById'
import * as getAll from './getAll'

export const TotalizadorProvider ={
    ...getById,
    ...create,
    ...updadeById,
    ...getAll
}