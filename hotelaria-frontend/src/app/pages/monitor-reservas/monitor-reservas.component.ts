import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReservaService} from "../../shared/services/reserva.service";
import {ReservaModel} from "../../shared/models/reserva.model";
import notify from "devextreme/ui/notify";
import {Utils} from "../../shared/Utils";
import {QuartoModel} from "../../shared/models/quarto.model";
import {QuartoService} from "../../shared/services/quarto.service";
import {forkJoin} from "rxjs";
import {DxDataGridComponent} from "devextreme-angular";
import _ from "lodash";


@Component({
    selector: 'app-monitor-reservas',
    templateUrl: './monitor-reservas.component.html',
    styleUrls: ['./monitor-reservas.component.scss']
})
export class MonitorReservasComponent implements OnInit, AfterViewInit {

    @ViewChild('monitor', {static: false}) monitor: DxDataGridComponent;

    reservas: ReservaModel[] = [];
    quartos: QuartoModel[] = [];
    diasDaSemana: Date[] = [];
    semanaGerada: number = 0;
    reservaDoResumo: ReservaModel;
    isLoading: boolean = false;
    checkInVisible: boolean = false;
    cancelaVisible: boolean = false;
    protected readonly Utils = Utils;

    constructor(private reservaService: ReservaService,
                private quartoService: QuartoService) {
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
    }

    ngOnInit() {
        this.carregaDados();
    }

    ngAfterViewInit() {

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
                if (!_.isNil(r.quarto)) {
                    if (quarto.nome === r.quarto.nome) {
                        return r;
                    }
                }
                return null;
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

    carregaDados() {
        this.isLoading = true;
        let calls = forkJoin([
            this.reservaService.buscarReservasPorPeriodo(
                Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[0]),
                Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[6]),
                Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[0]),
                Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[6])),
            this.quartoService.findAll()
        ]);

        calls.subscribe(([respReserva, respQuarto]) => {
                if (respQuarto.ok && respReserva) {
                    this.quartos = respQuarto.body!;
                    this.reservas = respReserva.body!;
                    this.filtraQuarto();
                }
            },
            ([errQuarto, errReserva]) => {
                if (errQuarto) {
                    notify('Não foi possível carregar os quartos', 'error', 3600);
                }
                if (errReserva) {
                    notify('Não foi possível carregar as reservas', 'error', 3600);
                }
            });
    }

    /*atualizaReservasPorData() {
        this.isLoading = true;
        this.reservaService.buscarReservasPorPeriodo(
            Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[0]),
            Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[6]),
            Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[0]),
            Utils.formatarDataParaStringSemDiaSemana(this.diasDaSemana[6])).subscribe(
            (resp) => {
                if (resp.ok) {
                    this.reservas = resp.body!
                    this.filtraQuarto();
                }
                this.isLoading = false;
            },
            (err) => {
                notify('Algo deu errado ao buscar as reservas', 'error', 3600);
                console.error(err);
                this.isLoading = false;
            });
    }*/
    retornaTexto(r: any) {
        if(r.length > 0) {
            return r.at(0)?.checkedIn ? 'Ocupado' : 'Reservado';
        }
        return  'Vago';
    }
}
