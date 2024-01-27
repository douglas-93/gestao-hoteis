package com.dolts.hotelaria.services;

import com.dolts.hotelaria.models.ArquivoDigitalModel;
import com.dolts.hotelaria.models.EnderecoModel;
import com.dolts.hotelaria.models.HotelModel;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RelatorioService {

    @Autowired
    private HospedeService hospedeService;
    @Autowired
    private HotelService hotelService;
    @Autowired
    private ArquivoDigitalService arquivoDigitalService;


    public InputStreamResource gerarRelatorio(String nomeRelatorio) throws JRException, FileNotFoundException {

        String filePath = "classpath:relatorios/".concat(nomeRelatorio).concat(".jrxml");

        // Pega o relatorio
        File file = ResourceUtils.getFile(filePath);

        // Cria o relatório Jasper
        JasperReport report = JasperCompileManager.compileReport(file.getAbsolutePath());

        Map<String, Object> param = getParam();

        var dataSource = this.getData(nomeRelatorio);

        // Gera o relatório
        JasperPrint print = JasperFillManager.fillReport(report, param, new JRBeanCollectionDataSource(dataSource));
//        JasperPrint print = JasperFillManager.fillReport(report, param, new JRBeanCollectionDataSource(hospedeService.findAll()));

        // Cria um InputStreamResource a partir do array de bytes do PDF
        return new org.springframework.core.io.InputStreamResource(new ByteArrayInputStream(JasperExportManager.exportReportToPdf(print)));
    }

    private Map<String, Object> getParam() {
        ByteArrayInputStream stream = new ByteArrayInputStream(getLogo().getDados());

        Map<String, Object> param = new HashMap<String, Object>();
        param.put("logo", stream);

        HotelModel hotel = getHotelData();
        EnderecoModel endereco = hotel.getEndereco().get(0);
        String enderecoFormatado = endereco.getRua().concat(", ").concat(endereco.getNumero()).concat(", ")
                .concat(endereco.getBairro()).concat(", ").concat(endereco.getCidade()).concat(" - ")
                .concat(endereco.getEstado());

        param.put("hotel", hotel.getNome());
        param.put("endereco", enderecoFormatado);
        return param;
    }

    public ArquivoDigitalModel getLogo() {
        Long idLogo = hotelService.getById(hotelService.findLastId()).getLogoMarcaId();
        return arquivoDigitalService.getById(idLogo);
    }

    public HotelModel getHotelData() {
        return hotelService.getById(hotelService.findLastId());
    }

    public List<?> getData(String relatorio) {
        switch (relatorio) {
            case "hospedes":
                return hospedeService.findAll();
            default:
                return Collections.emptyList();
        }
    }
}
