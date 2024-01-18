import {ReservaModel} from "./reserva.model";
import {FormaPagamentoEnum} from "../enums/FormaPagamentoEnum";

export class NotaCheckOutModel {
    id: number;
    valorDiaria: number;
    valorConsumido: number;
    subtotal: number;
    valorDesconto: number;
    valorFinal: number;
    dataReferencia: Date | string | number;
    dataHoraOperacao: Date;
    formaPagamento: FormaPagamentoEnum;
    reserva: ReservaModel;
}
