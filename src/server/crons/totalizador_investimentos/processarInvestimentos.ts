import {Knex} from "../../database/knex";
import {EViewNames, ProcessarInvestimentosView} from "../../database/EViewNames";
import {IFinanceiroDTO, IProcesarInvestimentos} from "../../database/models";
import {FinanceiroProvider} from "../../database/providers/financeiro";
import {TotalizadorProvider} from "../../database/providers/totalizador";
import {ITotalizadorDto} from "../../database/models/totalizador.dto";
import {SituacaoTransacao, TipoTransacao} from "../../database/enums";
import {TransacaoFixoProvider} from "../../database/providers/investimento_compra_venda";

interface Processados extends IProcesarInvestimentos{ }
export const processarInvestimentos = async ():Promise<object|Error> => {

   try {

       const paraProcessar = await Knex(EViewNames.processar_investimentos)
           .select<IProcesarInvestimentos[]>([
               ProcessarInvestimentosView.id,
               ProcessarInvestimentosView.usuarioId,
               ProcessarInvestimentosView.investimentoId,
               ProcessarInvestimentosView.tipo,
               ProcessarInvestimentosView.situacao,
               ProcessarInvestimentosView.valor
           ])

       if (paraProcessar.length > 0) {
           let userIDs:number[] = []
           let investimentosIDs:number[] = []


           await paraProcessar.map((investimentos) =>{
               userIDs.push(investimentos.usuarioId);
               investimentosIDs.push(investimentos.investimentoId)
           })

           const usuarios = [...new Set(userIDs)]
           const investimentos = [...new Set(investimentosIDs)]

           console.log(usuarios);
           console.log(investimentos)

           console.log(paraProcessar)

          const processados:Processados[] = await UsuariosParaProcessar(usuarios,paraProcessar)

           if (processados.length > 0){
               return processados
           }

       }

       console.error('Não há investimentos para processar!')
       return Error('Não há investimentos para processar!')

   }catch (e) {
       console.error(e)
       return Error('Não há investimentos para processar!')
   }
}

