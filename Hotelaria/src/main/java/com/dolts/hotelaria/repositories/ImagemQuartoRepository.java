package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.ImagemQuartoModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagemQuartoRepository extends AbstractCRUDRepository<ImagemQuartoModel, Long> {
}
