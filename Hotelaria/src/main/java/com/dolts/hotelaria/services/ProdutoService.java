package com.dolts.hotelaria.services;

import com.dolts.hotelaria.enums.TiposProdutoEnum;
import com.dolts.hotelaria.models.ProdutoModel;
import com.dolts.hotelaria.repositories.ProdutoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProdutoService extends BaseCRUDService<ProdutoModel, Long> {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<ProdutoModel> produtoPorTipo(TiposProdutoEnum tipo) {
        return produtoRepository.findProdutoModelByTipo(tipo);
    }

    public List<ProdutoModel> produtoComEstoque() {
        BigDecimal quantidade = new BigDecimal(1);
        return produtoRepository.findProdutoModelByEstoqueGreaterThanEqual(quantidade);
    }

    public List<ProdutoModel> produtoComEstoqueZerado() {
        BigDecimal quantidade = new BigDecimal(0);
        return produtoRepository.findProdutoModelByEstoqueEquals(quantidade);
    }

    @Override
    public AbstractCRUDRepository<ProdutoModel, Long> getRepository() {
        super.getRepository();
        return produtoRepository;
    }
}
