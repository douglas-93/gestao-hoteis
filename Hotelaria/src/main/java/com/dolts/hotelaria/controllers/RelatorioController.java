package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.services.RelatorioService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;

@RestController
@RequestMapping("/relatorio")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping
    public ResponseEntity<InputStreamResource> generateReport(@RequestParam String relatorio) throws JRException, FileNotFoundException {

        // Cria um InputStreamResource a partir do array de bytes do PDF
        InputStreamResource resource = relatorioService.gerarRelatorio(relatorio);

        // Configura os cabeçalhos da resposta para download
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=" + relatorio + ".pdf");
        headers.add("Content-Type", "application/pdf");

        // Retorna a resposta com o arquivo PDF
        return ResponseEntity.ok()
                .headers(headers)
                .body(resource);
    }

}

