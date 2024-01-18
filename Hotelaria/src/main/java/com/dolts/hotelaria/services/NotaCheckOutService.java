package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.NotaCheckOutModel;
import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.repositories.NotaCheckOutRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotaCheckOutService extends BaseCRUDService<NotaCheckOutModel, Long> {
    @Autowired
    private NotaCheckOutRepository notaCheckOutRepository;
    @Autowired
    private ReservaService reservaService;

    @Override
    protected void beforeSave(NotaCheckOutModel entity) {
        super.beforeSave(entity);
        entity.setReserva(reservaService.getById(entity.getReserva().getId()));
        entity.setDataHoraOperacao(LocalDateTime.now());
    }

    @Override
    protected void afterSave(NotaCheckOutModel entity) {
        super.afterSave(entity);
        ReservaModel r = reservaService.getById(entity.getReserva().getId());
        r.setCheckedOut(true);
        reservaService.save(r);
    }

    @Override
    public AbstractCRUDRepository<NotaCheckOutModel, Long> getRepository() {
        return notaCheckOutRepository;
    }
}
