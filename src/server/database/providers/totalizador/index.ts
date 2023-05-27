import * as getById from './getById'
import * as create from './getOrCreate'
import * as updadeById from './updateById'

export const TotalizadorProvider ={
    ...getById,
    ...create,
    ...updadeById
}