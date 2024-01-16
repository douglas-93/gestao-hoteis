package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.enums.TipoTransacaoEnum;
import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.models.ProdutoModel;
import com.dolts.hotelaria.models.ReservaModel;
import com.dolts.hotelaria.models.TransacaoModel;
import com.dolts.hotelaria.services.*;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transacao")
public class TransacaoController extends AbstractCRUDController<TransacaoModel, Long> {
    @Autowired
    private TransacaoService transacaoService;

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private HospedeService hospedeService;

    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/transacao-por-reserva")
    public ResponseEntity<List<TransacaoModel>> transacoesPorReserva(@RequestBody ReservaModel reserva) {
        ReservaModel reservaSaved = reservaService.getById(reserva.getId());
        List<TransacaoModel> transacoes = transacaoService.transacaoPorReserva(reservaSaved);
        return ResponseEntity.ok(transacoes);
    }
    @PostMapping("/transacao-por-hospede")
    public ResponseEntity<List<TransacaoModel>> transacoesPorHospede(@RequestBody HospedeModel hospede) {
        HospedeModel hospedeSaved = hospedeService.getById(hospede.getId());
        List<TransacaoModel> transacoes = transacaoService.transacaoPorHospede(hospedeSaved);
        return ResponseEntity.ok(transacoes);
    }
    @PostMapping("/transacao-por-produto")
    public ResponseEntity<List<TransacaoModel>> transacoesPorReserva(@RequestBody ProdutoModel produto) {
        ProdutoModel produtoSaved = produtoService.getById(produto.getId());
        List<TransacaoModel> transacoes = transacaoService.transacaoPorProduto(produtoSaved);
        return ResponseEntity.ok(transacoes);
    }

    @GetMapping("/transacao-por-tipo")
    public ResponseEntity<List<TransacaoModel>> transacoesPortipo(@RequestParam TipoTransacaoEnum tipo) {
        List<TransacaoModel> transacoes = transacaoService.transacaoPorTipo(tipo);
        return ResponseEntity.ok(transacoes);
    }


    @Override
    protected BaseCRUDService<TransacaoModel, Long> getService() {
        return transacaoService;
    }
}
