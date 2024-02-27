package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.ConfiguracaoModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfiguracaoRepository extends AbstractCRUDRepository<ConfiguracaoModel, Long> {
}
