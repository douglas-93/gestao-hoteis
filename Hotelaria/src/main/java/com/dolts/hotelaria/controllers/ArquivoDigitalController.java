package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.ArquivoDigitalModel;
import com.dolts.hotelaria.services.ArquivoDigitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/arquivo-digital")
@CrossOrigin(origins = "*",maxAge = 3600)
public class ArquivoDigitalController {

    @Autowired
    private ArquivoDigitalService arquivoDigitalService;

    @PostMapping
    public ResponseEntity<ArquivoDigitalModel> uploadArquivo(@RequestParam("arquivo") MultipartFile arquivo) {
        try {
            ArquivoDigitalModel novoArquivo = new ArquivoDigitalModel();
            novoArquivo.setNome(arquivo.getOriginalFilename());
            novoArquivo.setTipo(arquivo.getContentType());
            novoArquivo.setDados(arquivo.getBytes());
            ArquivoDigitalModel arquivoSalvo = arquivoDigitalService.save(novoArquivo);
            return new ResponseEntity<>(arquivoSalvo, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArquivoDigitalModel> downloadArquivo(@PathVariable Long id) {
        ArquivoDigitalModel arquivo = arquivoDigitalService.getById(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + arquivo.getNome() + "\"")
                .body(arquivo);
    }
/*
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadArquivo(@PathVariable Long id) {
        ArquivoDigitalModel arquivo = arquivoDigitalService.getById(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + arquivo.getNome() + "\"")
                .body(arquivo.getDados());
    }
*/

    @PutMapping("/{id}")
    public ResponseEntity<ArquivoDigitalModel> atualizarArquivo(@PathVariable Long id, @RequestParam("arquivo") MultipartFile arquivo) {
        try {
            ArquivoDigitalModel arquivoExistente = arquivoDigitalService.getById(id);

            arquivoExistente.setNome(arquivo.getOriginalFilename());
            arquivoExistente.setTipo(arquivo.getContentType());
            arquivoExistente.setDados(arquivo.getBytes());

            ArquivoDigitalModel arquivoAtualizado = arquivoDigitalService.save(arquivoExistente);

            return new ResponseEntity<>(arquivoAtualizado, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirArquivo(@PathVariable Long id) {
        try {
            ArquivoDigitalModel arquivo = arquivoDigitalService.getById(id);
            arquivoDigitalService.delete(arquivo);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
