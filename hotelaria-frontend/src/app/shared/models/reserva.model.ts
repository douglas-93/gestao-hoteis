import {HospedeModel} from "./hospede.model";
import {QuartoModel} from "./quarto.model";

export class ReservaModel {
  id: number;
  dataCriacaoReserva: Date;
  dataAlteracaoReserva: Date;
  dataCancelamento: Date;
  dataEntrada: Date;
  dataPrevistaSaida: Date;
  dataSaida: Date;
  checkedIn: boolean;
  checkedOut: boolean;
  cancelada: boolean;
  motivoCancelamento: string;
  diasHospedado: number;
  valorDiaria: number;
  valorTotalEstadia: number;
  hospedes: HospedeModel[];
  quarto: QuartoModel[];
}
