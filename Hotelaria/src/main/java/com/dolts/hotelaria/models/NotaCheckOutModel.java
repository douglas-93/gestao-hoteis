package com.dolts.hotelaria.models;

import com.dolts.hotelaria.enums.FormaPagamentoEnum;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class NotaCheckOutModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal valorDiaria;
    private BigDecimal valorConsumido;
    private BigDecimal subtotal;
    private BigDecimal valorDesconto;
    private BigDecimal valorFinal;
    private LocalDate dataReferencia;
    private LocalDateTime dataHoraOperacao;
    @Enumerated(EnumType.STRING)
    private FormaPagamentoEnum formaPagamento;
    @ManyToOne
    private ReservaModel reserva;
}
