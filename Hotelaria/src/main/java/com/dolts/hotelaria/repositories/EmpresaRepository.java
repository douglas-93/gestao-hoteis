package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.EmpresaModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends AbstractCRUDRepository<EmpresaModel, Long> {
}
