import * as getById from './getById'
import * as create from './create'

export const TotalizadorProvider ={
    ...getById,
    ...create
}