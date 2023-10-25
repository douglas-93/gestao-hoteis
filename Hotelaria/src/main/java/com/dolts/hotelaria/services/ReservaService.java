package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.repositories.HospedeRepository;
import com.dolts.hotelaria.repositories.QuartoRepository;
import com.dolts.hotelaria.repositories.ReservaRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

    private List<LocalDate> geraDatas(LocalDate dataEntrada, LocalDate dataSaida) {
        List<LocalDate> intervalo = new ArrayList<>();
        LocalDate currentDate = dataEntrada;
        while (currentDate.isBefore(dataSaida)) {
            intervalo.add(currentDate);
            currentDate = currentDate.plusDays(1);
        }
        intervalo.add(dataSaida);
        return intervalo;
    }

    private List<ReservaModel> verificaReservas(ReservaModel entity) {
        List<ReservaModel> reservasFeitas = reservaRepository.findByData(entity.getDataEntrada(), entity.getDataSaida());
        List<ReservaModel> reservasSobrepostas = new ArrayList<>();



        return reservasSobrepostas;
    }


    @Override
    protected void beforeUpdate(ReservaModel entity) {
        super.beforeUpdate(entity);
        entity.setDataAlteracaoReserva(LocalDateTime.now());
    }
}
