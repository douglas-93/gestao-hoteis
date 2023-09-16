import {EnderecoModel} from "./endereco.model";

export class HotelModel {
    id: number;
    nome: string;
    cnpj: string;
    responsavel: string;
    cpfResponsavel: string;
    endereco: EnderecoModel[];
    versao: number;
}
