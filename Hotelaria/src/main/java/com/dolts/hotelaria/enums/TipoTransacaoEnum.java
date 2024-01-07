package com.dolts.hotelaria.enums;

public enum TipoTransacaoEnum {
    ENTRADA("Entrada"),
    SAIDA("Saída"),
    BAIXA("Baixa"),
    ESTORNO("Estorno");

    private final String descricao;

    TipoTransacaoEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
