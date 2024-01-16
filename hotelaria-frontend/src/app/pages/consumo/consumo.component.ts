import {Component, OnInit} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {ReservaModel} from "../../shared/models/reserva.model";
import {ReservaService} from "../../shared/services/reserva.service";
import {Utils} from "../../shared/Utils";
import notify from "devextreme/ui/notify";
import {Router} from "@angular/router";
import {QuartoModel} from "../../shared/models/quarto.model";
import {ProdutoService} from "../../shared/services/produto.service";
import {ProdutoModel} from "../../shared/models/produtoModel";
import {TransacaoModel} from "../../shared/models/transacaoModel";
import {TransacaoService} from "../../shared/services/transacao.service";
import {firstValueFrom, forkJoin, lastValueFrom} from "rxjs";
import {TipoTransacaoEnum} from "../../shared/enums/TipoTransacaoEnum";
import _ from "lodash";

@Component({
    selector: 'app-consumo',
    templateUrl: './consumo.component.html',
    styleUrls: ['./consumo.component.scss']
})
export class ConsumoComponent implements OnInit {

    mode: ModeEnum = ModeEnum.LIST;
    reservasComCheckIn: ReservaModel[] = [];
    datasDaSemana: Date[] = [];
    isLoading: boolean = false;
    reservaSelecionada: ReservaModel;
    produtosNaGrid: any[] = [];
    produtos: ProdutoModel[];
    produtosConsumidos: TransacaoModel[] = [];
    protected readonly Utils = Utils;
    protected readonly Math = Math;

    constructor(private reservaService: ReservaService,
                private produtoService: ProdutoService,
                private transacaoService: TransacaoService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.reservaSelecionada = new ReservaModel();
        this.reservaSelecionada.quarto = new QuartoModel();

        let edit: boolean = this.router.url.includes('edit');
        let cad: boolean = this.router.url.includes('cad');
        this.mode = (edit || cad) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit || cad) {
            this.findReserva(this.router.url.split('/').pop()!).then(res => {
                this.carregaDadosIniciais().then(res => {
                    this.adicionaConsumoAGrid();
                });
            });
        } else {
            this.isLoading = true;
            this.reservaService.buscaReservasSemCheckOut().subscribe({
                next: (resp) => {
                    this.reservasComCheckIn = resp.body!
                },
                error: (err) => {
                    notify('Falha ao buscar reservas', 'error', 3600);
                    console.error(err);
                },
                complete: () => {
                    this.isLoading = false;
                }
            })
        }
    }

    novoConsumo() {
        this.router.navigate(['consumo', 'cad', this.reservaSelecionada.id]);
    }

    selecionaReserva(event: any) {
        event.component.byKey(event.currentSelectedRowKeys[0]).done(reserva => {
            if (reserva) {
                this.reservaSelecionada = reserva;
            }
        });
    }

    async findReserva(id: string) {
        let idAsNumber = Number(id);

        let resp = await firstValueFrom(this.reservaService.findById(idAsNumber))
        this.reservaSelecionada = resp.body!
    }

    async carregaDadosIniciais() {
        let resp = await lastValueFrom(this.produtoService.findAll());
        this.produtos = resp.body!;
    }

    voltar() {
        window.history.back();
    }

    salvar() {
        forkJoin(this.produtosNaGrid
            .filter(p => {
                if (_.isNil(p.idConsumo)) {
                    return p;
                }
            })
            .map(p => {
                const t: TransacaoModel = new TransacaoModel();
                t.produtoModel = this.produtos.find(prod => prod.id === p.id)!;
                t.quantidade = Math.abs(p.quantidade);
                t.valorProduto = t.produtoModel.valor;
                t.valorTotal = t.valorProduto * t.quantidade;
                t.pago = p.pago
                t.reserva = this.reservaSelecionada;
                t.hospede = this.reservaSelecionada.hospedes.find(h => h.nome == p.nome)!;
                t.tipoTransacao = 'SAIDA' as TipoTransacaoEnum;
                return t;
            })
            .map(t => this.transacaoService.save(t)))
            .subscribe({
                next: value => {
                    if (value.every(t => t.ok)) {
                        notify('Registro salvo com sucesso', 'success', 3600);
                        window.history.back();
                        return;
                    }
                },
                error: err => {
                    notify('Algo deu errado, verifique e tente novamente', 'error', 3600);
                    console.error(err);
                }
            });
    }

    async adicionaConsumoAGrid() {
        if (this.reservaSelecionada) {
            let resp = await lastValueFrom(this.transacaoService.findByReserva(this.reservaSelecionada))
            if (resp.ok) {
                this.produtosConsumidos = resp.body!;
                this.produtosNaGrid = resp.body!.map(t => {
                    return {
                        id: t.produtoModel.id,
                        quantidade: Math.abs(t.quantidade),
                        nome: t.hospede.nome,
                        pago: t.pago,
                        idConsumo: t.id
                    };
                });
            }
        }
    }
}
