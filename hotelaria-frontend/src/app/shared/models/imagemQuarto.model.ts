export class ImagemQuartoModel {
    id: number;
    nome: string;
    formato: string;
    tamanho: number;
    idDoQuartoDaImagem: number;
    imagem: string | File | ArrayBuffer | Blob;
    version: number;
}
