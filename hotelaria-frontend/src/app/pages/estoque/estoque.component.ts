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
    protected readonly ModeEnum = ModeEnum;
    private readonly atributo = 'transacao';
    private numeroTransacao;

    constructor(private produtoService: ProdutoService,
                private sequenciador: SequenciadorService,
                private transacaoService: TransacaoService) {
    }

    ngOnInit(): void {
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
        this.criaTransacao();
    }

    /*async separaMovimento() {

        if (_.isNil(this.numeroTransacao)) {
            try {
                const response = await firstValueFrom(this.sequenciador.proximoNumero(this.atributo));
                this.numeroTransacao = response.ok ? response.body! : -1;
            } catch (err) {
                notify('Falha ao buscar número da transação', 'error', 3600);
                console.error(err);
            }
        }

        const entrada: TransacaoModel[] = [];
        const saida: TransacaoModel[] = [];
        const estorno: TransacaoModel[] = [];
        const baixa: TransacaoModel[] = [];

        const transacoes: TransacaoModel[] = this.produtosNaGrid.map(i => {
            const t: TransacaoModel = new TransacaoModel();
            t.produtoModel = this.produtos.find(p => p.id == i.id)!;
            t.quantidade = i.estoque;
            t.tipoTransacao = TipoTransacaoEnum[i.value];
            t.numeroTransacao = this.numeroTransacao;
            return t;
        });

        transacoes.forEach(t => {
            switch (t.tipoTransacao) {
                case TipoTransacaoEnum.ENTRADA: {
                    entrada.push(t);
                    break;
                }
                case TipoTransacaoEnum.SAIDA: {
                    saida.push(t);
                    break;
                }
                case TipoTransacaoEnum.BAIXA: {
                    baixa.push(t);
                    break;
                }
                case TipoTransacaoEnum.ESTORNO: {
                    estorno.push(t);
                    break;
                }
            }
        });

        return [entrada, saida, baixa, estorno];
    }*/

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

    protected readonly TipoTransacaoEnum = TipoTransacaoEnum;
}
