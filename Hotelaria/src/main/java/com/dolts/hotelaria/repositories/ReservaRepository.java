package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.QuartoModel;
import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepository extends AbstractCRUDRepository<ReservaModel, Long> {
    @Query("SELECT r FROM ReservaModel r JOIN r.quartos q " +
            "WHERE q.id = :quartoId " +
            "AND ((r.dataEntrada BETWEEN :dataEntrada AND :dataSaida) OR " +
            "(r.dataSaida BETWEEN :dataEntrada AND :dataSaida) OR " +
            "(:dataEntrada BETWEEN r.dataEntrada AND r.dataSaida))")
    List<ReservaModel> findReservasSobrepostas(@Param("quartoId") Long quartoId,
                                               @Param("dataEntrada") LocalDate dataEntrada,
                                               @Param("dataSaida") LocalDate dataSaida);
}
