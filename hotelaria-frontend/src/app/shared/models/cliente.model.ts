import {EnderecoModel} from "./endereco.model";

export class ClienteModel {
    id: number;
    email: string;
    telefone: string;
    celular: string;
    endereco: EnderecoModel;
    dataCadastro: Date;
    dataUltimaAtualizacao: Date;
    versao: number;
}
