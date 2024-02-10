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
import {ImagemQuartoService} from "../../shared/services/imagemQuarto.service";
import {ImagemQuartoModel} from "../../shared/models/imagemQuarto.model";
import {RequestDTO} from "../../shared/dto/requestDTO";
import {Operation} from "../../shared/dto/searchRequestDTO";
import ChangeEvent = DevExpress.ui.dxTextBox.ChangeEvent;

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
    quartoFilter: QuartoModel;
    imgData: any[] = [];
    tipos: TipoQuartoModel[] = [];
    categorias: CategoriaQuartoModel[] = [];
    quartosCadastrados: QuartoModel[] = [];
    popUpVisible: boolean = false;
    imagemDoPopUp: string = '';
    quartoImagens: (ImagemQuartoModel | null)[] = [];
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
        this.quartoFilter = new QuartoModel();
        this.quarto.ativo = true;
        this.getTipoECategoria();

        if (edit) {
            this.findQuarto(this.router.url.split('/').pop()!)
        }
    }

    buscar() {

        if (Object.keys(this.quartoFilter).length > 0) {

            const requestDTO: RequestDTO = this.quartoService.createSearchRequest(this.quartoFilter);

            requestDTO.searchRequestDTOS.forEach(r => {
                if (r.columnName === 'tipoQuarto') {
                    r.columnName = 'id';
                    r.value = r.value['id'];
                    r.operation = Operation.JOIN;
                    r.joinTable = 'tipoQuarto';
                }

                if (r.columnName === 'categoriaQuarto') {
                    r.columnName = 'id';
                    r.value = r.value['id'];
                    r.operation = Operation.JOIN;
                    r.joinTable = 'categoriaQuarto';
                }
            });

            this.quartoService.specification(requestDTO).subscribe({
                next: resp => {
                    if (resp.ok) {
                        this.quartosCadastrados = resp.body!;
                    }
                }
            });

            return;
        }

        this.quartoService.findAll().subscribe(resp => {
            if (resp.ok) {
                this.quartosCadastrados = resp.body!;
            }
        })
    }

    novo() {
        this.router.navigate(['quartos', 'cad'])
    }

    salvar() {
        if (this.cadForm.instance.validate().isValid) {

            this.quarto.valorDiaria = this.valorDiariaNumber(this.valorDiariaTBox.value);
            this.quarto.itens = this.listaItens.items;

            const imagensNovas = this.filtraImagensNovas(this.quartoImagens);

            const imagensExcluidas = this.filtraImagensExcluidas(this.quartoImagens);


            const salvarQuarto = () => {
                const serviceCall = _.isNil(this.quarto.id)
                    ? this.quartoService.create(this.quarto, imagensNovas)
                    : this.quartoService.updateQuarto(this.quarto.id, this.quarto, imagensNovas, imagensExcluidas);

                serviceCall.subscribe(
                    resp => {
                        if (resp.ok) {
                            notify('Salvo com sucesso', 'success', 3600);
                            window.history.back();
                        }
                    },
                    error => {
                        console.error('Erro ao salvar quarto', error);
                        notify('Erro ao salvar quarto', 'error', 3000);
                    }
                );
            };

            salvarQuarto();
        } else {
            notify('Preencha os campos obrigatórios', 'warning', 3000);
        }
    }

    filtraImagensExcluidas(imagens: (ImagemQuartoModel | null)[]) {
        if (_.isNil(imagens)) {
            console.log('Sem imagens a serem excluídas');
            return [];
        }

        const idsNaPagina = _.isNil(imagens) ? [] : imagens.map(im => im?.id);
        /* Pegando os ids que estão na entidade mas não estão na página */
        if (!_.isNil(this.quarto.idDasImagensDoQuarto)) {
            return this.quarto.idDasImagensDoQuarto.filter(i => !idsNaPagina.includes(i));
        }
        return [];
    }

    filtraImagensNovas(imagens: (ImagemQuartoModel | null)[]) {
        if (_.isNil(imagens)) {
            console.log('Sem imagens novas')
            return [];
        }

        return imagens.filter(i => _.isNil(i?.id));
    }

    valorDiariaNumber(valor: string): number {
        return Number(valor.replace(/[^0-9.,]/g, '')
            .replace('.', '')
            .replace(',', '.'));
    }

    findQuarto(id: string) {
        this.quartoService.findById(Number(id)).subscribe(resp => {
            if (resp.ok) {
                this.setaPropriedadesEdit(this.quarto, resp.body!);

                const imagensCall = resp.body!.idDasImagensDoQuarto.map(i => this.imagemQuartoService.findById(i));
                this.isLoadImagemVisible = imagensCall.length != 0;
                forkJoin(imagensCall.map(obs => obs.pipe(
                    // Mapear para os dados desejados
                    map(i => {
                        i.body!.imagem = `data:${i.body!.formato};base64,${i.body!.imagem}`;
                        return i.body;
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
                        this.isLoadImagemVisible = false;
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

    editar() {
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

    excluir() {
        let id = this.router.url.split('/').pop();
        let idAsNumber = Number(id);
        this.quartoService.delete(idAsNumber).subscribe(resp => {
            if (resp.ok) {
                notify('Quarto removido com sucesso!', 'success', 3600);
                window.history.back();
            }
        });
    }

    baixarTodas() {
        this.quartoImagens.forEach(i => this.downloadImagem(i));
    }

    /********************************************************************************/
    /*                              LIDANDO COM AS IMAGENS                          */

    /********************************************************************************/

    carregarArquivo(event: any): void {
        const files = event.value;
        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    const img: ImagemQuartoModel = new ImagemQuartoModel();
                    img.nome = file.name;
                    img.formato = file.type;
                    img.tamanho = file.size;
                    img.imagem = e.target.result;
                    img.arquivo = file;
                    this.quartoImagens.push(img);
                };
                reader.readAsDataURL(file);
            }
        }
        this.fileUploader.instance.reset();
    }

    removerImagem(index: number) {
        this.quartoImagens.splice(index, 1);
    }

    abrirImagemPopUp(i: number) {
        this.imagemDoPopUp = <string>this.quartoImagens[i]!.imagem;
        this.popUpVisible = true;
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
        link.download = imagem.nome;
        link.target = '_blank'; // Opcional: abre o link em uma nova guia
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
