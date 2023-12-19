package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ArquivoDigitalModel;
import com.dolts.hotelaria.repositories.ArquivoDigitalRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArquivoDigitalService extends BaseCRUDService<ArquivoDigitalModel, Long> {

    @Autowired
    private ArquivoDigitalRepository arquivoDigitalRepository;

    @Override
    public AbstractCRUDRepository<ArquivoDigitalModel, Long> getRepository() {
        super.getRepository();
        return arquivoDigitalRepository;
    }
}
