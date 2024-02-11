package com.dolts.hotelaria.services;

import com.dolts.hotelaria.dto.RequestDTO;
import com.dolts.hotelaria.dto.SearchRequestDTO;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FiltersSpecifications<T> {

    public Specification<T> getSearchSpecification(SearchRequestDTO searchRequestDTO) {
        return new Specification<T>() {
            @Override
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(searchRequestDTO.getColumnName()), searchRequestDTO.getValue());
            }
        };
    }

    public Specification<T> getSearchSpecification(List<SearchRequestDTO> searchRequestDTOS, RequestDTO.GlobalOperator globalOperator) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            for (SearchRequestDTO requestDTO : searchRequestDTOS) {

                switch (requestDTO.getOperation()) {
                    case LIKE -> {
                        Predicate like = criteriaBuilder.like(root.get(requestDTO.getColumnName()), "%" + requestDTO.getValue() + "%");
                        predicates.add(like);
                    }
                    case IN -> {
                        String[] splited = requestDTO.getValue().split(",");

                        Predicate in = root.get(requestDTO.getColumnName()).in(Arrays.asList(splited));
                        predicates.add(in);
                    }
                    case BETWEEN -> {
                        /*10,20*/
                        String[] splited = requestDTO.getValue().split(",");

                        Predicate between = criteriaBuilder.between(root.get(requestDTO.getColumnName()), splited[0], splited[1]);
                        predicates.add(between);
                    }
                    case JOIN -> {
                        Predicate join = criteriaBuilder.equal(root.join(requestDTO.getJoinTable()).get(requestDTO.getColumnName()), requestDTO.getValue());
                        predicates.add(join);
                    }

                    case EQUAL, GREATER_THAN, LESS_THAN, GREATER_THAN_EQUAL, LESS_THAN_EQUAL -> {
                        Object value;

                        /* Pegando a classe */
                        Class<?> classType = root.get(requestDTO.getColumnName()).getJavaType();

                        /* Se for Data, formatando para pesquisa */
                        if (classType == LocalDate.class) {
                            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                            value = LocalDate.parse(requestDTO.getValue(), formatter);
                        /* Se for o Enum, cria-se a instância a partir do Enum para pesquisa */
                        } else if (Enum.class.isAssignableFrom(classType)) {
                            Enum<?>[] enumConstants = (Enum<?>[]) classType.getEnumConstants();
                            value = Arrays.stream(enumConstants)
                                    .filter(e -> e.name().equals(requestDTO.getValue()))
                                    .findFirst()
                                    .orElseThrow(() -> new IllegalArgumentException("Valor inválido para o enum: " + requestDTO.getValue()));
                        /* Se não, até então, cairá em uma classe comum de comparação tipo String ou Long */
                        } else {
                            value = requestDTO.getValue();
                        }

                        switch (requestDTO.getOperation()) {
                            case EQUAL -> {
                                Predicate predicate = criteriaBuilder.equal(root.get(requestDTO.getColumnName()), value);
                                predicates.add(predicate);
                            }
                            case GREATER_THAN -> {
                                Predicate predicate = criteriaBuilder.greaterThan(root.get(requestDTO.getColumnName()), (Comparable) value);
                                predicates.add(predicate);
                            }
                            case LESS_THAN -> {
                                Predicate predicate = criteriaBuilder.lessThan(root.get(requestDTO.getColumnName()), (Comparable) value);
                                predicates.add(predicate);
                            }
                            case GREATER_THAN_EQUAL -> {
                                Predicate predicate = criteriaBuilder.greaterThanOrEqualTo(root.get(requestDTO.getColumnName()), (Comparable) value);
                                predicates.add(predicate);
                            }
                            case LESS_THAN_EQUAL -> {
                                Predicate predicate = criteriaBuilder.lessThanOrEqualTo(root.get(requestDTO.getColumnName()), (Comparable) value);
                                predicates.add(predicate);
                            }
                            default -> {
                                throw new IllegalArgumentException("Operação inválida para o tipo de dados");
                            }
                        }
                    }


                    default -> {
                        throw new IllegalArgumentException("Argumento inválido");
                    }
                }
            }

            if (globalOperator.equals(RequestDTO.GlobalOperator.AND)) {
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            } else {
                return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
            }
        };
    }

}
