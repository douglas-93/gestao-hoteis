import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import _ from "lodash";
import notify from "devextreme/ui/notify";
import {RelatorioService} from "../../services/relatorio.service";
import {DxTextAreaComponent} from "devextreme-angular";

@Component({
    selector: 'app-progresso-relatorio',
    templateUrl: './progresso-relatorio.component.html',
    styleUrls: ['./progresso-relatorio.component.scss']
})
export class ProgressoRelatorioComponent {

    @ViewChild('pg') pg: HTMLDivElement;
    @ViewChild('erroMessageTxtArea') erroMessageTxtArea: DxTextAreaComponent;
    @ViewChild('pdfViewer') pdfViewer: ElementRef;

    @Input()
    progress: number = 90;
    @Input()
    nomeRelatorio: string;
    @Input()
    renderVisible: boolean;
    @Input()
    fileBlob: Blob;

    erro: boolean = false;
    pronto: boolean = false;
    erroMessage: string = '';
    errorVisible: boolean = false;

    constructor(private relatorioService: RelatorioService) {
    }

    ngOnInit() {
        this.relatorioService.gerarRelatorio(this.nomeRelatorio).subscribe({
            next: resp => {
                if (resp) {
                    this.fileBlob = resp;
                    this.pronto = true;
                }
            },
            complete: () => {
                this.progress = 100;
            },
            error: err => {
                console.log(err)
                this.erro = true;
                this.erroMessage = err.message;
                this.erroMessage += `\n\n${err.trace}`;
                notify('Falha ao gerar o relatório', 'error', 3600);
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

    logErro() {
        this.erroMessageTxtArea.text = this.erroMessage;
        this.errorVisible = true;
    }

    copiar() {
        navigator.clipboard.writeText(this.erroMessage).then(() => {
            notify('Texto copiado com sucesso!', 'success', 3600);
        })
    }
}
