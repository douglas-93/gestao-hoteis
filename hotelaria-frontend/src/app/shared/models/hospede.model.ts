import {EnderecoModel} from "./endereco.model";

export class HospedeModel {
    nome: string;
    cpf: string;
    rg: string;
    dataNascimento: string | number | Date;
    telefone: string;
    celular: string;
    email: string;
    endereco: EnderecoModel[];
    observacao: string;
    ativo: boolean = true;
}
