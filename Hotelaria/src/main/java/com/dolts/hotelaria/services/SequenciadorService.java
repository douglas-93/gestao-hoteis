package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.SequenciadorModel;
import com.dolts.hotelaria.repositories.SequenciadorRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SequenciadorService extends BaseCRUDService<SequenciadorModel, Long> {

    @Autowired
    private SequenciadorRepository sequenciaAtributoRepository;

    @Transactional
    public Long proximoNumeroPorAtributo(String atributo) {
        SequenciadorModel sequenciaAtributo = sequenciaAtributoRepository.findByAtributo(atributo)
                .orElse(new SequenciadorModel());

        Long valorAtual = sequenciaAtributo.getValor() != null ? sequenciaAtributo.getValor() : 0;

        Long proximoNumero = valorAtual + 1;
        sequenciaAtributo.setAtributo(atributo);
        sequenciaAtributo.setValor(proximoNumero);

        sequenciaAtributoRepository.save(sequenciaAtributo);

        return proximoNumero;
    }

    @Override
    public AbstractCRUDRepository<SequenciadorModel, Long> getRepository() {
        return sequenciaAtributoRepository;
    }
}

