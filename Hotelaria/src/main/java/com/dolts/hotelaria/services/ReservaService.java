package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.repositories.ReservaRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservaService extends BaseCRUDService<ReservaModel, Long> {
    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public AbstractCRUDRepository<ReservaModel, Long> getRepository() {
        super.getRepository();
        return reservaRepository;
    }
}
