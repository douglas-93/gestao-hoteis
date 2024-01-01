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
    }

    ngOnInit() {
        this.isLoading = true;
        // this.reservaDoResumo = new ReservaModel();

        let calls = forkJoin([this.reservaService.findAll(), this.quartoService.findAll()]);

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

        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        // this.colocaReservaNoGrid();
    }

    ngAfterViewInit() {

    }

    periodoAnterior() {
        this.semanaGerada = this.semanaGerada - 1;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        this.colocaReservaNoGrid();
    }

    semanaAtual() {
        this.semanaGerada = 0;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        this.colocaReservaNoGrid();
    }

    proximoPeriodo() {
        this.semanaGerada = this.semanaGerada + 1;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        this.colocaReservaNoGrid();
    }

    colocaReservaNoGrid() {

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

    logar(data) {
        console.log(data)
        return ''
    }

    formataCabecalho(dataAsString) {
        const [data, diaSemana] = Utils.formatarDataParaString(new Date(dataAsString)).split('#')
        return [data, diaSemana];
    }

    resumoReserva(data: any, event: any) {
        /*console.log(data.data)
        console.log(data.row.key)
        console.log(Utils.gerarDateAPartirDaString(data.column.caption))
        console.log(data.data.reservas)*/

        this.isLoading = true;

        this.selecionarQuadrinho(event);


        this.reservaDoResumo = data.data.reservas.filter(r => {
            const [anoE, mesE, diaE] = r.dataEntrada.split("-");
            const [anoS, mesS, diaS] = r.dataPrevistaSaida.split("-");

            const dataEntradaObj: Date = new Date(Number(anoE), Number(mesE) - 1, Number(diaE));
            const dataSaidaObj: Date = new Date(Number(anoS), Number(mesS) - 1, Number(diaS));
            const dataCaptionObj: Date = Utils.gerarDateAPartirDaString(data.column.caption);

            if (((dataCaptionObj.getTime() >= dataEntradaObj.getTime() && dataCaptionObj.getTime() <= dataSaidaObj.getTime()) &&
                (data.data.nome == r.quarto.nome))) {
                return r;
            }
        })[0]
        this.isLoading = false;
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
}
