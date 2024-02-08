package com.dolts.hotelaria.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class SearchRequestDTO implements Serializable {
    private String columnName;
    private String value;
    private Operation operation;
    private String joinTable;

    public enum Operation {
        EQUAL, LIKE, IN, GREATER_THAN, LESS_THAN, GREATER_THAN_EQUAL, LESS_THAN_EQUAL, BETWEEN, JOIN;
    }
}
