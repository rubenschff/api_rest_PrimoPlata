export enum ETableNames{
    usuario = 'usuario',
    investimento = 'investimento',
    perguntas = 'perguntas',
    alternativas = 'alternativas',
    accessLogs = 'accessLogs',
    comparacao = 'comparacao',
    pergunta_resposta= 'pergunta_resposta',
    investimento_fixo= 'investimento_fixo',
    investimento_variavel = 'investimento_variavel'
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

export enum ComparacaoTable {
    id = 'id',
    moedasRecebidas = 'moedasRecebidas',
    moedasTotais = 'moedasTotais',
    moedasDisponiveis = 'moedasDisponiveis',
    usuarioId = 'usuarioId',
    usuarioReferencePK = 'usuario.id'
}

export enum RespostaTable {
    idUsuario = 'idUsuario',
    idPergunta = 'idPergunta',
    idAlternativa = 'idAlternativa',
    createdAt = 'createdAt'
}