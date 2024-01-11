import {TiposProdutoEnum} from "../enums/TiposProdutoEnum";

export class ProdutoModel {
    id: number;
    nome: string;
    valor: number;
    estoque: number;
    tipo: TiposProdutoEnum;
}
