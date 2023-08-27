package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospedeRepository extends AbstractCRUDRepository<HospedeModel, Long> {
}
