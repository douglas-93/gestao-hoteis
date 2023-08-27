package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.services.HospedeService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hospedes")
public class HospedeController extends AbstractCRUDController<HospedeModel, Long> {

    @Autowired
    private HospedeService hospedeService;

    @Override
    protected BaseCRUDService<HospedeModel, Long> getService() {
        return hospedeService;
    }
}
