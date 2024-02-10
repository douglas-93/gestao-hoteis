import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {RelatorioService} from "../../shared/services/relatorio.service";
import {ProgressoRelatorioComponent} from "../../shared/components/progresso-relatorio/progresso-relatorio.component";
import notify from "devextreme/ui/notify";
import _ from "lodash";
import {TipoTransacaoEnum} from "../../shared/enums/TipoTransacaoEnum";

@Component({
    selector: 'app-relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent {

    @ViewChild('relatoriosSendoGerados', {read: ViewContainerRef}) relatoriosSendoGerados: ViewContainerRef;

    relatorios: { relatorio: string, opcao: string }[];
    nomeRelatorio: string = '';
    hoje: Date = new Date();
    dataInicial: Date | number | string;
    dataFinal: Date | number | string;
    tiposMovimento

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
    }

    atualizaRelatorio(e: any) {
        this.nomeRelatorio = e.value;
    }

    gerar() {
        if (_.isNil(this.nomeRelatorio) ||
            _.isEmpty(this.nomeRelatorio)) {
            notify('Escolha um relatório', 'warning', 3600);
        } else {
            this.criaElemento();
        }
    }
}
