package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.dto.PageRequestDTO;
import com.dolts.hotelaria.dto.RequestDTO;
import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.services.FiltersSpecifications;
import com.dolts.hotelaria.services.HospedeService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