const UsuariosParaProcessar = async (usuario:number[],paraProcessar:IProcesarInvestimentos[]):Promise<Processados[]> =>{

    let processados:Processados[] = []

   for (let u in usuario) {

        const financeiro:Error|IFinanceiroDTO = await FinanceiroProvider.getByUserId(usuario[u])
        if (financeiro instanceof Error) {
            break
        }

        let totalizator = await TotalizadorProvider.getById(usuario[u],0)
        if (totalizator instanceof Error) {
            break
        }

        let totalizador1:ITotalizadorDto | undefined = undefined
        let totalizador2:ITotalizadorDto | undefined = undefined
        let totalizador3:ITotalizadorDto | undefined = undefined

        totalizator.map(totalizator=>{
            if (totalizator.investimentoId == 1){
                totalizador1 = totalizator
            }else if (totalizator.investimentoId == 2){
                totalizador2 = totalizator
            }else if (totalizator.investimentoId == 3){
                totalizador3 = totalizator
            }else {
                return
            }
        })

        let investimentoPorUsuario: IProcesarInvestimentos[] = []
        paraProcessar.map(investimento => {
            if (investimento.usuarioId == usuario[u]) {
                investimentoPorUsuario.push(investimento)
            }
        })

       console.log('Inicio')
       console.log(`Usuario ${usuario[u]}`)
       console.log(financeiro)
       console.log('Totalizadores...')
       console.log(totalizador1)
       console.log(totalizador2)
       console.log(totalizador3)

       investimentoPorUsuario.map( async investimento => {
           if (investimento.investimentoId == 1 && investimento.situacao == SituacaoTransacao.ABERTO){
               switch (investimento.tipo) {
                   case TipoTransacao.COMPRA:{

                       if (financeiro.disponivel! >= investimento.valor){
                           totalizador1!.valorInicial =  totalizador1!.valorInicial + investimento.valor;
                           totalizador1!.valorAcumulado =  totalizador1!.valorAcumulado + investimento.valor;
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CONCLUIDO,
                               log:{
                                   status:`CONCLUIDO, saldo disponível R$${financeiro.disponivel} valor da compra R$${investimento.valor}`
                               }
                           })
                           financeiro.disponivel! -= investimento.valor;
                       }else {
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CANCELADO,
                               log:{
                                   status:`CANCELADO, saldo disponível R$${financeiro.disponivel} valor da compra R$${investimento.valor}`
                               }
                           })
                       }

                       break
                   }default:{

                       if(totalizador1!.valorAcumulado >= investimento.valor){
                           const aux = totalizador1!.valorAcumulado - investimento.valor

                           if (aux < totalizador1!.valorInicial){
                               totalizador1!.valorInicial = aux
                           }

                           financeiro.disponivel! += investimento.valor

                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CONCLUIDO,
                               log:{
                                   status:`CONCLUIDO, saldo acumulado R$${totalizador1!.valorAcumulado} valor da venda R$${investimento.valor}`
                               }
                           })
                           totalizador1!.valorAcumulado -= investimento.valor
                       }else {
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CANCELADO,
                               log:{
                                   status:`CANCELADO, saldo acumulado R$${totalizador1!.valorAcumulado} valor da venda R$${investimento.valor}`
                               }
                           })
                       }

                       break
                   }

               }
           }else if (investimento.investimentoId == 2 && investimento.situacao == SituacaoTransacao.ABERTO){
               switch (investimento.tipo) {
                   case TipoTransacao.COMPRA:{

                       if (financeiro.disponivel! >= investimento.valor){

                           totalizador2!.valorInicial =  totalizador2!.valorInicial + investimento.valor;
                           totalizador2!.valorAcumulado =  totalizador2!.valorAcumulado + investimento.valor;
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CONCLUIDO,
                               log:{
                                   status:`CONCLUIDO, saldo disponível R$${financeiro.disponivel} valor da compra R$${investimento.valor}`
                               }
                           })
                           financeiro.disponivel! -= investimento.valor;
                       }else {
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CANCELADO,
                               log:{
                                   status:`CANCELADO, saldo disponível R$${financeiro.disponivel} valor da compra R$${investimento.valor}`
                               }
                           })
                       }

                       break
                   }default:{

                       if(totalizador2!.valorAcumulado >= investimento.valor){
                           const aux = totalizador2!.valorAcumulado - investimento.valor

                           if (aux < totalizador2!.valorInicial){
                               totalizador2!.valorInicial = aux
                           }

                           financeiro.disponivel! += investimento.valor
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CONCLUIDO,
                               log:{
                                   status:`CONCLUIDO, saldo acumulado R$${totalizador2!.valorAcumulado} valor da venda R$${investimento.valor}`
                               }
                           })
                           totalizador2!.valorAcumulado -= investimento.valor
                       }else {
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CANCELADO,
                               log:{
                                   status:`CANCELADO, saldo acumulado R$${totalizador2!.valorAcumulado} valor da venda R$${investimento.valor}`
                               }
                           })
                       }

                       break
                   }

               }
           }else if (investimento.investimentoId == 3 && investimento.situacao == SituacaoTransacao.ABERTO){
               switch (investimento.tipo) {
                   case TipoTransacao.COMPRA:{

                       if (financeiro.disponivel! >= investimento.valor){
                           totalizador3!.valorInicial =  totalizador3!.valorInicial + investimento.valor;
                           totalizador3!.valorAcumulado =  totalizador3!.valorAcumulado + investimento.valor;
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CONCLUIDO,
                               log:{
                                   status:`CONCLUIDO, saldo disponível R$${financeiro.disponivel} valor da compra R$${investimento.valor}`
                               }
                           })
                           financeiro.disponivel! -= investimento.valor;
                       }else {
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CANCELADO,
                               log:{
                                   status:`CANCELADO, saldo disponível R$${financeiro.disponivel} valor da compra R$${investimento.valor}`
                               }
                           })
                       }

                       break
                   }default:{

                       if(totalizador3!.valorAcumulado >= investimento.valor){
                           const aux = totalizador3!.valorAcumulado - investimento.valor

                           if (aux < totalizador3!.valorInicial){
                               totalizador3!.valorInicial = aux
                           }

                           financeiro.disponivel! += investimento.valor
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CONCLUIDO,
                               log:{
                                   status:`CONCLUIDO, saldo acumulado R$${totalizador3!.valorAcumulado} valor da venda R$${investimento.valor}`
                               }
                           })

                           totalizador3!.valorAcumulado -= investimento.valor
                       }else {
                           processados.push({
                               ...investimento,
                               situacao: SituacaoTransacao.CANCELADO,
                               log:{
                                   status:`CANCELADO, saldo acumulado R$${totalizador3!.valorAcumulado} valor da venda R$${investimento.valor}`
                               }
                           })
                       }

                       break
                   }

               }
           }
       })

       console.log('Final')
       console.log(`Usuario ${usuario[u]}`)
       console.log(financeiro)
       console.log('Totalizadores...')
       console.log(totalizador1)
       console.log(totalizador2)
       console.log(totalizador3)
       console.log(`Processados do usuário ${usuario[u]}` )
       processados.map(processados =>{
           if (processados.usuarioId == usuario[u]){
               console.log(processados)
           }
       })

       const totalizadores:ITotalizadorDto[] = [totalizador1!,totalizador2!,totalizador3!]

       //atualiza totalizadores
       totalizadores.map( async totalizador =>{
           if (totalizador){
               await TotalizadorProvider.updateById(totalizador)
               return
           }
       })

       //atualiza financeiro
       await FinanceiroProvider.updateByUserId(usuario[u],
           {
               arrecadado: Number(financeiro.arrecadado!.toFixed(2)),
               acumulado: Number(financeiro.acumulado!.toFixed(2)),
               disponivel: Number(financeiro.disponivel!.toFixed(2))
           })


    }

   //atualiza todas as transações processadas
   await TransacaoFixoProvider.updateTransacao(processados)

   return processados
}
