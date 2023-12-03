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

        QuartoModel entity = quartoService.createQuarto(nome, ativo, capacidadePessoas, valorDiaria, tipoQuarto, categoriaQuarto, itens, imagens);
        return ResponseEntity.ok(entity);
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
                                              @RequestParam("imagensExcluidas") List<Long> imagensExcluidas,
                                              @RequestParam(value = "itens", required = false) List<String> itens) throws IOException {

        QuartoModel entity = quartoService.updateQuarto(id, nome, ativo, capacidadePessoas, valorDiaria, tipoQuarto, categoriaQuarto, itens, imagens, imagensExcluidas);
        return ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        QuartoModel entity = quartoService.getById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }

        if (!entity.getIdDasImagensDoQuarto().isEmpty()) {
            entity.getIdDasImagensDoQuarto().parallelStream().forEach(i -> {
                imagemQuartoService.delete(imagemQuartoService.getById(i));
            });
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
