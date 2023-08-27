package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.QuartoModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuartoRepository extends AbstractCRUDRepository<QuartoModel, Long> {
}
