package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaRepository extends AbstractCRUDRepository<ReservaModel, Long> {
}
