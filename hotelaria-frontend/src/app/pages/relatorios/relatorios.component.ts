import {Component, ElementRef, ViewChild} from '@angular/core';
import {RelatorioService} from "../../shared/services/relatorio.service";
import notify from "devextreme/ui/notify";
import _ from "lodash";

@Component({
    selector: 'app-relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent {

    @ViewChild('pdfViewer') pdfViewer: ElementRef;

    relatorios: { relatorio: string, opcao: string }[];
    nomeRelatorio: string;
    fileBlob: Blob;
    loading: boolean = false;
    renderVisible: boolean = false;

    constructor(private relatorioService: RelatorioService) {
    }

    ngOnInit() {
        this.relatorios = [{
            relatorio: 'hospedes',
            opcao: 'Relação de Hospedes'
        }]
    }

    gerar() {
        this.loading = true;
        this.relatorioService.gerarRelatorio(this.nomeRelatorio).subscribe({
            next: resp => {
                this.fileBlob = resp;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    downloadRelatorio() {
        if (_.isNil(this.fileBlob)) {
            notify('o arquivo nao esta pronto');
            return;
        }
        const url = window.URL.createObjectURL(this.fileBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.nomeRelatorio}.pdf`;
        link.click();
    }

    renderizarPDF() {
        this.renderVisible = true;

        const pdfObject = this.pdfViewer.nativeElement;
        const pdfUrl = URL.createObjectURL(this.fileBlob);

        // Configurar o objeto para exibir o PDF
        pdfObject.data = pdfUrl;
        pdfObject.type = 'application/pdf';

        // O conteúdo da tag object será exibido automaticamente
    }

    atualizaRelatorio(e: any) {
        this.nomeRelatorio = e.value;
    }
}
