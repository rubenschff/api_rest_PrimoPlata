import * as fixos_CompraVenda from './fixos_CompraVenda'
import * as updateTransacao from './updateTransacao'

export const TransacaoFixoProvider = {
        ...fixos_CompraVenda,
        ...updateTransacao
}