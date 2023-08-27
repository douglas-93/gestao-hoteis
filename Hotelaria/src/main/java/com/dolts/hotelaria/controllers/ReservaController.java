package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.services.ReservaService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reservas")
public class ReservaController extends AbstractCRUDController<ReservaModel, Long> {

    @Autowired
    private ReservaService reservaService;

    @Override
    protected BaseCRUDService<ReservaModel, Long> getService() {
        return reservaService;
    }
}
