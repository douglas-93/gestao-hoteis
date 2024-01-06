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
    @Query("SELECT r FROM ReservaModel r JOIN r.quarto q " +
            "WHERE q.id = :quartoId " +
            "AND ((r.dataEntrada BETWEEN :dataEntrada AND :dataSaida) OR " +
            "(COALESCE(r.dataPrevistaSaida, r.dataSaida) BETWEEN :dataEntrada AND :dataSaida) OR " +
            "(:dataEntrada BETWEEN r.dataEntrada AND COALESCE(r.dataPrevistaSaida, r.dataSaida)))")
    List<ReservaModel> findReservasSobrepostas(@Param("quartoId") Long quartoId,
                                               @Param("dataEntrada") LocalDate dataEntrada,
                                               @Param("dataSaida") LocalDate dataSaida);

    List<ReservaModel> findByDataEntradaBetweenAndDataPrevistaSaidaBetweenAndCanceladaNull(
            LocalDate dataEntrada1, LocalDate dataEntrada2,
            LocalDate dataPrevistaSaida1, LocalDate dataPrevistaSaida2
    );

    @Query("SELECT r FROM ReservaModel r " +
            "WHERE ((r.dataEntrada >= :dataEntrada1 AND r.dataEntrada <= :dataEntrada2) " +
            "OR (r.dataPrevistaSaida >= :dataPrevistaSaida1 AND r.dataPrevistaSaida <= :dataPrevistaSaida2)) " +
            "AND r.cancelada IS NULL")
    List<ReservaModel> findReservasBetweenDatesAndNotCanceled(
            @Param("dataEntrada1") LocalDate dataEntrada1,
            @Param("dataEntrada2") LocalDate dataEntrada2,
            @Param("dataPrevistaSaida1") LocalDate dataPrevistaSaida1,
            @Param("dataPrevistaSaida2") LocalDate dataPrevistaSaida2);


    List<ReservaModel> findByQuartoAndDataEntradaBetweenAndDataSaidaBetween(QuartoModel quarto,
                                                                            LocalDate dataEntrada1, LocalDate dataEntrada2,
                                                                            LocalDate dataSaida1, LocalDate dataSaida2);

    List<ReservaModel> findByDataEntradaBetweenAndDataSaidaBetween(LocalDate dataEntrada1, LocalDate dataEntrada2,
                                                                   LocalDate dataSaida1, LocalDate dataSaida2);

    List<ReservaModel> findByCanceladaTrue();

    List<ReservaModel> findByEmpresaId(Long empresaId);

    @Query("SELECT r FROM ReservaModel r JOIN r.hospedes h WHERE h.id = :hospedeId " +
            "AND (r.dataEntrada BETWEEN :dataEntrada1 AND :dataEntrada2 OR r.dataSaida BETWEEN :dataSaida1 AND :dataSaida2)")
    List<ReservaModel> findByHospedeAndData(@Param("hospedeId") Long hospedeId,
                                            @Param("dataEntrada1") LocalDate dataEntrada1, @Param("dataEntrada2") LocalDate dataEntrada2,
                                            @Param("dataSaida1") LocalDate dataSaida1, @Param("dataSaida2") LocalDate dataSaida2);


    @Query("SELECT r FROM ReservaModel r WHERE :data BETWEEN r.dataEntrada AND r.dataSaida")
    List<ReservaModel> findByPeriodoEstadia(@Param("data") LocalDate data);
}
