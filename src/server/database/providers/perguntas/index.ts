import * as getAll from './getAll'
import * as create from './create'
import * as deleteById from './deleteById'

export const PerguntaProvider = {
    ...getAll,
    ...create,
    ...deleteById
}