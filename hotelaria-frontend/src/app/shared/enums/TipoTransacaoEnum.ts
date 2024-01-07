export class TipoTransacaoEnum {
    static ENTRADA = new TipoTransacaoEnum("Entrada");
    static SAIDA = new TipoTransacaoEnum("Saída");
    static BAIXA = new TipoTransacaoEnum("Baixa");
    static ESTORNO = new TipoTransacaoEnum("Estorno");

    private constructor(private descricao: string) {}

    getDescricao(): string {
        return this.descricao;
    }
}
