package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ImagemQuartoModel;
import com.dolts.hotelaria.models.QuartoModel;
import com.dolts.hotelaria.repositories.QuartoRepository;
import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuartoService extends BaseCRUDService<QuartoModel, Long> {
    @Autowired
    private QuartoRepository quartoRepository;
    @Autowired
    private ImagemQuartoService imagemQuartoService;
    @Autowired
    private TipoQuartoService tipoQuartoService;
    @Autowired
    private CategoriaQuartoService categoriaQuartoService;

    public QuartoModel createQuarto(String nome, Boolean ativo, Integer capacidadePessoas, BigDecimal valorDiaria,
                                    Long tipoQuarto, Long categoriaQuarto, List<String> itens, List<MultipartFile> imagens) {

        QuartoModel entity = new QuartoModel();
        this.definePropriedades(entity, nome, ativo, capacidadePessoas, valorDiaria, tipoQuarto, categoriaQuarto, itens);


        QuartoModel savedEntity = quartoRepository.save(entity);

        handleImagens(imagens, savedEntity);

        // Atualizando a referência do quarto com os IDs das imagens
        savedEntity = quartoRepository.save(savedEntity);

        return savedEntity;
    }

    public QuartoModel updateQuarto(Long id, String nome, Boolean ativo, Integer capacidadePessoas,
                                    BigDecimal valorDiaria, Long tipoQuarto, Long categoriaQuarto,
                                    List<String> itens, List<MultipartFile> imagens, List<Long> imagensExcluidas) throws IOException {


        QuartoModel entity = quartoRepository.getReferenceById(id);
        this.definePropriedades(entity, nome, ativo, capacidadePessoas, valorDiaria, tipoQuarto, categoriaQuarto, itens);

        QuartoModel updatedEntity = quartoRepository.save(entity);

        handleImagens(imagens, updatedEntity);
        handleImagensExcluidas(imagensExcluidas, updatedEntity);

        updatedEntity = quartoRepository.save(updatedEntity);

        return updatedEntity;
    }

    private void handleImagens(List<MultipartFile> imagens, QuartoModel quarto) {
        Long idQuarto = quarto.getId();
        List<Long> idDasImagens = new ArrayList<>();

        if (idQuarto == null) {
            throw new RuntimeException("ID do quarto precisa ser informado!");
        }

        if (imagens != null) {

            imagens.parallelStream().forEach(imagem -> {

                        try {
                            ImagemQuartoModel i = new ImagemQuartoModel();
                            i.setImagem(imagem.getBytes());
                            i.setNome(imagem.getName());
                            i.setFormato(imagem.getContentType());
                            i.setTamanho(imagem.getSize());
                            i.setIdDoQuartoDaImagem(idQuarto);
                            i = imagemQuartoService.save(i);
                            idDasImagens.add(i.getId());

                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
            );
            quarto.setIdDasImagensDoQuarto(idDasImagens);
        }
    }


    private void handleImagensExcluidas(List<Long> imagensExcluidas, QuartoModel quarto) {
        if (imagensExcluidas != null && !imagensExcluidas.isEmpty()) {
            for (Long idImagem : imagensExcluidas) {
                System.out.println(idImagem);
                imagemQuartoService.delete(imagemQuartoService.getById(idImagem));
                quarto.getIdDasImagensDoQuarto().remove(idImagem);
            }
        }
    }

    private void definePropriedades(QuartoModel entity, String nome, Boolean ativo, Integer capacidadePessoas, BigDecimal valorDiaria,
                                    Long tipoQuarto, Long categoriaQuarto, List<String> itens) {
        entity.setNome(nome);
        entity.setAtivo(ativo != null ? ativo : true);
        entity.setCapacidadePessoas(capacidadePessoas);
        entity.setValorDiaria(valorDiaria);
        entity.setItens(itens);
        entity.setTipoQuarto(tipoQuartoService.getById(tipoQuarto));
        entity.setCategoriaQuarto(categoriaQuartoService.getById(categoriaQuarto));
    }

    @Override
    public AbstractCRUDRepository<QuartoModel, Long> getRepository() {
        super.getRepository();
        return quartoRepository;
    }
}
