package com.dolts.hotelaria.models;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quartos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class QuartoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String nome;
    private Boolean ativo = true;
    private Integer capacidadePessoas;
    private BigDecimal valorDiaria;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] imagem;
    @ManyToOne
    private TipoQuartoModel tipoQuarto;
    @ManyToOne
    private CategoriaQuartoModel categoriaQuarto;
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> itens = new ArrayList<>();
    @Version
    private Long versao;
}
