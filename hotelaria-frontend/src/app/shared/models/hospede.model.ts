import {EnderecoModel} from "./endereco.model";
import {ClienteModel} from "./cliente.model";

export class HospedeModel extends ClienteModel{
    nome: string;
    cpf: string;
    rg: string;
    dataNascimento: string | number | Date;
    observacao: string;
    ativo: boolean = true;
}
