package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.ImagemQuartoModel;
import com.dolts.hotelaria.models.QuartoModel;
import com.dolts.hotelaria.services.CategoriaQuartoService;
import com.dolts.hotelaria.services.ImagemQuartoService;
import com.dolts.hotelaria.services.QuartoService;
import com.dolts.hotelaria.services.TipoQuartoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/quartos")
@CrossOrigin(value = "*", maxAge = 3600)
public class QuartoController {
    @Autowired
    private QuartoService quartoService;
    @Autowired
    private CategoriaQuartoService categoriaQuartoService;
    @Autowired
    private TipoQuartoService tipoQuartoService;
    @Autowired
    private ImagemQuartoService imagemQuartoService;

    @PostMapping
    public ResponseEntity<QuartoModel> create(@RequestParam(value = "imagens", required = false) List<MultipartFile> imagens,
                                              @RequestParam("nome") String nome,
                                              @RequestParam("ativo") Boolean ativo,
                                              @RequestParam("capacidadePessoas") Integer capacidadePessoas,
                                              @RequestParam("valorDiaria") BigDecimal valorDiaria,
                                              @RequestParam("tipoQuarto") Long tipoQuarto,
                                              @RequestParam("categoriaQuarto") Long categoriaQuarto,
                                              @RequestParam(value = "itens", required = false) List<String> itens) {

        QuartoModel entity = new QuartoModel();
        entity.setNome(nome);
        entity.setAtivo(ativo != null ? ativo : true);
        entity.setCapacidadePessoas(capacidadePessoas);
        entity.setValorDiaria(valorDiaria);
        entity.setItens(itens);
        entity.setTipoQuarto(tipoQuartoService.getById(tipoQuarto));
        entity.setCategoriaQuarto(categoriaQuartoService.getById(categoriaQuarto));

        QuartoModel savedEntity = quartoService.save(entity); // Salva o quarto primeiro para obter o ID gerado

        if (imagens != null) {
            QuartoModel finalSavedEntity = savedEntity;
            imagens.forEach(i -> {
                ImagemQuartoModel novaImg = new ImagemQuartoModel();
                try {
                    novaImg.setNome(i.getOriginalFilename());
                    novaImg.setFormato(i.getContentType());
                    novaImg.setTamanho(i.getSize());

                    // Use o InputStream para obter os bytes da imagem
                    InputStream inputStream = i.getInputStream();
                    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                    byte[] buffer = new byte[4096];
                    int bytesRead;
                    while ((bytesRead = inputStream.read(buffer)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                    }
                    byte[] bytes = outputStream.toByteArray();

                    novaImg.setImagem(bytes);


                    novaImg.setIdDoQuartoDaImagem(finalSavedEntity.getId()); // Obtém o ID do quarto salvo
                    novaImg = imagemQuartoService.save(novaImg);
                    Long idImagem = novaImg.getId();
                    finalSavedEntity.getIdDasImagensDoQuarto().add(idImagem);
                } catch (IOException e) {
                    throw new RuntimeException("Falha ao salvar imagem: " + e);
                }
            });
        }

        // Atualiza o quarto após salvar as imagens
        savedEntity = quartoService.save(savedEntity);

        return ResponseEntity.ok(savedEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuartoModel> update(@PathVariable Long id,
                                              @RequestParam(value = "imagens", required = false) List<MultipartFile> imagens,
                                              @RequestParam("nome") String nome,
                                              @RequestParam("ativo") Boolean ativo,
                                              @RequestParam("capacidadePessoas") Integer capacidadePessoas,
                                              @RequestParam("valorDiaria") BigDecimal valorDiaria,
                                              @RequestParam("tipoQuarto") Long tipoQuarto,
                                              @RequestParam("categoriaQuarto") Long categoriaQuarto,
                                              @RequestParam("imagensExcluidas") List<String> imagensExcluidas,
                                              @RequestParam(value = "itens", required = false) List<String> itens) {

        QuartoModel entity = quartoService.getById(id);
        entity.setNome(nome);
        entity.setAtivo(ativo != null ? ativo : true);
        entity.setCapacidadePessoas(capacidadePessoas);
        entity.setValorDiaria(valorDiaria);
        entity.setItens(itens);
        entity.setTipoQuarto(tipoQuartoService.getById(tipoQuarto));
        entity.setCategoriaQuarto(categoriaQuartoService.getById(categoriaQuarto));

        QuartoModel updatedEntity = quartoService.update(entity);

        if (imagens != null) {
            QuartoModel finalSavedEntity = updatedEntity;
            imagens.forEach(i -> {
                ImagemQuartoModel novaImg = new ImagemQuartoModel();
                try {
                    novaImg.setNome(i.getOriginalFilename());
                    novaImg.setFormato(i.getContentType());
                    novaImg.setTamanho(i.getSize());

                    // Use o InputStream para obter os bytes da imagem
                    InputStream inputStream = i.getInputStream();
                    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                    byte[] buffer = new byte[4096];
                    int bytesRead;
                    while ((bytesRead = inputStream.read(buffer)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                    }
                    byte[] bytes = outputStream.toByteArray();

                    novaImg.setImagem(bytes);


                    novaImg.setIdDoQuartoDaImagem(finalSavedEntity.getId()); // Obtém o ID do quarto salvo
                    novaImg = imagemQuartoService.save(novaImg);
                    Long idImagem = novaImg.getId();
                    finalSavedEntity.getIdDasImagensDoQuarto().add(idImagem);
                } catch (IOException e) {
                    throw new RuntimeException("Falha ao salvar imagem: " + e);
                }
            });
        }

        if (!imagensExcluidas.isEmpty()) {
            imagensExcluidas.forEach( i -> {
                Long idTemp = Long.parseLong(i.replaceAll("[\"\\[\\]]", ""));
                imagemQuartoService.delete(imagemQuartoService.getById(idTemp));
                entity.getIdDasImagensDoQuarto().remove(idTemp);
            });
        }

        updatedEntity = quartoService.update(entity);

        return ResponseEntity.ok(updatedEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        QuartoModel entity = quartoService.getById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }
        entity.getIdDasImagensDoQuarto().forEach( i -> {
            imagemQuartoService.delete(imagemQuartoService.getById(i));
        });
        quartoService.delete(entity);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<QuartoModel>> findAll() {
        List<QuartoModel> entities = quartoService.findAll();
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuartoModel> getById(@PathVariable Long id) {
        QuartoModel entity = quartoService.getById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(entity);
    }

}
