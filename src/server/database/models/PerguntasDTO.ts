import { IAlternativaDTO } from "./AlternativasDTO";

export interface IPerguntasDTO {
    id : number;
    descricao: string;
    alternativaCorreta: number;
    alternativas: Array<Omit<IAlternativaDTO,'id'>>;
    recompensa: number;
    explicacao: string;
};