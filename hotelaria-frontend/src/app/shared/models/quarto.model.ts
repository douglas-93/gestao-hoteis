import {CategoriaQuartoModel} from "./categoriaQuarto.model";
import {TipoQuartoModel} from "./tipoQuarto.model";
import {ReservaModel} from "./reserva.model";

export class QuartoModel {
    id: number;
    nome: string;
    ativo: boolean;
    capacidadePessoas: number;
    valorDiaria: number;
    idDasImagensDoQuarto: number[];
    tipoQuarto: TipoQuartoModel;
    categoriaQuarto: CategoriaQuartoModel;
    itens: string[];
    versao: number;
    reservas: ReservaModel[];
}
