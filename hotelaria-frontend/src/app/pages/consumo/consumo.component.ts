import {Component, OnInit} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {ReservaModel} from "../../shared/models/reserva.model";
import {ReservaService} from "../../shared/services/reserva.service";
import {Utils} from "../../shared/Utils";

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
    protected readonly Utils = Utils;

    constructor(private reservaService: ReservaService) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.datasDaSemana = Utils.gerarDatasSemana(0);
        this.reservaService.buscaReservasSemCheckOut().subscribe(
            (resp) => {
                this.reservasComCheckIn = resp.body!
                this.isLoading = false;
            }
        )
        /*this.reservaService.buscarReservasPorPeriodoComCheckIn(
            Utils.formatarDataParaStringSemDiaSemana(this.datasDaSemana[0]),
            Utils.formatarDataParaStringSemDiaSemana(this.datasDaSemana[6]),
            Utils.formatarDataParaStringSemDiaSemana(this.datasDaSemana[0]),
            Utils.formatarDataParaStringSemDiaSemana(this.datasDaSemana[6]),
        ).subscribe(
            (resp) => {
                this.reservasComCheckIn = resp.body!;
            }
        )*/
    }
}
