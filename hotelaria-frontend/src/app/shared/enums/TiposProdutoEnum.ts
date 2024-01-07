export class TiposProdutoEnum {
    static COMIDA = new TiposProdutoEnum("Comida");
    static BEBIDA = new TiposProdutoEnum("Bebida");
    static SERVICO_ADICIONAL = new TiposProdutoEnum("Serviço Adicional");

    private constructor(private descricao: string) {}

    getDescricao(): string {
        return this.descricao;
    }
}
