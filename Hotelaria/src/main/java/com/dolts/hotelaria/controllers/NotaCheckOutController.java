package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.NotaCheckOutModel;
import com.dolts.hotelaria.services.NotaCheckOutService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/checkOut")
public class NotaCheckOutController extends AbstractCRUDController<NotaCheckOutModel, Long> {
    @Autowired
    private NotaCheckOutService notaCheckOutService;

    @Override
    protected BaseCRUDService<NotaCheckOutModel, Long> getService() {
        return notaCheckOutService;
    }
}
