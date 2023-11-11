package com.dolts.hotelaria.models;

import jakarta.persistence.*;
import lombok.*;

import java.io.File;
import java.io.Serializable;

@Entity
@Table(name = "imagens_quarto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ImagemQuartoModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "imagem", columnDefinition = "BLOB")
    private byte[] imagem;


    @Version
    private Long version;
}

