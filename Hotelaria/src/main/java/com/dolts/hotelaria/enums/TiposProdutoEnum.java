package com.dolts.hotelaria.enums;

import lombok.Getter;

@Getter
public enum TiposProdutoEnum {
    COMIDA("Comida"),
    BEBIDA("Bebida"),
    SERVICO_ADICIONAL("Serviço Adicional");

    private final String descricao;

    TiposProdutoEnum(String descricao) {
        this.descricao = descricao;
    }

}

