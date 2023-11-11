package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.CategoriaQuartoModel;
import com.dolts.hotelaria.models.ImagemQuartoModel;
import com.dolts.hotelaria.models.QuartoModel;
import com.dolts.hotelaria.models.TipoQuartoModel;
import com.dolts.hotelaria.services.CategoriaQuartoService;
import com.dolts.hotelaria.services.QuartoService;
import com.dolts.hotelaria.services.TipoQuartoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    /*@PostMapping
    public ResponseEntity<QuartoModel> create(@RequestBody QuartoModel entity) {
        QuartoModel savedEntity = quartoService.save(entity);
        return ResponseEntity.ok(savedEntity);
    }*/
    @PostMapping
    public ResponseEntity<QuartoModel> create(@RequestParam("imagens") List<MultipartFile> imagens,
                                              @RequestParam("nome") String nome,
                                              @RequestParam("ativo") Boolean ativo,
                                              @RequestParam("capacidadePessoas") Integer capacidadePessoas,
                                              @RequestParam("valorDiaria") BigDecimal valorDiaria,
                                              @RequestParam("tipoQuarto") TipoQuartoModel tipoQuarto,
                                              @RequestParam("categoriaQuarto") CategoriaQuartoModel categoriaQuarto,
                                              @RequestParam("itens") List<String> itens) {

        QuartoModel entity = new QuartoModel();
        entity.setNome(nome);
        entity.setAtivo(ativo ? ativo : true);
        entity.setCapacidadePessoas(capacidadePessoas);
        entity.setValorDiaria(valorDiaria);
        entity.setItens(itens);
        entity.setTipoQuarto(tipoQuartoService.getById(tipoQuarto.getId()));
        entity.setCategoriaQuarto(categoriaQuartoService.getById(categoriaQuarto.getId()));

        imagens.forEach(i -> {
            ImagemQuartoModel novaImg = new ImagemQuartoModel();
            try {
                novaImg.setImagem(i.getBytes());
                entity.getImagem().add(novaImg);
            } catch (IOException e) {
                throw new RuntimeException("Falha ao salvar imagem: " + e);
            }
        });

        QuartoModel savedEntity = quartoService.save(entity);
        return ResponseEntity.ok(savedEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuartoModel> update(@PathVariable Long id, @RequestBody QuartoModel entity) {
        QuartoModel updatedEntity = quartoService.update(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        QuartoModel entity = quartoService.getById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }
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
