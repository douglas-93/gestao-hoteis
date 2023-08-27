package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.EnderecoModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoRepository extends AbstractCRUDRepository<EnderecoModel, Long> {
}
