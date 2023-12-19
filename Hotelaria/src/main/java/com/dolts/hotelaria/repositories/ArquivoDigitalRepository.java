package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.ArquivoDigitalModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArquivoDigitalRepository extends AbstractCRUDRepository<ArquivoDigitalModel, Long> {
}
