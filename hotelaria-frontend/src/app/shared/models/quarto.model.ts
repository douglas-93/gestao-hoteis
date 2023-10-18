import {CategoriaQuartoModel} from "./categoriaQuarto.model";
import {TipoQuartoModel} from "./tipoQuarto.model";
import {ImagemQuartoModel} from "./imagemQuarto.model";

export class QuartoModel {
    id: number;
    nome: string;
    ativo: boolean;
    capacidadePessoas: number;
    valorDiaria: number;
    imagem: ImagemQuartoModel[];
    tipoQuarto: TipoQuartoModel;
    categoriaQuarto: CategoriaQuartoModel;
    itens: string[];
    versao: number;
}
