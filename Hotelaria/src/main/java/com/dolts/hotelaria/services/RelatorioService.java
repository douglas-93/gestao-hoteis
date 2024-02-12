package com.dolts.hotelaria.services;

import com.dolts.hotelaria.dto.RequestDTO;
import com.dolts.hotelaria.models.*;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.jpa.domain.Specification;
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
    private FiltersSpecifications<?> filtersSpecifications;
    @Autowired
    private HotelService hotelService;
    @Autowired
    private ArquivoDigitalService arquivoDigitalService;
    @Autowired
    private HospedeService hospedeService;
    @Autowired
    private ProdutoService produtoService;
    @Autowired
    private QuartoService quartoService;
    @Autowired
    private ReservaService reservaService;
    @Autowired
    private TransacaoService transacaoService;


    public InputStreamResource gerarRelatorio(String nomeRelatorio) throws JRException, FileNotFoundException {

        String filePath = "classpath:relatorios/".concat(nomeRelatorio).concat(".jrxml");

        // Pega o relatorio
        File file = ResourceUtils.getFile(filePath);

        // Cria o relatório Jasper
        JasperReport report = JasperCompileManager.compileReport(file.getAbsolutePath());

        Map<String, Object> param = getParam();

        var dataSource = this.getSimpleData(nomeRelatorio);

        // Gera o relatório
        JasperPrint print = JasperFillManager.fillReport(report, param, new JRBeanCollectionDataSource(dataSource));

        // Cria um InputStreamResource a partir do array de bytes do PDF
        return new org.springframework.core.io.InputStreamResource(new ByteArrayInputStream(JasperExportManager.exportReportToPdf(print)));
    }

    public InputStreamResource gerarRelatorio(String nomeRelatorio, RequestDTO requestDTO) throws JRException, FileNotFoundException {

        String filePath = "classpath:relatorios/".concat(nomeRelatorio).concat(".jrxml");

        // Pega o relatorio
        File file = ResourceUtils.getFile(filePath);

        // Cria o relatório Jasper
        JasperReport report = JasperCompileManager.compileReport(file.getAbsolutePath());

        Map<String, Object> param = getParam();

        var dataSource = this.getFilteredData(nomeRelatorio, requestDTO);

        // Gera o relatório
        JasperPrint print = JasperFillManager.fillReport(report, param, new JRBeanCollectionDataSource(dataSource));

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

    private List<?> getSimpleData(String relatorio) {
        return switch (relatorio) {
            case "hospedes" -> this.hospedeService.findAll();
            case "produtos" -> this.produtoService.findAll();
            case "quartos" -> this.quartoService.findAll();
            default -> Collections.emptyList();
        };
    }

    private List<?> getFilteredData(String nomeRelatorio, RequestDTO requestDTO) {
        if (nomeRelatorio.equals("reservasPeriodo")) {
            Specification<ReservaModel> specification = (Specification<ReservaModel>) this.filtersSpecifications.getSearchSpecification(requestDTO.getSearchRequestDTOS(), requestDTO.getGlobalOperator());
            return reservaService.getRepository().findAll(specification);
        } else if (nomeRelatorio.equals("consumoReserva")) {
            Specification<TransacaoModel> specification = (Specification<TransacaoModel>) this.filtersSpecifications.getSearchSpecification(requestDTO.getSearchRequestDTOS(), requestDTO.getGlobalOperator());
            return transacaoService.getRepository().findAll(specification);
        } else if (nomeRelatorio.equals("movimentacao")) {
            Specification<TransacaoModel> specification = (Specification<TransacaoModel>) this.filtersSpecifications.getSearchSpecification(requestDTO.getSearchRequestDTOS(), requestDTO.getGlobalOperator());
            return transacaoService.getRepository().findAll(specification);
        }
        return Collections.emptyList();
    }
}
