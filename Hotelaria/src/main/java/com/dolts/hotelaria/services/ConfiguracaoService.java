package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ConfiguracaoModel;
import com.dolts.hotelaria.repositories.ConfiguracaoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfiguracaoService extends BaseCRUDService<ConfiguracaoModel, Long> {
    @Autowired
    private ConfiguracaoRepository configuracaoRepository;

    @Override
    public AbstractCRUDRepository<ConfiguracaoModel, Long> getRepository() {
        super.getRepository();
        return configuracaoRepository;
    }
}
