import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservaService} from "../../shared/services/reserva.service";
import {ReservaModel} from "../../shared/models/reserva.model";
import notify from "devextreme/ui/notify";
import {Utils} from "../../shared/Utils";
import {QuartoModel} from "../../shared/models/quarto.model";
import {QuartoService} from "../../shared/services/quarto.service";
import {forkJoin, lastValueFrom} from "rxjs";
import {DxDataGridComponent, DxDateBoxComponent, DxRadioGroupComponent} from "devextreme-angular";
import {TransacaoService} from "../../shared/services/transacao.service";
import {TransacaoModel} from "../../shared/models/transacaoModel";
import {NotaCheckOutService} from "../../shared/services/notaCheckOut.service";
import {NotaCheckOutModel} from "../../shared/models/notaCheckOut.model";
import {FormaPagamentoEnum} from "../../shared/enums/FormaPagamentoEnum";
import {Router} from "@angular/router";
import _ from "lodash";


@Component({
    selector: 'app-monitor-reservas',
    templateUrl: './monitor-reservas.component.html',
    styleUrls: ['./monitor-reservas.component.scss']
})
export class MonitorReservasComponent implements OnInit {

    @ViewChild('monitor', {static: false}) monitor: DxDataGridComponent;
    @ViewChild('gridCheckOut', {static: false}) gridCheckOut: DxDataGridComponent;
    @ViewChild('formaPagamento', {static: false}) formaPagamento: DxRadioGroupComponent;
    @ViewChild('dataCheckOut', {static: false}) dataCheckOut: DxDateBoxComponent;

    reservas: ReservaModel[] = [];
    quartos: QuartoModel[] = [];
    diasDaSemana: Date[] = [];
    semanaGerada: number = 0;
    reservaDoResumo: ReservaModel;
    isLoading: boolean = false;
    checkInVisible: boolean = false;
    cancelaVisible: boolean = false;
    isCheckOutVisible: boolean = false;
    consumo: TransacaoModel[] = [];
    estadia: { valor: number; dia: string | number | Date }[];
    totalCheckOut: number;
    totalGeral: number;
    totalEstadia: number;
    totalConsumo: number;
    valorDesconto: number;
    formaPagamentoVisible: boolean = false;
    dinheiroEntregue: number = 0;
    formasPag = Object.keys(FormaPagamentoEnum).map(key => ({value: key, displayText: FormaPagamentoEnum[key]}));
    formaPagDinheiro: string = '';
    hoje: Date | number | string = Date.now();
    protected readonly Utils = Utils;

    constructor(private reservaService: ReservaService,
                private quartoService: QuartoService,
                private transacaoService: TransacaoService,
                private notaCheckOutService: NotaCheckOutService,
                private router: Router) {
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
    }

    ngOnInit() {
        this.carregaDados();
    }

    periodoAnterior() {
        this.semanaGerada = this.semanaGerada - 1;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        this.carregaDados();
    }

    semanaAtual() {
        this.semanaGerada = 0;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        this.carregaDados();
    }

    proximoPeriodo() {
        this.semanaGerada = this.semanaGerada + 1;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        this.carregaDados();
    }

    filtraQuarto() {
        this.quartos.forEach(quarto => {
            quarto.reservas = _.compact(this.reservas.filter(r => {
                return (!_.isNil(r.quarto) && (quarto.nome === r.quarto.nome)) ? r : null;
            }))
        });
        this.isLoading = false;
    }

    formataHospedeReserva(data) {
        this.isLoading = true;

        const reserv = data.data.reservas.filter(r => {
            const [anoE, mesE, diaE] = r.dataEntrada.split("-");
            const [anoS, mesS, diaS] = r.dataPrevistaSaida.split("-");

            const dataEntradaObj: Date = new Date(Number(anoE), Number(mesE) - 1, Number(diaE));
            const dataSaidaObj: Date = new Date(Number(anoS), Number(mesS) - 1, Number(diaS));
            const dataCaptionObj: Date = Utils.gerarDateAPartirDaString(data.column.caption);

            if (((dataCaptionObj.getTime() >= dataEntradaObj.getTime() && dataCaptionObj.getTime() <= dataSaidaObj.getTime()) &&
                (data.data.id == r.quarto.id))) {
                return r;
            }
        })

        this.isLoading = false;
        return reserv;
    }

    formataCabecalho(dataAsString) {
        const [data, diaSemana] = Utils.formatarDataParaString(new Date(dataAsString)).split('#')
        return [data, diaSemana];
    }

    resumoReserva(data: any, event: any) {
        this.isLoading = true;

        this.selecionarQuadrinho(event);

        this.reservaDoResumo = data.data.reservas.find(r => {
            const [anoE, mesE, diaE] = r.dataEntrada.split("-");
            const [anoS, mesS, diaS] = r.dataPrevistaSaida.split("-");

            const dataEntradaObj: Date = new Date(Number(anoE), Number(mesE) - 1, Number(diaE));
            const dataSaidaObj: Date = new Date(Number(anoS), Number(mesS) - 1, Number(diaS));
            const dataCaptionObj: Date = Utils.gerarDateAPartirDaString(data.column.caption);

            if (((dataCaptionObj.getTime() >= dataEntradaObj.getTime() && dataCaptionObj.getTime() <= dataSaidaObj.getTime()) &&
                (data.data.nome == r.quarto.nome))) {
                this.isLoading = false;
                return r;
            }
        });
    }

