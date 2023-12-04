package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.services.ReservaService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "*",maxAge = 3600)
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public ResponseEntity<ReservaModel> create(@RequestBody ReservaModel entity) {
        ReservaModel savedEntity = reservaService.save(entity);
        return ResponseEntity.ok(savedEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservaModel> update(@PathVariable Long id, @RequestBody ReservaModel entity) {
        ReservaModel updatedEntity = reservaService.update(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ReservaModel entity = reservaService.getById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }
        reservaService.delete(entity);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ReservaModel>> findAll() {
        List<ReservaModel> entities = reservaService.findAll();
        return ResponseEntity.ok(entities);
    }

    @PostMapping("/v")
    public ResponseEntity<List<ReservaModel>> findReservasFeitas(@RequestBody ReservaModel entity) {
        List<ReservaModel> reservasFeitas = reservaService.verificaDisponibilidade(entity);

        if (!reservasFeitas.isEmpty()) {
            return ResponseEntity.ok(reservasFeitas);
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaModel> getById(@PathVariable Long id) {
        ReservaModel entity = reservaService.getById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(entity);
    }

}
