package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.repositories.HospedeRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HospedeService extends BaseCRUDService<HospedeModel, Long> {

    @Autowired
    private HospedeRepository hospedeRepository;

    @Override
    public AbstractCRUDRepository<HospedeModel, Long> getRepository() {
        super.getRepository();
        return hospedeRepository;
    }

    @Override
    protected void beforeSave(HospedeModel entity) {
        super.beforeSave(entity);
        entity.setDataCadastro(LocalDateTime.now());
        entity.setDataUltimaAtualizacao(LocalDateTime.now());
    }

    @Override
    protected void beforeUpdate(HospedeModel entity) {
        super.beforeUpdate(entity);
        entity.setDataUltimaAtualizacao(LocalDateTime.now());
    }
}
