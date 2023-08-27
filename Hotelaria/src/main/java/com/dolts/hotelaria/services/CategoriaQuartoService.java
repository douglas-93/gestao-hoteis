package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.CategoriaQuartoModel;
import com.dolts.hotelaria.repositories.CategoriaQuartoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaQuartoService extends BaseCRUDService<CategoriaQuartoModel, Long> {

    @Autowired
    private CategoriaQuartoRepository categoriaQuartoRepository;

    @Override
    public AbstractCRUDRepository<CategoriaQuartoModel, Long> getRepository() {
        super.getRepository();
        return categoriaQuartoRepository;
    }
}
