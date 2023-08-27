package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.EmpresaModel;
import com.dolts.hotelaria.repositories.EmpresaRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmpresaService extends BaseCRUDService<EmpresaModel, Long> {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private HospedeService hospedeService;

    @Override
    public AbstractCRUDRepository<EmpresaModel, Long> getRepository() {
        super.getRepository();
        return empresaRepository;
    }

    @Override
    protected void beforeSave(EmpresaModel entity) {
        super.beforeSave(entity);
        entity.setDataCadastro(LocalDateTime.now());
        entity.setDataUltimaAtualizacao(LocalDateTime.now());
    }

    @Override
    protected void beforeUpdate(EmpresaModel entity) {
        super.beforeUpdate(entity);
        entity.setDataUltimaAtualizacao(LocalDateTime.now());
    }
}
