package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.models.QuartoModel;
import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepository extends AbstractCRUDRepository<ReservaModel, Long> {

    @Query("SELECT r FROM ReservaModel r WHERE ((:entrada BETWEEN r.dataEntrada AND r.dataSaida) OR (:saida BETWEEN r.dataEntrada AND r.dataSaida)" +
            " OR (r.dataEntrada BETWEEN :entrada AND :saida) OR (r.dataSaida BETWEEN :entrada AND :saida)) ORDER BY r.dataEntrada DESC")
    List<ReservaModel> findByData(LocalDate entrada, LocalDate saida);

    @Query(nativeQuery = true, value = "select rq.quartos_id from reservas r join reservas_quartos rq on rq.reserva_model_id = r.id where r.data_entrada >= :entrada and r.data_prevista_saida <= :saida")
    List<QuartoModel> findQuartosOcupadosByData(LocalDate entrada, LocalDate saida);
}
