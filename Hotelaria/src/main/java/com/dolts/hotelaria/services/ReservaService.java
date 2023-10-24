package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.repositories.HospedeRepository;
import com.dolts.hotelaria.repositories.QuartoRepository;
import com.dolts.hotelaria.repositories.ReservaRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class ReservaService extends BaseCRUDService<ReservaModel, Long> {
    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private HospedeRepository hospedeRepository;

    @Autowired
    private QuartoRepository quartoRepository;

    @Override
    public AbstractCRUDRepository<ReservaModel, Long> getRepository() {
        super.getRepository();
        return reservaRepository;
    }

    @Override
    protected void beforeSave(ReservaModel entity) {
        super.beforeSave(entity);
        entity.setDataCriacaoReserva(LocalDateTime.now());
        entity.setDataAlteracaoReserva(LocalDateTime.now());

        if (!entity.getHospedes().isEmpty()) {
            entity.setHospedes(
                    entity.getHospedes().stream()
                            .map(hospede -> hospedeRepository.findById(hospede.getId()).orElse(null))
                            .collect(Collectors.toList())
            );
        }

        if (!entity.getQuartos().isEmpty()) {
            entity.setQuartos(
                    entity.getQuartos().stream()
                            .map(quarto -> quartoRepository.findById(quarto.getId()).orElse(null))
                            .collect(Collectors.toList())
            );
        }

    }

    @Override
    protected void beforeUpdate(ReservaModel entity) {
        super.beforeUpdate(entity);
        entity.setDataAlteracaoReserva(LocalDateTime.now());
    }
}
