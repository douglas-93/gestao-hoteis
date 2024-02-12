package com.dolts.hotelaria.models;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    @ElementCollection(fetch = FetchType.LAZY)
    private List<LocalDate> estadia;
    private LocalDate dataSaida;
    private Boolean checkedIn;
    private Boolean checkedOut;
    private Boolean cancelada;
    private String motivoCancelamento;
    private Integer diasHospedado;
    private BigDecimal valorDiaria;
    private BigDecimal valorTotalEstadia;
    private Boolean isEmpresa = false;
    private Long idReservaOriginal;

    @ManyToOne
    private QuartoModel quarto;

    @ManyToOne
    private EmpresaModel empresa;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "reserva_hospede",
            joinColumns = @JoinColumn(name = "reserva_id"),
            inverseJoinColumns = @JoinColumn(name = "hospede_id"))
    private List<HospedeModel> hospedes = new ArrayList<>();

    @Transient
    private List<QuartoModel> quartos = new ArrayList<>();

    public void atualizarReserva(ReservaModel reservaAtualizada) {

        this.setDataCriacaoReserva(reservaAtualizada.getDataCriacaoReserva());
        this.setDataAlteracaoReserva(reservaAtualizada.getDataAlteracaoReserva());
        this.setDataCancelamento(reservaAtualizada.getDataCancelamento());
        this.setDataEntrada(reservaAtualizada.getDataEntrada());
        this.setDataPrevistaSaida(reservaAtualizada.getDataPrevistaSaida());
        this.setEstadia(reservaAtualizada.getEstadia());
        this.setDataSaida(reservaAtualizada.getDataSaida());
        this.setCheckedIn(reservaAtualizada.getCheckedIn());
        this.setCheckedOut(reservaAtualizada.getCheckedOut());
        this.setCancelada(reservaAtualizada.getCancelada());
        this.setMotivoCancelamento(reservaAtualizada.getMotivoCancelamento());
        this.setDiasHospedado(reservaAtualizada.getDiasHospedado());
        this.setValorDiaria(reservaAtualizada.getValorDiaria());
        this.setValorTotalEstadia(reservaAtualizada.getValorTotalEstadia());
        this.setIsEmpresa(reservaAtualizada.getIsEmpresa());

        if (reservaAtualizada.getQuarto() != null) {
            this.setQuarto(reservaAtualizada.getQuarto());
        }

        if (reservaAtualizada.getEmpresa() != null) {
            this.setEmpresa(reservaAtualizada.getEmpresa());
        }

        if (reservaAtualizada.getHospedes() != null) {
            this.setHospedes(new ArrayList<>(reservaAtualizada.getHospedes()));
        }
    }
}
