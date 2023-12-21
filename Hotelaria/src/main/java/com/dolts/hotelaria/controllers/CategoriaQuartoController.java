package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.CategoriaQuartoModel;
import com.dolts.hotelaria.services.CategoriaQuartoService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categorias")
public class CategoriaQuartoController extends AbstractCRUDController<CategoriaQuartoModel, Long> {

    @Autowired
    private CategoriaQuartoService categoriaQuartoService;

    @Override
    protected BaseCRUDService<CategoriaQuartoModel, Long> getService() {
        return categoriaQuartoService;
    }
}
