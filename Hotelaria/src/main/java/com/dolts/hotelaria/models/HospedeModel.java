package com.dolts.hotelaria.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @JsonIgnore
    @ManyToMany(mappedBy = "hospedes")
    private List<ReservaModel> reservas = new ArrayList<>();

}
