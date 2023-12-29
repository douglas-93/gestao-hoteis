import {HospedeModel} from "./hospede.model";
import {QuartoModel} from "./quarto.model";
import {EmpresaModel} from "./empresa.model";

export class ReservaModel {
    id: number;
    dataCriacaoReserva: string | number | Date;
    dataAlteracaoReserva: string | number | Date;
    dataCancelamento: string | number | Date;
    dataEntrada: string | number | Date;
    dataPrevistaSaida: string | number | Date;
    dataSaida: string | number | Date;
    estadia: (string | number | Date)[];
    checkedIn: boolean;
    checkedOut: boolean;
    cancelada: boolean;
    motivoCancelamento: string;
    diasHospedado: number;
    valorDiaria: number;
    valorTotalEstadia: number;
    isEmpresa: boolean = false;
    hospedes: HospedeModel[] = [];
    quarto: QuartoModel;
    empresa: EmpresaModel;
}
