package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.TipoQuartoModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoQuartoRepository extends AbstractCRUDRepository<TipoQuartoModel, Long> {
}