    selecionarQuadrinho(event: any) {
        // Remove a classe 'selecionado' de todos os quadrinhos
        // @ts-ignore
        document.querySelectorAll('.quadrinho').forEach((el: HTMLElement) => {
            el.classList.remove('selecionado');
        });

        // Adiciona a classe 'selecionado' à div do quadrinho clicado
        const quadrinhoDiv = event.currentTarget.closest('.quadrinho');
        if (quadrinhoDiv) {
            quadrinhoDiv.classList.add('selecionado');
        }
    }

    checkIn() {
        this.reservaService.checkIn(this.reservaDoResumo).subscribe(
            (resp) => {
                if (resp.ok) {
                    this.reservaDoResumo = resp.body!
                    notify('Check-In realizado com sucesso!', 'success', 3600);
                    this.checkInVisible = false;
                    this.carregaDados();
                }
            },
            (erro) => {
                notify('Falha ao realizar Check-In: ' + erro.message, 'error', 3600);
            })
    }

    cancelar() {
        if (_.isNil(this.reservaDoResumo.motivoCancelamento) || _.isEmpty(this.reservaDoResumo.motivoCancelamento)) {
            notify('Motivo do cancelamento é obrigatório', 'error', 3600);
            return;
        }

        this.reservaService.cancelar(this.reservaDoResumo).subscribe(
            (resp) => {
                if (resp.ok) {
                    this.reservaDoResumo = resp.body!
                    notify('Reserva cancelada com sucesso!', 'success', 3600);
                    this.cancelaVisible = false;
                    this.carregaDados();
                }
            },
            (erro) => {
                notify('Falha ao realizar cancelamento: ' + erro.message, 'error', 3600);
            })
    }

    async carregaDados() {
        this.isLoading = true;

        const requests = forkJoin([
            this.reservaService.buscarReservasPorPeriodo(
                Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[0]),
                Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[6]),
                Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[0]),
                Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[6])
            ),
            this.quartoService.findAll()
        ]);

        const [respReserva, respQuarto] = await lastValueFrom(requests);

        if (respQuarto.ok && respReserva.ok) {
            this.quartos = respQuarto.body!;
            this.reservas = respReserva.body!;
            this.filtraQuarto();
        }
        this.isLoading = false;
    }


    retornaTexto(r: any) {
        if (r.length > 0) {
            return r.at(0)?.checkedIn ? 'Ocupado' : 'Reservado';
        }
        return 'Vago';
    }

    async apuraCheckOut() {
        this.limpaCheckOut();

        this.isCheckOutVisible = true;

        this.estadia = this.reservaDoResumo.estadia.map(e => {
            return {dia: e, valor: this.reservaDoResumo.quarto.valorDiaria}
        })

        let resp = await lastValueFrom(this.transacaoService.findByReserva(this.reservaDoResumo));
        let consumo = resp.ok ? resp.body! : undefined;

        if (!_.isNil(consumo) && consumo.length > 0) {
            this.consumo = consumo.map(c => {
                c.quantidade = Math.abs(c.quantidade)
                return c;
            });
        }

        this.totalEstadia = this.estadia.reduce((total, estadia) => total + estadia.valor, 0);
        this.totalConsumo = this.consumo.filter(c => !c.pago)
            .reduce((total, c) => total + c.valorTotal, this.totalCheckOut);

        this.totalCheckOut = this.totalEstadia + this.totalConsumo;
        this.totalGeral = this.totalCheckOut;
    }

    aplicaDesconto(event: any) {
        this.valorDesconto = event.value;
        this.totalGeral = this.totalCheckOut - this.valorDesconto;
    }

    defineFormaPagamento(e: any) {
        this.formaPagDinheiro = e.value;
    }

    salvaCheckOut() {
        const notaCheckOut: NotaCheckOutModel = new NotaCheckOutModel();
        notaCheckOut.reserva = this.reservaDoResumo;
        notaCheckOut.valorDiaria = this.reservaDoResumo.quarto.valorDiaria;
        notaCheckOut.dataReferencia = Utils.parseDataStringParaDate(Utils.formatarDataParaStringSemDiaSemana(new Date(this.dataCheckOut.value)));
        notaCheckOut.formaPagamento = this.formaPagamento.value as FormaPagamentoEnum;
        notaCheckOut.valorConsumido = this.totalConsumo;
        notaCheckOut.valorDesconto = this.valorDesconto;
        notaCheckOut.subtotal = this.totalCheckOut;
        notaCheckOut.valorFinal = this.totalGeral;

        this.notaCheckOutService.save(notaCheckOut).subscribe({
            next: resp => {
                if (resp.ok) {
                    notify('Check-Out realizado com sucesso', 'success', 3600);
                    this.formaPagamentoVisible = false;
                    this.isCheckOutVisible = false;
                    this.carregaDados();
                }
            },
            error: err => {
                notify('Ocorreu uma falha ao realizar o Check-Out', 'error', 3600);
                console.error(err);
            }
        })
    }

    private limpaCheckOut() {
        this.totalCheckOut = 0;
        this.totalGeral = 0;
        this.totalEstadia = 0;
        this.totalConsumo = 0;
        this.consumo = [];
        this.estadia = [];
    }

    cadastraConsumo() {
        this.router.navigate(['consumo', 'cad', this.reservaDoResumo.id]);
    }

    voltar() {
        this.router.navigate(['home']);
    }
}
