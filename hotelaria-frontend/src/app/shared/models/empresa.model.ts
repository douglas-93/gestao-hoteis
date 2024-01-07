import {ClienteModel} from "./cliente.model";

export class EmpresaModel extends ClienteModel {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    inscricaoEstadual: string;
    ramoAtividade: string;
    observacao: string;
    ativo: boolean = true;
}
