import * as compra_fixos from './investimento_fixo_compra'
import * as venda_fixos from './investimento_fixo_venda'
import * as updateTransacao from './updateTransacao'

export const TransacaoFixoProvider = {
        ...compra_fixos,
        ...venda_fixos,
        ...updateTransacao
}