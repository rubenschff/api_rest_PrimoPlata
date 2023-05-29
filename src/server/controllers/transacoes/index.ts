import * as transacoes from './transacoes'
import * as compraVenda from './compraVenda'


export const TransacaoController = {
    ...transacoes,
    ...compraVenda,
}