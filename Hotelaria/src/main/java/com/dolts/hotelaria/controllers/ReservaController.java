package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public ResponseEntity<ReservaModel> create(@RequestBody ReservaModel entity) {
        ReservaModel savedEntity = reservaService.save(entity);
        return ResponseEntity.ok(savedEntity);
    }

    @PostMapping("/v")
    public ResponseEntity<List<ReservaModel>> findReservasFeitas(@RequestBody ReservaModel entity) {
        List<ReservaModel> reservasFeitas = reservaService.verificaDisponibilidade(entity);

        if (!reservasFeitas.isEmpty()) {
            return ResponseEntity.ok(reservasFeitas);
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/checkIn")
    public ResponseEntity<ReservaModel> checkIn(@RequestBody ReservaModel entity) {
        ReservaModel savedEntity = reservaService.getById(entity.getId());
        savedEntity.setCheckedIn(true);
        savedEntity = reservaService.save(savedEntity);
        return ResponseEntity.ok(savedEntity);
    }

    @PostMapping("/cancelar")
    public ResponseEntity<ReservaModel> cancelar(@RequestBody ReservaModel entity) {
        ReservaModel savedEntity = reservaService.getById(entity.getId());
        savedEntity.setCancelada(true);
        savedEntity.setMotivoCancelamento(entity.getMotivoCancelamento());
        savedEntity = reservaService.save(savedEntity);
        return ResponseEntity.ok(savedEntity);
    }

    @GetMapping("/reserva-ativa-periodo")
    public ResponseEntity<List<ReservaModel>> buscarReservasPorPeriodo(
            @RequestParam("dataEntrada1") String dataEntrada1,
            @RequestParam("dataEntrada2") String dataEntrada2,
            @RequestParam("dataPrevistaSaida1") String dataPrevistaSaida1,
            @RequestParam("dataPrevistaSaida2") String dataPrevistaSaida2
    ) {
        LocalDate entrada1 = LocalDate.parse(dataEntrada1, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate entrada2 = LocalDate.parse(dataEntrada2, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate saida1 = LocalDate.parse(dataPrevistaSaida1, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate saida2 = LocalDate.parse(dataPrevistaSaida2, DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        List<ReservaModel> reservas = reservaService.buscarReservasPorPeriodo(
                entrada1, entrada2, saida1, saida2);

        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/reserva-ativa-periodo-checkIn")
    public ResponseEntity<List<ReservaModel>> buscarReservasPorPeriodoComCheckIn(
            @RequestParam("dataEntrada1") String dataEntrada1,
            @RequestParam("dataEntrada2") String dataEntrada2,
            @RequestParam("dataPrevistaSaida1") String dataPrevistaSaida1,
            @RequestParam("dataPrevistaSaida2") String dataPrevistaSaida2
    ) {
        LocalDate entrada1 = LocalDate.parse(dataEntrada1, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate entrada2 = LocalDate.parse(dataEntrada2, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate saida1 = LocalDate.parse(dataPrevistaSaida1, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate saida2 = LocalDate.parse(dataPrevistaSaida2, DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        List<ReservaModel> reservas = reservaService.buscarReservasPorPeriodoComCheckIn(
                entrada1, entrada2, saida1, saida2);

        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/reservas-sem-checkOut")
    public ResponseEntity<List<ReservaModel>> buscarReservasSemCheckOut() {
        List<ReservaModel> reservas = reservaService.buscaReservasSemCheckOut();
        return ResponseEntity.ok(reservas);
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

    @GetMapping("/{id}")
    public ResponseEntity<ReservaModel> getById(@PathVariable Long id) {
        ReservaModel entity = reservaService.getById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(entity);
    }
}

