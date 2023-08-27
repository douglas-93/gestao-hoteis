package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.TipoQuartoModel;
import com.dolts.hotelaria.services.TipoQuartoService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tipos")
public class TipoQuartoController extends AbstractCRUDController<TipoQuartoModel, Long> {

    @Autowired
    private TipoQuartoService tipoQuartoService;

    @Override
    protected BaseCRUDService<TipoQuartoModel, Long> getService() {
        return tipoQuartoService;
    }
}
