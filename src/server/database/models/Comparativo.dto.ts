
export interface IFinanceiroDTO {
    id: number;
    arrecadado?: number;
    acumulado?: number;
    disponivel?: number;
    compras?: number;
    vendas?: number
    usuarioId: number;
}