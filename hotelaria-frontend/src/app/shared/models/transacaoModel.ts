import {TipoTransacaoEnum} from "../enums/TipoTransacaoEnum";
import {ProdutoModel} from "./produtoModel";
import {ReservaModel} from "./reserva.model";
import {HospedeModel} from "./hospede.model";

export class TransacaoModel {
    id: number;
    valorProduto: number;
    quantidade: number;
    valorTotal: number;
    dataMovimento: Date;
    dataHora: Date;
    justificativa: string;
    nota: string;
    Fornecedor: string;
    dataCompra: Date;
    pago: boolean = false;
    tipoTransacao: TipoTransacaoEnum;
    produtoModel: ProdutoModel;
    reserva: ReservaModel;
    hospede: HospedeModel;
}
