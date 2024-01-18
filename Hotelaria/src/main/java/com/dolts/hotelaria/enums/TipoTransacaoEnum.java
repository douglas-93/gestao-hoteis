package com.dolts.hotelaria.enums;

import lombok.Getter;

@Getter
public enum TipoTransacaoEnum {
    ENTRADA("Entrada"),
    SAIDA("Saída"),
    BAIXA("Baixa"),
    ESTORNO("Estorno");

    private final String descricao;

    TipoTransacaoEnum(String descricao) {
        this.descricao = descricao;
    }

}
