import {Component, OnInit} from '@angular/core';
import {ReservaService} from "../../shared/services/reserva.service";
import {ReservaModel} from "../../shared/models/reserva.model";
import notify from "devextreme/ui/notify";
import {Utils} from "../../shared/Utils";


@Component({
  selector: 'app-monitor-reservas',
  templateUrl: './monitor-reservas.component.html',
  styleUrls: ['./monitor-reservas.component.scss']
})
export class MonitorReservasComponent implements OnInit{

    reservas: ReservaModel[] = [];
    diasDaSemana: Date[] = [];
    semanaGerada: number = 0;

    constructor(private reservaService: ReservaService) {
    }

    ngOnInit() {
        this.reservaService.findAll().subscribe(
            (resp) => {
                if (resp.ok) {
                    this.reservas = resp.body!;
                }
            },
            (error) => {
                notify('Não foi possível carregar as reservas', 'error', 3600);
            }
        )

        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
    }

    protected readonly Utils = Utils;

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

    logar(data) {
        console.log(data)
    }
}
