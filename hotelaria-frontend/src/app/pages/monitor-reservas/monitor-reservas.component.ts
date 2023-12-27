import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservaService} from "../../shared/services/reserva.service";
import {ReservaModel} from "../../shared/models/reserva.model";
import notify from "devextreme/ui/notify";
import {Utils} from "../../shared/Utils";
import {QuartoModel} from "../../shared/models/quarto.model";
import {QuartoService} from "../../shared/services/quarto.service";
import {forkJoin} from "rxjs";
import {DxDataGridComponent} from "devextreme-angular";


@Component({
    selector: 'app-monitor-reservas',
    templateUrl: './monitor-reservas.component.html',
    styleUrls: ['./monitor-reservas.component.scss']
})
export class MonitorReservasComponent implements OnInit {

    @ViewChild('monitor', {static: false}) monitor: DxDataGridComponent;

    reservas: ReservaModel[] = [];
    quartos: QuartoModel[] = [];
    diasDaSemana: Date[] = [];
    semanaGerada: number = 0;
    protected readonly Utils = Utils;

    constructor(private reservaService: ReservaService,
                private quartoService: QuartoService) {
    }

    ngOnInit() {

        let calls = forkJoin([this.reservaService.findAll(), this.quartoService.findAll()]);

        calls.subscribe(([respReserva, respQuarto]) => {
                if (respQuarto.ok && respReserva) {
                    this.quartos = respQuarto.body!;
                    this.reservas = respReserva.body!;
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
        this.colocaReservaNoGrid();
    }

    periodoAnterior() {
        this.semanaGerada = this.semanaGerada - 1;
        console.log(this.semanaGerada)
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
    }

    semanaAtual() {
        this.semanaGerada = 0;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
    }

    proximoPeriodo() {
        this.semanaGerada = this.semanaGerada + 1;
        console.log(this.semanaGerada)
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
    }

    colocaReservaNoGrid() {
        this.reservas.forEach(r => {
            if (this.diasDaSemana.includes(new Date(r.dataEntrada))) {

            }
        });
    }
}
