import * as transacoes from './transacoes'
import * as compra from './compra'
import * as venda from './venda'


export const TransacaoController = {
    ...transacoes,
    ...compra,
    ...venda
}