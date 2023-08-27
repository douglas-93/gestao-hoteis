package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.CategoriaQuartoModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaQuartoRepository extends AbstractCRUDRepository<CategoriaQuartoModel, Long> {
}
