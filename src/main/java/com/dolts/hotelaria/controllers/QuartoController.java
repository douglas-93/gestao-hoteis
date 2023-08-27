package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.QuartoModel;
import com.dolts.hotelaria.services.QuartoService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quartos")
public class QuartoController extends AbstractCRUDController<QuartoModel, Long> {
    @Autowired
    private QuartoService quartoService;


    @Override
    protected BaseCRUDService<QuartoModel, Long> getService() {
        return quartoService;
    }
}
