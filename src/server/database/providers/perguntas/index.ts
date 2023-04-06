import * as getAll from './getAll'
import * as create from './create'
import * as deleteById from './deleteById'
import * as situacao from './situacao'

export const PerguntaProvider = {
    ...getAll,
    ...create,
    ...deleteById,
    ...situacao
}