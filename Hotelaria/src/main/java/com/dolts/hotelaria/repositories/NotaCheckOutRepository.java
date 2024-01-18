package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.NotaCheckOutModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotaCheckOutRepository extends AbstractCRUDRepository<NotaCheckOutModel, Long> {
}
