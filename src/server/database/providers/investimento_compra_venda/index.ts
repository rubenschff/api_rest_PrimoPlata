import * as compra_fixos from './investimento_fixo_compra'
import * as venda_fixos from './investimento_fixo_venda'

export const InvestimentoFixoProvider = {
        ...compra_fixos,
        ...venda_fixos
}