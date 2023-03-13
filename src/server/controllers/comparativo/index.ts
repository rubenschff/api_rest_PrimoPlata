import * as updateByUserId from './updateByUserId'
import * as create from './create'
import * as getByUserId from './getById'
export const ComparativoController = {
    ...updateByUserId,
    ...create,
    ...getByUserId
}