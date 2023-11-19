package com.dolts.hotelaria.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.io.Serializable;

@Entity
@Table(name = "imagens")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ImagemQuartoModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String formato;
    private Long tamanho;
    private Long idDoQuartoDaImagem;

    @Lob
    private byte[] imagem;

    @Version
    private Long version;
}

