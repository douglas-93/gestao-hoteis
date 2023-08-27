package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.EnderecoModel;
import com.dolts.hotelaria.services.EnderecoService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController extends AbstractCRUDController<EnderecoModel, Long> {

    @Autowired
    private EnderecoService enderecoService;

    @Override
    protected BaseCRUDService<EnderecoModel, Long> getService() {
        return enderecoService;
    }
}
