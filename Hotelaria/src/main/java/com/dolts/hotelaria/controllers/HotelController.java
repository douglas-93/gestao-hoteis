package com.dolts.hotelaria.controllers;


import com.dolts.hotelaria.models.HotelModel;
import com.dolts.hotelaria.services.HotelService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hotel")
public class HotelController extends AbstractCRUDController<HotelModel, Long> {

    @Autowired
    private HotelService hotelService;

    @Override
    protected BaseCRUDService<HotelModel, Long> getService() {
        return hotelService;
    }

}
