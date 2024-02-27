package com.dolts.hotelaria.services;

import com.dolts.hotelaria.enums.TipoTransacaoEnum;
import com.dolts.hotelaria.enums.TiposProdutoEnum;
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

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private HospedeService hospedeService;

    @Autowired
    private ReservaService reservaService;

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
        switch (entity.getTipoTransacao()) {
            case BAIXA, SAIDA -> {
                entity.setQuantidade(entity.getQuantidade().negate());
            }
        }

        if (entity.getHospede() != null) {
            entity.setHospede(hospedeService.getById(entity.getHospede().getId()));
        }

        if (entity.getReserva() != null) {
            entity.setReserva(reservaService.getById(entity.getReserva().getId()));
        }

        if (entity.getProdutoModel() != null) {
            entity.setProdutoModel(produtoService.getById(entity.getProdutoModel().getId()));
        }
    }

    @Override
    protected void afterSave(TransacaoModel entity) {
        super.afterSave(entity);
        ProdutoModel prod = produtoService.getById(entity.getProdutoModel().getId());
        if (prod.getEstoque() != null) {
            if (prod.getTipo() != TiposProdutoEnum.SERVICO_ADICIONAL) {
                prod.setEstoque(prod.getEstoque().add(entity.getQuantidade()));
            }
        } else {
            prod.setEstoque(entity.getQuantidade());
        }
        produtoService.save(prod);
    }

    @Override
    public AbstractCRUDRepository<TransacaoModel, Long> getRepository() {
        super.getRepository();
        return transacaoRepository;
    }
}
