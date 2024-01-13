package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.SequenciadorModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SequenciadorRepository extends AbstractCRUDRepository<SequenciadorModel, Long> {
    Optional<SequenciadorModel> findByAtributo(String atributo);
}
