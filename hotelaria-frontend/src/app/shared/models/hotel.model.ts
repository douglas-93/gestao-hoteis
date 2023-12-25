import {EnderecoModel} from "./endereco.model";
import {ArquivoDIgitalModel} from "./ArquivoDIgitalModel";

export class HotelModel {
    id: number;
    nome: string;
    cnpj: string;
    responsavel: string;
    cpfResponsavel: string;
    endereco: EnderecoModel[];
    logoMarcaId: number;
    logoAsDataSource: string | null | undefined;
    versao: number;
}
