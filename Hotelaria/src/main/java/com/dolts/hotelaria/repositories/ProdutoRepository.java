package com.dolts.hotelaria.repositories;

import com.dolts.hotelaria.enums.TiposProdutoEnum;
import com.dolts.hotelaria.models.ProdutoModel;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProdutoRepository extends AbstractCRUDRepository<ProdutoModel, Long> {

    List<ProdutoModel> findProdutoModelByTipo(TiposProdutoEnum tipo);

    List<ProdutoModel> findProdutoModelByEstoqueGreaterThanEqual(BigDecimal estoque);
    List<ProdutoModel> findProdutoModelByEstoqueLessThanEqual(BigDecimal estoque);
    List<ProdutoModel> findProdutoModelByEstoqueEquals(BigDecimal estoque);
}
