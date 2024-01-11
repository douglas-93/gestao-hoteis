import {Component, OnInit, ViewChild} from '@angular/core';
import {ProdutoModel} from "../../shared/models/ProdutoModel";
import {TiposProdutoEnum} from "../../shared/enums/TiposProdutoEnum";
import {DxNumberBoxComponent, DxSelectBoxComponent} from "devextreme-angular";
import {ModeEnum} from "../../shared/enums/mode.enum";
import _ from "lodash";
import notify from "devextreme/ui/notify";
import {ProdutoService} from "../../shared/services/produto.service";
import {Router} from "@angular/router";
import {Utils} from "../../shared/Utils";

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

    @ViewChild('tipos', {static: false}) tiposSelectBox: DxSelectBoxComponent;
    @ViewChild('valor', {static: false}) valorNumberBox: DxNumberBoxComponent;

    produto: ProdutoModel;
    produtoSelecionado: ProdutoModel;
    tiposProdutoEnumSelectBox;
    mode: ModeEnum;
    produtos: ProdutoModel[] = [];
    protected readonly ModeEnum = ModeEnum;
    protected readonly Utils = Utils;
    protected readonly event = event;

    constructor(private produtoService: ProdutoService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.produto = new ProdutoModel();
        this.tiposProdutoEnumSelectBox = Object.keys(TiposProdutoEnum).map(key => ({
            value: key
          , displayText: TiposProdutoEnum[key].getDescricao()
        }));

        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit) {
            this.findProduto(this.router.url.split('/').pop()!)
        }
    }

    validaCampos() {
        if (_.isEmpty(this.produto.nome) || _.isNil(this.produto.nome)) {
            notify('O nome do produto é obrigatório', 'error', 3600);
            return false;
        }

        if (_.isNil(this.produto.valor)) {
            notify('O valor do produto é obrigatório', 'error', 3600);
            return false;
        }

        if (_.isEmpty(this.produto.tipo) || _.isNil(this.produto.tipo)) {
            notify('O tipo do produto é obrigatório', 'error', 3600);
            return false;
        }
        return true;
    }

    salvar() {
        if (this.validaCampos()) {
            let call = _.isNil(this.produto.id) ? this.produtoService.save(this.produto) : this.produtoService.update(this.produto.id, this.produto);
            call.subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        notify('Produto Salvo com sucesso', 'success', 3600);
                        window.history.back();
                    }
                },
                error: (err) => {
                    notify('Ocorreu um erro ao tentar salvar o produto', 'error', 3600);
                    console.error(err);
                }
            })
        }
    }

    defineValor(e) {
        this.produto.valor = e.value;
    }

    defineTipo(e) {
        this.produto.tipo = e.value
    }

    buscaProdutos() {
        this.produtoService.findAll().subscribe({
            next: resp => {
                if (resp.ok) {
                    this.produtos = resp.body!
                }
            },
            error: err => {
                notify('Ocorreu um erro ao tentar buscar os produtos', 'error', 3600);
                console.error(err);
            }
        })
    }

    findProduto(id: string) {
        let idAsNumber = Number(id);
        this.produtoService.findById(idAsNumber).subscribe({
            next: resp => {
                if (resp.ok) {
                    this.produto = resp.body!;
                    this.valorNumberBox.value = resp.body!.valor;
                    this.tiposSelectBox.instance.option('value', resp.body!.tipo);
                }
            },
            error: err => {
                notify('Ocorreu um erro ao tentar buscar o produto', 'error', 3600);
                console.error(err);
            }
        })
    }

    selecionaProduto(event: any) {
        event.component.byKey(event.currentSelectedRowKeys[0]).done(produto => {
            if (produto) {
                this.produtoSelecionado = produto;
            }
        });
    }

    editarProduto() {
        this.router.navigate(['produto', 'edit', this.produtoSelecionado.id]);
    }

    novo() {
        this.router.navigate(['produto', 'cad']);
    }

    excluirProduto() {
        this.produtoService.delete(this.produto.id).subscribe({
            next: resp =>{
                if (resp.ok) {
                    notify('Produto excluído com sucesso', 'success', 3600);
                    window.history.back();
                }
            }
        });
    }

    protected readonly TiposProdutoEnum = TiposProdutoEnum;
}
