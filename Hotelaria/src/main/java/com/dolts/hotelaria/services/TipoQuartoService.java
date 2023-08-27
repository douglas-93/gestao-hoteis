package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.TipoQuartoModel;
import com.dolts.hotelaria.repositories.TipoQuartoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoQuartoService extends BaseCRUDService<TipoQuartoModel, Long> {

    @Autowired
    private TipoQuartoRepository tipoQuartoRepository;

    @Override
    public AbstractCRUDRepository<TipoQuartoModel, Long> getRepository() {
        super.getRepository();
        return tipoQuartoRepository;
    }
}
