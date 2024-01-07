package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.enums.TiposProdutoEnum;
import com.dolts.hotelaria.models.ProdutoModel;
import com.dolts.hotelaria.services.ProdutoService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController extends AbstractCRUDController<ProdutoModel, Long> {
    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/produtos-com-estoque")
    public ResponseEntity<List<ProdutoModel>> produtosComEstoque() {
        List<ProdutoModel> produtos = produtoService.produtoComEstoque();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/produtos-estoque-zero")
    public ResponseEntity<List<ProdutoModel>> produtosComEstoqueZerado() {
        List<ProdutoModel> produtos = produtoService.produtoComEstoqueZerado();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/produtos-por-tipo")
    public ResponseEntity<List<ProdutoModel>> produtosPorTipo(@RequestParam TiposProdutoEnum tipo) {
        List<ProdutoModel> produtos = produtoService.produtoPorTipo(tipo);
        return ResponseEntity.ok(produtos);
    }

    @Override
    protected BaseCRUDService<ProdutoModel, Long> getService() {
        return produtoService;
    }
}
