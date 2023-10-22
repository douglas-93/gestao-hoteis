import {EnderecoModel} from "./endereco.model";

export class EmpresaModel {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    inscricaoEstadual: string;
    ramoAtividade: string;
    telefone: string;
    celular: string;
    email: string;
    endereco: EnderecoModel[];
    observacao: string;
    ativo: boolean = true;
}
