package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.ConfiguracaoModel;
import com.dolts.hotelaria.services.ConfiguracaoService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/configuracao")
public class ConfiguracaoController extends AbstractCRUDController<ConfiguracaoModel, Long> {

    @Autowired
    private ConfiguracaoService configuracaoService;

    @Override
    protected BaseCRUDService<ConfiguracaoModel, Long> getService() {
        return configuracaoService;
    }
}
