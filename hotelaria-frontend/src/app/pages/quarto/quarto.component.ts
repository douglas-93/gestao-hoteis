import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
export class QuartoComponent implements OnInit {

    @ViewChild('itemTxBox') itemTxBox: DxTextBoxComponent;
    @ViewChild('listaItens') listaItens: DxListComponent;
    @ViewChild('cadForm', {static: false}) cadForm: DxFormComponent;
    @ViewChild('fileUploader', {static: false}) fileUploader: DxFileUploaderComponent;
    @ViewChild('valorDiaria', {static: false}) valorDiariaTBox: DxTextBoxComponent;

    mode: ModeEnum = ModeEnum.LIST;
    quarto: QuartoModel;
    imgDataSource: string[] = [];
    imgData: any[] = [];
    tipos: TipoQuartoModel[] = [];
    categorias: CategoriaQuartoModel[] = [];
    quartosCadastrados: QuartoModel[] = [];
    arquivos: File[] = []
    popUpVisible: boolean = false;
    imagemDoPopUp: string = '';


    constructor(private router: Router,
                private cdr: ChangeDetectorRef,
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
        if (this.cadForm.instance.validate().isValid) {

            this.quarto.valorDiaria = parseFloat(this.valorDiariaTBox.value);
            this.quarto.itens = this.listaItens.items;
            /*this.imgDataSource.forEach(i => {
                let tempModel: ImagemQuartoModel = new ImagemQuartoModel();
                tempModel.imagem = i.replace('data:image/png;base64,', '');
                this.quarto.imagem.push(tempModel);
            })*/

            this.arquivos.forEach(i => {
                let tempModel: ImagemQuartoModel = new ImagemQuartoModel();
                tempModel.imagem = i;
                this.quarto.imagem.push(tempModel);
            })

            this.quartoService.save(this.quarto).subscribe(resp => {
                if (resp.ok) {
                    notify('Salvo com sucesso', 'success', 3000);
                    window.history.back();
                }
            });
            return;
        }

        notify('Preencha os campos obrigatórios', 'warning', 3000);
    }

    findQuarto(id: string) {

    }

    carregarArquivo(e: any) {
        this.imgDataSource = []
        this.arquivos = e.value
        this.arquivos.forEach(a => {
            this.lerArquivo(a)
        })
        this.fileUploader.instance.reset();
    }

    lerArquivo(arquivo?: File) {
        if (arquivo) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target!.result;
                /* pegando a imagem como base64 e usando no atributo */
                this.imgDataSource.push(<string>result!);
            };
            reader.readAsDataURL(arquivo);
        }
    }

    removerImagem(index: number) {
        this.imgDataSource.splice(index, 1)[0];
        this.cdr.detectChanges();
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

    abrirImagemPopUp(i: number) {
        this.imagemDoPopUp = this.imgDataSource[i];
        this.popUpVisible = true;
    }
}
