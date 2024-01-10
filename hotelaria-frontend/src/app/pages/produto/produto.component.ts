import {Component, OnInit, ViewChild} from '@angular/core';
import {ProdutoModel} from "../../shared/models/ProdutoModel";
import {TiposProdutoEnum} from "../../shared/enums/TiposProdutoEnum";
import {DxSelectBoxComponent} from "devextreme-angular";
import {ModeEnum} from "../../shared/enums/mode.enum";
import _ from "lodash";
import notify from "devextreme/ui/notify";
import {ProdutoService} from "../../shared/services/produto.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

    @ViewChild('tipos', {static: false}) tipos: DxSelectBoxComponent;

    produto: ProdutoModel;
    tiposProdutoEnumSelectBox;
    mode: ModeEnum;
    produtos: ProdutoModel[] = [];
    protected readonly ModeEnum = ModeEnum;

    constructor(private produtoService: ProdutoService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.produto = new ProdutoModel();
        this.tiposProdutoEnumSelectBox = Object.keys(TiposProdutoEnum).map(key => ({
            value: key
          , displayText: TiposProdutoEnum[key].getDescricao()
        }));
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
            this.produtoService.save(this.produto).subscribe({
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
}
