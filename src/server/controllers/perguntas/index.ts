import * as create from './create'
import * as getAll from './getAll'
import * as deleteById from './deleteById'
import * as proxima_pergunta from './proxima_pergunta'

export const PerguntasController = {
    ...create,
    ...getAll,
    ...deleteById,
    ...proxima_pergunta
}