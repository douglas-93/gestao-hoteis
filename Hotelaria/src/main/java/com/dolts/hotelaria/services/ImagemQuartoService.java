package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ImagemQuartoModel;
import com.dolts.hotelaria.repositories.ImagemQuartoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.AbstractCRUDService;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImagemQuartoService extends BaseCRUDService<ImagemQuartoModel, Long> {

    @Autowired
    private ImagemQuartoRepository imagemQuartoRepository;
    @Override
    public AbstractCRUDRepository<ImagemQuartoModel, Long> getRepository() {
        super.getRepository();
        return imagemQuartoRepository;
    }
}
