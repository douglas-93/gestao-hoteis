package com.dolts.hotelaria.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Objects;

@Getter
@Setter
public class PageRequestDTO {

    private Integer page = 0;
    private Integer pageSize = 10;
    private Sort.Direction sort = Sort.Direction.ASC;

    private String sortColumn = "id";

    public Pageable getPageable(PageRequestDTO dto) {
        Integer page = Objects.nonNull(dto.page) ? dto.page : this.page;
        Integer pageSize = Objects.nonNull(dto.pageSize) ? dto.pageSize : this.pageSize;
        Sort.Direction sort = Objects.nonNull(dto.sort) ? dto.sort : this.sort;
        String sortColumn = Objects.nonNull(dto.sortColumn) ? dto.sortColumn : this.sortColumn;

        PageRequest request = PageRequest.of(page, pageSize, sort, sortColumn);
        return request;
    }
}
