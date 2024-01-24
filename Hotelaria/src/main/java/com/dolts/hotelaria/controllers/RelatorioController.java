package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.services.ArquivoDigitalService;
import com.dolts.hotelaria.services.HospedeService;
import com.dolts.hotelaria.services.HotelService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.InputStreamResource;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/relatorio")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RelatorioController {

    @Autowired
    private HospedeService hospedeService;
    @Autowired
    private HotelService hotelService;
    @Autowired
    private ArquivoDigitalService arquivoDigitalService;

    @GetMapping
    public ResponseEntity<InputStreamResource> generateReport() throws JRException {
        // Cria o relatório Jasper
        JasperReport report = JasperCompileManager.compileReport("/home/douglas/IdeaProjects/gestao-hoteis/Hotelaria/src/main/java/com/dolts/hotelaria/relatorios/hospedes.jrxml");

        // Obtém os dados para o relatório
        List<HospedeModel> data = hospedeService.findAll();

        // Gera o relatório
        JasperPrint print = JasperFillManager.fillReport(report, new HashMap<>(), new JRBeanCollectionDataSource(data));

        // Cria um InputStreamResource a partir do array de bytes do PDF
        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(JasperExportManager.exportReportToPdf(print)));

        // Configura os cabeçalhos da resposta para download
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=relatorio.pdf");
        headers.add("Content-Type", "application/pdf");

        // Retorna a resposta com o arquivo PDF
        return ResponseEntity.ok()
                .headers(headers)
                .body(resource);
    }

}

