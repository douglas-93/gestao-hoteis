package com.dolts.hotelaria.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "arquivoDigital")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ArquivoDigitalModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String tipo;
    @Lob
    private byte[] dados;
}
