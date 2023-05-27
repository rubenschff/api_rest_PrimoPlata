

export interface TransacaoDTO {
    id: number,
    usuarioId: number,
    investimentoId: number,
    tipo :number,
    situacao: number,
    valorTransacao?: number,
    valorCota?: number,
    quantidadeCotas?: number
    log? : object
}

