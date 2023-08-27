package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.HotelModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends AbstractCRUDRepository<HotelModel, Long> {
}
