package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.EmpresaModel;
import com.dolts.hotelaria.services.EmpresaService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/empresas")
public class EmpresaController extends AbstractCRUDController<EmpresaModel, Long> {

    @Autowired
    private EmpresaService empresaService;

    @Override
    protected BaseCRUDService<EmpresaModel, Long> getService() {
        return empresaService;
    }
}
