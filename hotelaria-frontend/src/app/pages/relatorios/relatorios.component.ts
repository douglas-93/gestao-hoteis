import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {RelatorioService} from "../../shared/services/relatorio.service";
import {ProgressoRelatorioComponent} from "../../shared/components/progresso-relatorio/progresso-relatorio.component";
import notify from "devextreme/ui/notify";
import _ from "lodash";

@Component({
    selector: 'app-relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent {

    @ViewChild('relatoriosSendoGerados', {read: ViewContainerRef}) relatoriosSendoGerados: ViewContainerRef;

    relatorios: { relatorio: string, opcao: string }[];
    nomeRelatorio: string = '';

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
        ]
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
        console.log(this.nomeRelatorio)
        if (_.isNil(this.nomeRelatorio) ||
            _.isEmpty(this.nomeRelatorio)) {
            notify('Escolha um relatório', 'warning', 3600);
        } else {
            this.criaElemento();
        }
    }
}
