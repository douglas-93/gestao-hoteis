package com.dolts.hotelaria.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class EmpresaModel extends ClienteModel{

    @Column(unique = true)
    private String razaoSocial;
    @Column(unique = true)
    private String cnpj;
    private String nomeFantasia;
    private String inscricaoEstadual;
    private String ramoAtividade;
    private String observacao;
    private Boolean ativo = true;
}
