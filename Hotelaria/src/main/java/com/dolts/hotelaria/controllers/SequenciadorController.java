package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.SequenciadorModel;
import com.dolts.hotelaria.services.SequenciadorService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sequenciador")
public class SequenciadorController extends AbstractCRUDController<SequenciadorModel, Long> {
    @Autowired
    private SequenciadorService sequenciadorService;

    @GetMapping("proximo")
    public ResponseEntity<Long> proximoNumero(@PathParam("atributo") String atributo) {
        if (!atributo.isEmpty() && !atributo.isBlank()) {
            return ResponseEntity.ok(sequenciadorService.proximoNumeroPorAtributo(atributo));
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    protected BaseCRUDService<SequenciadorModel, Long> getService() {
        return null;
    }
}
