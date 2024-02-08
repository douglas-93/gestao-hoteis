package com.dolts.hotelaria.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class RequestDTO implements Serializable {
    private List<SearchRequestDTO> searchRequestDTOS;
    private GlobalOperator globalOperator;
    private PageRequestDTO pageDTO;

    public enum GlobalOperator {
        AND, OR;
    }
}
