package com.dolts.hotelaria.models;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reservas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ReservaModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime dataCriacaoReserva;
    private LocalDateTime dataAlteracaoReserva;
    private LocalDateTime dataCancelamento;
    private LocalDate dataEntrada;
    private LocalDate dataPrevistaSaida;
    private LocalDate dataSaida;
    private Boolean checkedIn;
    private Boolean checkedOut;
    private Boolean cancelada;
    private String motivoCancelamento;
    private Integer diasHospedado;
    private BigDecimal valorDiaria;
    private BigDecimal valorTotalEstadia;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HospedeModel> hospedes;
    @OneToMany
    private List<QuartoModel> quarto;
}
