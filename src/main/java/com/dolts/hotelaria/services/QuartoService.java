package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.QuartoModel;
import com.dolts.hotelaria.repositories.QuartoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuartoService extends BaseCRUDService<QuartoModel, Long> {
    @Autowired
    private QuartoRepository quartoRepository;

    @Override
    public AbstractCRUDRepository<QuartoModel, Long> getRepository() {
        super.getRepository();
        return quartoRepository;
    }
}
