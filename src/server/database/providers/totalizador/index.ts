import * as getById from './getById'
import * as create from './create'
import * as updadeById from './updateById'

export const TotalizadorProvider ={
    ...getById,
    ...create,
    ...updadeById
}