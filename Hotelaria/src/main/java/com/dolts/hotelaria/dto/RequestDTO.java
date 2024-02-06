package com.dolts.hotelaria.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class RequestDTO implements Serializable {
    String columnName;
    String value;
}
