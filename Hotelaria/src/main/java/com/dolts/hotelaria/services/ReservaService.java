package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.repositories.EmpresaRepository;
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
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ReservaService extends BaseCRUDService<ReservaModel, Long> {
    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private HospedeRepository hospedeRepository;

    @Autowired
    private QuartoRepository quartoRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    List<ReservaModel> reservas = new ArrayList<>();

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

        entity.setEstadia(geraDatas(entity.getDataEntrada(), entity.getDataPrevistaSaida()));

        if (!entity.getHospedes().isEmpty()) {
            entity.setHospedes(
                    entity.getHospedes().stream()
                            .map(hospede -> hospedeRepository.findById(hospede.getId()).orElse(null))
                            .collect(Collectors.toList())
            );
        }

        if (!entity.getQuartos().isEmpty()) {
            entity.getQuartos().forEach(q -> {
                if (!Objects.equals(q, entity.getQuarto())) {
                    ReservaModel reserv = new ReservaModel();
                    reserv.atualizarReserva(entity);
                    reserv.setQuarto(quartoRepository.findById(q.getId()).orElse(null));
                    this.reservas.add(reserv);
                }
            });
        }

        if (!this.reservas.isEmpty()) {
            this.reservas.forEach(r -> {
                r = reservaRepository.save(r);
            });
        }

    }

    @Override
    protected void afterSave(ReservaModel entity) {
        super.afterSave(entity);

        this.reservas.forEach(r -> {
            r.setIdReservaOriginal(entity.getId());
            reservaRepository.save(r);
        });
    }

    @Override
    protected void beforeDelete(ReservaModel entity) {
        super.beforeDelete(entity);

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

        if (entity.getEmpresa() != null) {
            entity.setEmpresa(empresaRepository.getReferenceById(entity.getEmpresa().getId()));
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

    public List<ReservaModel> verificaDisponibilidade(ReservaModel entity) {

        List<ReservaModel> reservasJaRealizadas = new ArrayList<>();

        entity.getQuartos().forEach(q -> {
            List<ReservaModel> reservas = reservaRepository.findReservasSobrepostas(q.getId(),
                    entity.getDataEntrada(), entity.getDataPrevistaSaida());

            if (!reservas.isEmpty()) {
                reservasJaRealizadas.addAll(reservas);
            }
        });

        return reservasJaRealizadas;
    }


    @Override
    protected void beforeUpdate(ReservaModel entity) {
        super.beforeUpdate(entity);
        entity.setDataAlteracaoReserva(LocalDateTime.now());
    }

    public List<ReservaModel> buscarReservasPorPeriodo(LocalDate dataEntrada1, LocalDate dataEntrada2, LocalDate dataPrevistaSaida1, LocalDate dataPrevistaSaida2) {
        return reservaRepository.findReservasBetweenDatesAndNotCanceled(
                dataEntrada1,
                dataEntrada2,
                dataPrevistaSaida1,
                dataPrevistaSaida2);
    }

    public List<ReservaModel> buscarReservasPorPeriodoComCheckIn(LocalDate entrada1, LocalDate entrada2, LocalDate saida1, LocalDate saida2) {
        return reservaRepository.findReservasBetweenDatesAndNotCanceledAndCheckedIn(
                entrada1,
                entrada2,
                saida1,
                saida2);
    }

    public List<ReservaModel> buscaReservasSemCheckOut() {
        return reservaRepository.findByCanceladaIsNullAndCheckedOutIsNullAndCheckedInIsTrue();
    }
}
