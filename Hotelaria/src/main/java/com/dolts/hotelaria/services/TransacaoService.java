package com.dolts.hotelaria.services;

import com.dolts.hotelaria.enums.TipoTransacaoEnum;
import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.models.ProdutoModel;
import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.models.TransacaoModel;
import com.dolts.hotelaria.repositories.TransacaoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransacaoService extends BaseCRUDService<TransacaoModel, Long> {

    @Autowired
    private TransacaoRepository transacaoRepository;

    public List<TransacaoModel> transacaoPorIdReserva(Long reservaId) {
        return transacaoRepository.findByReservas(reservaId);
    }

    public List<TransacaoModel> transacaoPorTipo(TipoTransacaoEnum tipo) {
        return transacaoRepository.findTransacaoModelByTipoTransacao(tipo);
    }

    public List<TransacaoModel> transacaoPorReserva(ReservaModel reserva) {
        return transacaoRepository.findTransacaoModelByReserva(reserva);
    }

    public List<TransacaoModel> transacaoPorHospede(HospedeModel hospede) {
        return transacaoRepository.findTransacaoModelByHospede(hospede);
    }

    public List<TransacaoModel> transacaoPorProduto(ProdutoModel produto) {
        return transacaoRepository.findTransacaoModelByProdutoModel(produto);
    }

    @Override
    protected void beforeSave(TransacaoModel entity) {
        super.beforeSave(entity);
        entity.setDataHora(LocalDateTime.now());
    }

    @Override
    public AbstractCRUDRepository<TransacaoModel, Long> getRepository() {
        super.getRepository();
        return transacaoRepository;
    }
}
