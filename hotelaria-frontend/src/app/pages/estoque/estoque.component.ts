import {Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {ProdutoModel} from "../../shared/models/produtoModel";
import {ProdutoService} from "../../shared/services/produto.service";
import {TiposProdutoEnum} from "../../shared/enums/TiposProdutoEnum";
import {Utils} from "../../shared/Utils";
import {DxDataGridComponent} from "devextreme-angular";
import {TipoTransacaoEnum} from "../../shared/enums/TipoTransacaoEnum";
import {TransacaoModel} from "../../shared/models/transacaoModel";

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
    protected readonly TiposProdutoEnum = TiposProdutoEnum;
    protected readonly Utils = Utils;

    constructor(private produtoService: ProdutoService) {
    }

    ngOnInit(): void {
        this.produtoService.findAll().subscribe({
            next: resp => {
                if (resp.ok) {
                    this.produtos = resp.body!
                }
            }
        })

        this.tiposMovimento = Object.keys(TipoTransacaoEnum).map(key => ({
            value: key
          , displayText: TipoTransacaoEnum[key].getDescricao()
        }));
    }

    salvar() {
        this.separaMovimento();
    }

    separaMovimento() {
        const entrada: TransacaoModel[] = [];
        const saida: TransacaoModel[] = [];
        const estorno: TransacaoModel[] = [];
        const baixa: TransacaoModel[] = [];

        const transacoes: TransacaoModel[] = this.produtosNaGrid.map(i => {
            const t: TransacaoModel = new TransacaoModel();
            t.produtoModel = this.produtos.find(p => p.id == i.id)!;
            t.quantidade = i.estoque;
            t.tipoTransacao = TipoTransacaoEnum[i.value];
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
    }
}
