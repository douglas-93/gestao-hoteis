package com.dolts.hotelaria.services;

import com.dolts.hotelaria.dto.RequestDTO;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class FiltersSpecifications<T> {

    public Specification<T> getSearchSpecification(RequestDTO requestDTO) {
        return new Specification<T>() {
            @Override
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(requestDTO.getColumnName()), requestDTO.getValue());
            }
        };
    }

}
