export enum ETableNames{
    usuario = 'usuario',
    investimento = 'investimento',
    perguntas = 'perguntas',
    alternativas = 'alternativas',
    accessLogs = 'accessLogs',
    financeiro = 'financeiro',
    pergunta_resposta= 'pergunta_resposta',
    investimento_fixo= 'investimento_fixo',
    investimento_variavel = 'investimento_variavel',
    transacao = 'transacao',
    transacao_fixa = 'transacao_fixa',
    transacao_variavel = 'transacao_variavel',
    transacao_totalizador = 'transacao_totalizador',
    transacao_usuario = 'transacao_usuario'
    
}

export enum UsuarioTable {
    id = 'id',
    name = 'name',
    nickName = 'nickName',
    password = 'password',
    dateOfBirth = 'dateOfBirth'
}

export enum InvestimentoTable {
    id = 'id',
    descricao = 'descricao',
    risco = 'risco',
    juro = 'juro',
    liquidez = 'liquidez',
    imagem = 'imagem',
    explicacao = 'explicacao'
}

export enum InvestimentoFixoTable {
    id = 'id',
    investimentoId = 'investimentoId',
    juro = 'juro',
    aporteInicial = 'aporteInicial',
    diaParaCreditar = 'diaParaCreditar',
    investimentoReferencePK = 'investimento.id'
}

export enum InvestimentoVariavelTable {
    id = 'id',
    investimentoId = 'investimentoId',
    preco = 'preco',
    dividendo = 'dividendo',
    diaParaAtualizar = 'diaParaAtualizar',
    manutencao = 'manutencao',
    investimentoReferencePK = 'investimento.id'
}

export enum PerguntasTable {
    id = 'id',
    descricao = 'descricao',
    recompensa = 'recompensa',
    explicacao = 'explicacao',
    alternativaCorreta = 'alternativaCorreta'
}

export enum AlternativasTable {
    id = 'id',
    descricao = 'descricao',
    explicacao = 'explicacao',
    perguntaId = 'perguntaId',
    perguntaReferencePK = 'perguntas.id'
}

export enum AccessLogTable {
    id = 'id',
    accessToken = 'accessToken',
    usuarioId = 'usuarioId',
    usuarioReferencePK = 'usuario.id'
}

export enum FinanceiroTable {
    id = 'id',
    arrecadado = 'arrecadado',
    acumulado = 'acumulado',
    disponivel = 'disponivel',
    usuarioId = 'usuarioId',
    usuarioReferencePK = 'usuario.id'
}

export enum RespostaTable {
    idUsuario = 'idUsuario',
    idPergunta = 'idPergunta',
    idAlternativa = 'idAlternativa',
    createdAt = 'createdAt'
}

export enum TransacaoTable{
    id = 'id',
    usuarioId = 'usuarioId',
    investimentoId = 'investimentoId',
    tipo = 'tipo',
    situacao = 'situacao',
    log = 'log',
    usuarioReferencePK = 'usuario.id',
    investimentoReferencePK = 'investimento.id'
}

export enum TransacaoFixaTable{
    id = 'id',
    transacaoId = 'transacaoId',
    valor = 'valor',
    transacaoReferencePK = 'transacao.id'
}

export enum TransacaoVariavelTable{
    id = 'id',
    transacaoId = 'transacaoId',
    valorCota = 'valorCota',
    quantidadeCotas = 'quantidadeCotas',
    dividendo = 'dividendo',
    transacaoReferencePK = 'transacao.id'
}

export enum TransacaoTotalizadorTable{
    id = 'id',
    investimentoId = 'investimentoId',
    usuarioId = 'usuarioId',
    valorInicial = 'valorInicial',
    valorAcumulado = 'valorAcumulado',
    quantidadeCotas = 'quantidadeCotas',
    investimentoReferencePK = 'investimento.id',
    usuarioReferencePK = 'usuario.id'
}

export enum TransacaoUsuarioTable {
    usuarioId = 'usuarioId',
    investimentoId = 'investimentoId',
    transacaoId = 'transacaoId',
    usuarioReferencePK = 'usuario.id',
    investimentoReferencePK = 'investimento.id',
    transacaoReferencePK = 'transacao.id'


}