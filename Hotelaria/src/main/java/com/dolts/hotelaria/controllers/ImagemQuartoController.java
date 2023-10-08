package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.ImagemQuartoModel;
import com.dolts.hotelaria.services.ImagemQuartoService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/imagem_quarto")
public class ImagemQuartoController extends AbstractCRUDController<ImagemQuartoModel, Long> {
    @Autowired
    private ImagemQuartoService imagemQuartoService;

    @Override
    protected BaseCRUDService<ImagemQuartoModel, Long> getService() {
        return imagemQuartoService;
    }
}
