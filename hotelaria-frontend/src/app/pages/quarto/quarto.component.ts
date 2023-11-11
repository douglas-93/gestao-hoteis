import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {DxFileUploaderComponent, DxFormComponent, DxListComponent, DxTextBoxComponent} from "devextreme-angular";
import {TipoService} from "../../shared/services/tipo.service";
import {CategoriaService} from "../../shared/services/categoria.service";
import {forkJoin} from "rxjs";
import {TipoQuartoModel} from "../../shared/models/tipoQuarto.model";
import {CategoriaQuartoModel} from "../../shared/models/categoriaQuarto.model";
import {QuartoModel} from "../../shared/models/quarto.model";
import notify from "devextreme/ui/notify";
import {QuartoService} from "../../shared/services/quarto.service";
import {ImagemQuartoModel} from "../../shared/models/imagemQuarto.model";

@Component({
    selector: 'app-quarto',
    templateUrl: './quarto.component.html',
    styleUrls: ['./quarto.component.scss']
})
export class QuartoComponent implements OnInit, AfterViewInit {

    @ViewChild('itemTxBox') itemTxBox: DxTextBoxComponent;
    @ViewChild('listaItens') listaItens: DxListComponent;
    @ViewChild('cadForm', {static: false}) cadForm: DxFormComponent;
    @ViewChild('fileUploader', {static: false}) fileUploader: DxFileUploaderComponent;
    @ViewChild('valorDiaria', {static: false}) valorDiariaTBox: DxTextBoxComponent;

    mode: ModeEnum = ModeEnum.LIST;
    quarto: QuartoModel;
    imgData: any[] = [];
    tipos: TipoQuartoModel[] = [];
    categorias: CategoriaQuartoModel[] = [];
    quartosCadastrados: QuartoModel[] = [];
    popUpVisible: boolean = false;
    imagemDoPopUp: string = '';
    quartoImagens: any[] = [];


    constructor(private router: Router,
                private tipoService: TipoService,
                private categoriaService: CategoriaService,
                private quartoService: QuartoService) {
    }

    ngOnInit(): void {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        this.quarto = new QuartoModel();
        this.quarto.ativo = true;
        this.quarto.imagem = [];
        this.getTipoECategoria();

        if (edit) {
            this.findQuarto(this.router.url.split('/').pop()!)
        }
    }

    buscar() {
        this.quartoService.findAll().subscribe(resp => {
            if (resp.ok) {
                this.quartosCadastrados = resp.body!
            }
        })
    }

    novo() {
        this.router.navigate(['quartos', 'cad'])
    }

    salvar() {
        console.log(this.quartoImagens)

        if (this.cadForm.instance.validate().isValid) {

            this.quarto.valorDiaria = parseFloat(this.valorDiariaTBox.value);
            this.quarto.itens = this.listaItens.items;

            return;
        }

        notify('Preencha os campos obrigatórios', 'warning', 3000);
    }

    findQuarto(id: string) {

    }

    adicionaItemLista() {
        this.listaItens.items.push(this.itemTxBox.value);
        this.itemTxBox.value = '';
        this.listaItens.instance.repaint();
    }

    getTipoECategoria() {
        const requests = forkJoin([this.tipoService.findAll(), this.categoriaService.findAll()])

        requests.subscribe(([respTipo, respCat]) => {
            if (respCat.ok && respTipo.ok) {
                this.tipos = respTipo.body!;
                this.categorias = respCat.body!;
            }
        })
    }

    /********************************************************************************/
    /*                              LIDANDO COM AS IMAGENS                          */
    /********************************************************************************/

    carregarArquivo(event: any): void {
        const files = event.value;
        if (files && files.length > 0) {
            // Adicione as imagens ao array
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.quartoImagens.push({ imagem: e.target.result, arquivo: file });
                };
                reader.readAsDataURL(file);
            }
        }
        this.fileUploader.instance.reset();
    }

    removerImagem(index: number) {
        this.quartoImagens.splice(index, 1);
    }

    ngAfterViewInit(): void {
        // Obtenha a referência do componente de upload de arquivo após a visualização
        const uploaderInstance = this.fileUploader.instance;

        // Exemplo de como acessar o arquivo atualmente carregado
        // console.log(uploaderInstance.option('value'));
    }



    abrirImagemPopUp(i: number) {
        this.imagemDoPopUp = this.quartoImagens[i].imagem;
        this.popUpVisible = true;
    }

    formatFileSize(sizeInBytes: number): string {
        const kilobyte = 1024;
        const megabyte = kilobyte * 1024;

        if (sizeInBytes < kilobyte) {
            return sizeInBytes + ' Bytes';
        } else if (sizeInBytes < megabyte) {
            return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
        } else {
            return (sizeInBytes / megabyte).toFixed(2) + ' MB';
        }
    }

    limparImagensRenderizadas() {
        if (this.quartoImagens.length > 0) {
            this.quartoImagens = [];
            notify('Imagens removidas com sucesso', 'success', 3600);
            return;
        }

        notify('Adicione ao menos uma imagem', 'warning', 3600);
    }
}
