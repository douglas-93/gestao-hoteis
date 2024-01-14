import {Component, OnInit, ViewChild} from '@angular/core';
import {ProdutoModel} from "../../shared/models/produtoModel";
import {ProdutoService} from "../../shared/services/produto.service";
import {TiposProdutoEnum} from "../../shared/enums/TiposProdutoEnum";
import {DxDataGridComponent} from "devextreme-angular";
import {TipoTransacaoEnum} from "../../shared/enums/TipoTransacaoEnum";
import {TransacaoModel} from "../../shared/models/transacaoModel";
import {ModeEnum} from "../../shared/enums/mode.enum";
import {SequenciadorService} from "../../shared/services/sequenciador.service";
import notify from "devextreme/ui/notify";
import {firstValueFrom, forkJoin} from "rxjs";
import _ from "lodash";
import {TransacaoService} from "../../shared/services/transacao.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-estoque',
    templateUrl: './estoque.component.html',
    styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

    @ViewChild('gridMovimento', {static: false}) gridMovimento: DxDataGridComponent;

    produtos: ProdutoModel[] = [];
    tiposMovimento;
    produtosNaGrid: any = [];
    mode: ModeEnum = ModeEnum.LIST;
    transacoes: TransacaoModel[];
    isLoading: boolean = false;
    protected readonly ModeEnum = ModeEnum;
    private readonly atributo = 'transacao';
    private numeroTransacao;

    constructor(private produtoService: ProdutoService,
                private sequenciador: SequenciadorService,
                private transacaoService: TransacaoService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.carregaDadosIniciais();
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit) {
            this.findtransacao(this.router.url.split('/').pop()!)
        }
    }

    carregaDadosIniciais() {
        this.produtoService.findAll().subscribe({
            next: resp => {
                if (resp.ok) {
                    // @ts-ignore
                    this.produtos = resp.body!.filter(p => TiposProdutoEnum[p.tipo] != TiposProdutoEnum.SERVICO_ADICIONAL);
                }
            }
        })

        this.tiposMovimento = Object.keys(TipoTransacaoEnum).map(key => ({
            value: key
          , displayText: TipoTransacaoEnum[key]
        }));
    }

    salvar() {
        this.isLoading = true;
        this.criaTransacao().then(res => this.isLoading = false);
    }

    async criaTransacao() {
        if (_.isNil(this.numeroTransacao)) {
            try {
                const response = await firstValueFrom(this.sequenciador.proximoNumero(this.atributo));
                this.numeroTransacao = response.ok ? response.body! : -1;
            } catch (err) {
                notify('Falha ao buscar número da transação', 'error', 3600);
                console.error(err);
                return;
            }
        }

        forkJoin(this.produtosNaGrid
            .map(i => {
                const t: TransacaoModel = new TransacaoModel();
                t.produtoModel = this.produtos.find(p => p.id == i.id)!;
                t.quantidade = i.estoque;
                t.tipoTransacao = i.value as TipoTransacaoEnum;
                t.numeroTransacao = this.numeroTransacao;
                return t;
            })
            .map(t => this.transacaoService.save(t)))
            .subscribe({
                next: value => {
                    // @ts-ignore
                    let ok = value.every(r => r.ok);
                    if (ok) {
                        notify('Transação salva com sucesso', 'success', 3600);
                        window.history.back();
                    }
                },
                error: err => {
                    notify('Falha ao salvar transação', 'error', 3600);
                    console.error(err);
                }
            })
    }

    buscaTransacoes() {
        this.transacaoService.findAll().subscribe({
            next: resp => {
                if (resp.ok) {
                    this.transacoes = resp.body!.filter(t => !_.isNil(t.numeroTransacao));
                }
            }
        })
    }

    novo() {
        this.router.navigate(['estoque', 'cad'])
    }

    findtransacao(id: string) {

    }
}
