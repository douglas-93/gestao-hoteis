package com.dolts.hotelaria.utils.service;

import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;

public interface AbstractCRUDService<T, D> {
    AbstractCRUDRepository<T, D> getRepository();
}
