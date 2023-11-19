import {Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {DxFileUploaderComponent, DxFormComponent, DxListComponent, DxTextBoxComponent} from "devextreme-angular";
import {TipoService} from "../../shared/services/tipo.service";
import {CategoriaService} from "../../shared/services/categoria.service";
import {forkJoin, map} from "rxjs";
import {TipoQuartoModel} from "../../shared/models/tipoQuarto.model";
import {CategoriaQuartoModel} from "../../shared/models/categoriaQuarto.model";
import {QuartoModel} from "../../shared/models/quarto.model";
import notify from "devextreme/ui/notify";
import {QuartoService} from "../../shared/services/quarto.service";
import DevExpress from "devextreme";
import {Utils} from "../../shared/Utils";
import _ from "lodash";
import ChangeEvent = DevExpress.ui.dxTextBox.ChangeEvent;
import {type} from "devextreme/core/utils/type";
import {ImagemQuartoService} from "../../shared/services/imagemQuarto.service";

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
    imgData: any[] = [];
    tipos: TipoQuartoModel[] = [];
    categorias: CategoriaQuartoModel[] = [];
    quartosCadastrados: QuartoModel[] = [];
    popUpVisible: boolean = false;
    imagemDoPopUp: string = '';
    quartoImagens: any[] = [];
    quartoSelecionado: QuartoModel;
    isLoadImagemVisible: boolean = false;
    protected readonly Utils = Utils;

    constructor(private router: Router,
                private tipoService: TipoService,
                private categoriaService: CategoriaService,
                private quartoService: QuartoService,
                private imagemQuartoService: ImagemQuartoService) {
    }

    ngOnInit(): void {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        this.quarto = new QuartoModel();
        this.quarto.ativo = true;
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

            this.quarto.valorDiaria = parseFloat(this.valorDiariaTBox.value
                .replace(/[^0-9.,]/g, '')
                .replace('.', '')
                .replace(',', '.'));
            this.quarto.itens = this.listaItens.items;

            this.quartoService.save(this.quarto, this.quartoImagens).subscribe(resp => {
                if (resp.ok) {
                    notify('Salvo com sucesso', 'success', 3600);
                    window.history.back();
                    return;
                }
            })
            return;
        }

        notify('Preencha os campos obrigatórios', 'warning', 3000);
    }

    findQuarto(id: string) {
        this.quartoService.findById(parseInt(id)).subscribe(resp => {
            if (resp.ok) {
                this.setaPropriedadesEdit(this.quarto, resp.body!);

                const imagensCall = resp.body!.idDasImagensDoQuarto.map(i => this.imagemQuartoService.findById(i));
                this.isLoadImagemVisible = true;
                forkJoin(imagensCall.map(obs => obs.pipe(
                    // Mapear para os dados desejados
                    map(i => {
                        const blob = new Blob([i.body!.imagem], { type: i.body!.formato });
                        const file = new File([blob], i.body!.nome, { type: i.body!.formato });
                        return { imagem: `data:${i.body!.formato};base64,${i.body!.imagem}`, arquivo: file };
                    })
                ))).subscribe(
                    // Sucesso: Todas as observações foram concluídas
                    resp => {
                        this.isLoadImagemVisible = false;
                        this.quartoImagens = resp;
                    },
                    // Erro: Tratar erros, se necessário
                    error => {
                        console.error('Erro ao carregar imagens', error);
                        notify('Erro ao carregar imagens', 'error', 3600);
                    }
                );

            }
        })
    }

    setaPropriedadesEdit(quartoOriginal: QuartoModel, quartoRequest: QuartoModel) {
        quartoOriginal.id = quartoRequest.id;
        quartoOriginal.nome = quartoRequest.nome;
        quartoOriginal.capacidadePessoas = quartoRequest.capacidadePessoas;
        this.valorDiariaTBox.value = quartoRequest.valorDiaria.toString();
        this.formataValor(quartoRequest.valorDiaria.toString());
        quartoOriginal.ativo = quartoRequest.ativo;
        quartoOriginal.idDasImagensDoQuarto = quartoRequest.idDasImagensDoQuarto;
        quartoOriginal.categoriaQuarto = this.categorias.filter(c => c.id = quartoRequest.categoriaQuarto.id)[0];
        quartoOriginal.tipoQuarto = this.tipos.filter(t => t.id = quartoRequest.tipoQuarto.id)[0];
        quartoOriginal.itens = quartoRequest.itens.map(i => i.replace(/["\[\]]/g, ''));
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

    editar(event: any) {
        console.log(this.quartoSelecionado)
        this.router.navigate(['quartos', 'edit', this.quartoSelecionado.id])
    }

    selecionaQuarto(event: any) {
        event.component.byKey(event.currentSelectedRowKeys[0]).done(quarto => {
            if (quarto) {
                this.quartoSelecionado = quarto;
            }
        });
    }

    formataValor(e: ChangeEvent | String) {

        let valor;

        if (typeof e === 'string') {
            valor = e.replace(',', '.').replace(/[^0-9.,]/g, '');
        } else {
            // @ts-ignore
            valor = e.component.option('value')?.replace(',', '.').replace(/[^0-9.,]/g, '');
        }

        if (!_.isNil(valor)) {
            let currency = parseFloat(valor).toFixed(2)
            valor = Utils.formatarComoMoeda(parseFloat(currency));

            if (valor.includes('NaN')) {
                this.valorDiariaTBox.isValid = false;
                notify('Valor informado inválido', 'error', 3600);
                return;
            }

            this.valorDiariaTBox.value = valor;
            return;
        }
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
                    this.quartoImagens.push({imagem: e.target.result, arquivo: file});
                };
                reader.readAsDataURL(file);
            }
        }
        this.fileUploader.instance.reset();
    }

    removerImagem(index: number) {
        this.quartoImagens.splice(index, 1);
    }

    /*ngAfterViewInit(): void {
        // Obtenha a referência do componente de upload de arquivo após a visualização
        const uploaderInstance = this.fileUploader.instance;

        // Exemplo de como acessar o arquivo atualmente carregado
        // console.log(uploaderInstance.option('value'));
    }*/

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
    downloadImagem(imagem: any) {
        const link = document.createElement('a');
        link.href = imagem.imagem;
        link.download = imagem.arquivo.name;
        link.target = '_blank'; // Opcional: abre o link em uma nova guia
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

}
