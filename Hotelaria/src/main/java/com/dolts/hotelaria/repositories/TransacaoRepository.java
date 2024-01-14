package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.enums.TipoTransacaoEnum;
import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.models.ProdutoModel;
import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.models.TransacaoModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransacaoRepository extends AbstractCRUDRepository<TransacaoModel, Long> {

    @Query("SELECT t FROM TransacaoModel t " +
            "WHERE t.reserva.id = :reservaId AND t.numeroTransacao IS NOT null")
    List<TransacaoModel> findByReservas(@Param("reserva") Long reservaId);

    List<TransacaoModel> findTransacaoModelByTipoTransacao(TipoTransacaoEnum tipoTransacao);

    List<TransacaoModel> findTransacaoModelByReserva(ReservaModel reserva);

    List<TransacaoModel> findTransacaoModelByHospede(HospedeModel hospede);

    List<TransacaoModel> findTransacaoModelByProdutoModel(ProdutoModel produto);
}
