import {Component} from '@angular/core';
import {RelatorioService} from "../../shared/services/relatorio.service";

@Component({
    selector: 'app-relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent {
    relatorios: { relatorio: string, opcao: string }[];
    nomeRelatorio: string;

    constructor(private relatorioService: RelatorioService) {
    }

    ngOnInit() {
        this.relatorios = [{
            relatorio: 'hospedes',
            opcao: 'Relação de Hospedes'
        }]
    }

    gerar() {
        this.relatorioService.gerarRelatorio(this.nomeRelatorio).subscribe({
            next: resp => {
                this.downloadRelatorio(resp);
            }
        });
    }

    downloadRelatorio(blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.nomeRelatorio}.pdf`;
        link.click();
    }

    atualizaRelatorio(e: any) {
        this.nomeRelatorio = e.value;
    }
}
