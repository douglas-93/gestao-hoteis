package com.dolts.hotelaria.enums;

import lombok.Getter;

@Getter
public enum FormaPagamentoEnum {
    CARTAO_CREDITO("Cartão de Crédito"),
    CARTAO_DEBITO("Cartão de Débito"),
    PIX("PIX"),
    DINHEIRO("Dinheiro"),
    CHEQUE("Cheque"),
    FATURA("Fatura"),
    NOTA_FISCAL("Nota Fiscal");

    private final String descricao;

    FormaPagamentoEnum(String descricao) {
        this.descricao = descricao;
    }

}
