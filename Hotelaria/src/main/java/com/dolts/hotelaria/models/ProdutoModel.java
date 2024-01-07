package com.dolts.hotelaria.models;

import com.dolts.hotelaria.enums.TiposProdutoEnum;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "produtos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ProdutoModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private BigDecimal valor;
    private BigDecimal estoque;

    @Enumerated(EnumType.STRING)
    private TiposProdutoEnum tipo;

}
