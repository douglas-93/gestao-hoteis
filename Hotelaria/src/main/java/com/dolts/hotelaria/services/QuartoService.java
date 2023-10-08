package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ImagemQuartoModel;
import com.dolts.hotelaria.models.QuartoModel;
import com.dolts.hotelaria.repositories.QuartoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuartoService extends BaseCRUDService<QuartoModel, Long> {
    @Autowired
    private QuartoRepository quartoRepository;

    @Autowired
    private ImagemQuartoService imagemQuartoService;

    @Override
    public QuartoModel save(QuartoModel entity) {
        List<ImagemQuartoModel> imagens = entity.getImagem();
        entity.setImagem(null);
        entity = super.save(entity);
        entity.setImagem(imagens);
        return quartoRepository.save(entity);
    }

    @Override
    public AbstractCRUDRepository<QuartoModel, Long> getRepository() {
        super.getRepository();
        return quartoRepository;
    }
}
