package com.dolts.hotelaria.enums;

public enum TiposProdutoEnum {
    COMIDA("Comida"),
    BEBIDA("Bebida"),
    SERVICO_ADICIONAL("Serviço Adicional");

    private final String descricao;

    TiposProdutoEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}

