export class ArquivoDIgitalModel {
    id: number;
    nome: string;
    tipo: string;
    dados: File | Blob | ArrayBuffer;
    version: number;
}
