package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.EnderecoModel;
import com.dolts.hotelaria.repositories.EnderecoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService extends BaseCRUDService<EnderecoModel, Long> {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Override
    public AbstractCRUDRepository<EnderecoModel, Long> getRepository() {
        super.getRepository();
        return enderecoRepository;
    }
}
