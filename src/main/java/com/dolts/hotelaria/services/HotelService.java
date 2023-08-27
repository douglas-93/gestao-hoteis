package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.HotelModel;
import com.dolts.hotelaria.repositories.HotelRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HotelService extends BaseCRUDService<HotelModel, Long> {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private EnderecoService enderecoService;

    @Override
    public AbstractCRUDRepository<HotelModel, Long> getRepository() {
        super.getRepository();
        return hotelRepository;
    }

    @Override
    protected void beforeSave(HotelModel entity) {
        super.beforeSave(entity);
        entity.getEndereco().forEach(
                e -> {
                    if (e.getId() == null) {
                        e = enderecoService.save(e);
                    }
                }
        );
    }
}
