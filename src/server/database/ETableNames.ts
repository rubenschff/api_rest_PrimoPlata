export enum ETableNames{
    usuario = 'usuario',
    investimento = 'investimento',
    perguntas = 'perguntas',
    alternativas = 'alternativas',
    accessLogs = 'accessLogs',
    comparacao = 'comparacao',
    pergunta_resposta= 'pergunta_resposta'
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
    imagem = 'imagem'
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