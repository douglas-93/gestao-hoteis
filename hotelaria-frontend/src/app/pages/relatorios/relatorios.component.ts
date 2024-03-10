import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {RelatorioService} from "../../shared/services/relatorio.service";
import {ProgressoRelatorioComponent} from "../../shared/components/progresso-relatorio/progresso-relatorio.component";
import notify from "devextreme/ui/notify";
import _ from "lodash";
import {TipoTransacaoEnum} from "../../shared/enums/TipoTransacaoEnum";
import {GlobalOperator, RequestDTO} from "../../shared/dto/requestDTO";
import {Operation, SearchRequestDTO} from "../../shared/dto/searchRequestDTO";
import {Utils} from "../../shared/Utils";
import {logBuildStats} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Component({
    selector: 'app-relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent {

    @ViewChild('relatoriosSendoGerados', {read: ViewContainerRef}) relatoriosSendoGerados: ViewContainerRef;

    relatorios: { relatorio: string, opcao: string }[];
    nomeRelatorio: string = '';
    requestDTO: RequestDTO;
    dataInicial: Date | number | string | undefined;
    dataFinal: Date | number | string | undefined;
    tiposMovimento
    private relatoriosComFiltro: string[] = ['reservasPeriodo', 'consumoReserva', 'movimentacao'];
    reserva: string = '';
    tipoMovimento: string | undefined;

    constructor(private relatorioService: RelatorioService,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.relatorios = [
            {
                relatorio: 'hospedes',
                opcao: 'Relação de Hospedes'
            },
            {
                relatorio: 'produtos',
                opcao: 'Relação de Produtos e Serviços'
            },
            {
                relatorio: 'quartos',
                opcao: 'Relação de Quartos'
            },
            {
                relatorio: 'reservasPeriodo',
                opcao: 'Reservas por Período'
            },
            {
                relatorio: 'consumoReserva',
                opcao: 'Consumo por Reserva'
            },
            {
                relatorio: 'movimentacao',
                opcao: 'Movimentação de Produto'
            },
        ];

        this.tiposMovimento = Object.keys(TipoTransacaoEnum).map(key => ({
            value: key
          , displayText: TipoTransacaoEnum[key]
        }));
    }

    criaElemento() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(ProgressoRelatorioComponent);
        const componentRef = this.relatoriosSendoGerados.createComponent(factory);

        const progressoRelatorioInstance = componentRef.instance as ProgressoRelatorioComponent;
        progressoRelatorioInstance.nomeRelatorio = this.nomeRelatorio;
        if (this.relatoriosComFiltro.includes(this.nomeRelatorio)) {
            this.montaRequest(this.dataInicial, this.dataFinal, this.reserva, this.tipoMovimento);
            progressoRelatorioInstance.requestDTO = this.requestDTO;
        }
    }

    montaRequest(dataInicial?, dataFinal?, reserva?, tipoConsumo?) {
        this.requestDTO = new RequestDTO();
        this.requestDTO.globalOperator = GlobalOperator.AND;
        this.requestDTO.searchRequestDTOS = [];

        if (dataInicial) {
            const searchRequestDTO: SearchRequestDTO = new SearchRequestDTO();
            if (this.nomeRelatorio === 'reservasPeriodo') {
                searchRequestDTO.columnName = 'dataEntrada';
                searchRequestDTO.value = Utils.formatarDataParaStringSemDiaSemana(new Date(dataInicial));
            } else {
                searchRequestDTO.columnName = 'dataHora';
                let data = new Date(dataInicial);
                searchRequestDTO.value = data.toLocaleDateString().replaceAll('/', '-') + ' ' + data.toLocaleTimeString();
            }

            searchRequestDTO.operation = Operation.GREATER_THAN_EQUAL;
            this.requestDTO.searchRequestDTOS.push(searchRequestDTO);
        }

        if (dataFinal) {
            const searchRequestDTO: SearchRequestDTO = new SearchRequestDTO();
            if (this.nomeRelatorio === 'reservasPeriodo') {
                searchRequestDTO.columnName = 'dataEntrada';
                searchRequestDTO.value = Utils.formatarDataParaStringSemDiaSemana(new Date(dataFinal));
            } else {
                searchRequestDTO.columnName = 'dataHora';
                let data = new Date(dataFinal);
                searchRequestDTO.value = data.toLocaleDateString().replaceAll('/', '-') + ' ' + '23:59:59';
            }

            searchRequestDTO.operation = Operation.LESS_THAN_EQUAL;
            this.requestDTO.searchRequestDTOS.push(searchRequestDTO);
        }

        if (reserva != '') {
            const searchRequestDTO: SearchRequestDTO = new SearchRequestDTO();
            searchRequestDTO.columnName = 'id';
            searchRequestDTO.value = reserva;
            searchRequestDTO.operation = Operation.JOIN;
            searchRequestDTO.joinTable = 'reserva'
            this.requestDTO.searchRequestDTOS.push(searchRequestDTO);
        }

        if (tipoConsumo) {
            const searchRequestDTO: SearchRequestDTO = new SearchRequestDTO();
            searchRequestDTO.columnName = 'tipoTransacao';
            searchRequestDTO.value = tipoConsumo;
            searchRequestDTO.operation = Operation.EQUAL;
            this.requestDTO.searchRequestDTOS.push(searchRequestDTO);
        }
    }

    atualizaRelatorio(e: any) {
        this.nomeRelatorio = e.value;
        this.limpaDados();
    }

    gerar() {
        if (_.isNil(this.nomeRelatorio) ||
            _.isEmpty(this.nomeRelatorio)) {
            notify('Escolha um relatório', 'warning', 3600);
        } else {
            this.criaElemento();
        }
    }

    defineMovimento(e: any) {
        this.tipoMovimento = e.value;
    }

    private limpaDados() {
        this.dataInicial = undefined;
        this.dataFinal = undefined;
        this.tipoMovimento = undefined;
        this.reserva = '';
    }

    limpar() {
        this.relatoriosSendoGerados.clear();
    }
}
