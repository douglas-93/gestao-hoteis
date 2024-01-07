package com.dolts.hotelaria.models;

import com.dolts.hotelaria.enums.TipoTransacaoEnum;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transacoes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class TransacaoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal valorProduto;
    private BigDecimal quantidade;
    private BigDecimal valorTotal;
    private LocalDateTime dataHora;
    private String justificativa;
    private String nota;
    private String Fornecedor;
    private LocalDate dataCompra;
    private boolean pago = false;

    @Enumerated(EnumType.STRING)
    private TipoTransacaoEnum tipoTransacao;

    @ManyToOne
    private ProdutoModel produtoModel;

    @ManyToOne
    private ReservaModel reserva;

    @ManyToOne
    private HospedeModel hospede;

}
