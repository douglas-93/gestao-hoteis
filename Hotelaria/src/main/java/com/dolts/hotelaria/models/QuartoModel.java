package com.dolts.hotelaria.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @OneToMany(fetch = FetchType.EAGER, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "quarto_id")
    private List<ImagemQuartoModel> imagem;
    @ManyToOne
    private TipoQuartoModel tipoQuarto;
    @ManyToOne
    private CategoriaQuartoModel categoriaQuarto;
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> itens = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "quartos")
    private List<ReservaModel> reservas = new ArrayList<>();
    @Version
    private Long versao;
}
