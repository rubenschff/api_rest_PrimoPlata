import {InvestirDto} from "../../models/investir.dto";
import {Knex} from "../../knex";
import {ETableNames, TransacaoFixaTable, TransacaoTable} from "../../ETableNames";
import * as wasi from "wasi";
import {FinaceiroProvider} from "../financeiro";
import {IFinanceiroDTO} from "../../models";

interface TransacaoFixa extends Omit<InvestirDto, 'valorCota'|'quantidadeCotas'|'id'>{

}
export const compra = async (transacao:TransacaoFixa,financeiro:Omit<IFinanceiroDTO, 'id'>) => {
        try {
            //insert de transação
            const transacaoId = await Knex(ETableNames.transacao)
                .insert({
                    usuarioId: transacao.usuarioId,
                    investimentoId: transacao.investimentoId,
                    tipo: transacao.tipo,
                    situacao: transacao.situacao
                }).returning<[{ id: number }]>(TransacaoTable.id)
                .catch(e=>{
                    return Error(e)
                });
            console.log(transacaoId)
            if (transacaoId instanceof Error){
                return Error(transacaoId.message)
            }


            //insert de transação fixa
            const transacaoFixaId = await Knex(ETableNames.transacao_fixa)
                .insert({
                    transacaoId: transacaoId[0].id,
                    valor: transacao.valorTransacao
                })
                .returning<[{ id: number }]>(TransacaoFixaTable.id)
                .catch(e => {
                    return Error(e)
                })

            console.log(transacaoFixaId)
            if (transacaoFixaId instanceof Error){
                return Error(transacaoFixaId.message)
            }


            //insert de transação usuario
            const transacaoUsuario = await Knex(ETableNames.transacao_usuario)
                .insert({
                    usuarioId: transacao.usuarioId,
                    investimentoId: transacao.investimentoId,
                    transacaoId: transacaoId[0].id
                }).catch(e =>{
                    return Error(e)
                })

            console.log(transacaoUsuario)
            if (transacaoUsuario instanceof Error){
                return Error(transacaoUsuario.message)
            }

            const saldoDisponivel:number = financeiro.disponivel! - transacao.valorTransacao!

            await FinaceiroProvider
                .updateByUserId(transacao.usuarioId, {...financeiro, disponivel: saldoDisponivel} )
                .catch(e => {
                    return Error(e.message)
                })

            return transacaoId

        }catch (e) {
            console.log(e);
            return Error('Não foi possivel criar o investimento fixo')
        }

}



