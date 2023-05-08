import * as create from './create'
import * as getAll from './getAll'
import * as deleteById from './deleteById'
import * as proximaPergunta from './proximaPergunta'

export const PerguntasController = {
    ...create,
    ...getAll,
    ...deleteById,
    ...proximaPergunta
}