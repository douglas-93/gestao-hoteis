package com.dolts.hotelaria.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class HospedeModel extends ClienteModel{

    private String nome;
    @Column(unique = true)
    private String cpf;
    @Column(unique = true)
    private String rg;
    private LocalDate dataNascimento;
    private String observacao;
    private Boolean ativo = true;
}
