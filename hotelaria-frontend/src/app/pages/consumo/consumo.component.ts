import {Component, OnInit} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {ReservaModel} from "../../shared/models/reserva.model";
import {ReservaService} from "../../shared/services/reserva.service";
import {Utils} from "../../shared/Utils";
import notify from "devextreme/ui/notify";
import {Router} from "@angular/router";
import {QuartoModel} from "../../shared/models/quarto.model";

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
    protected readonly Utils = Utils;

    constructor(private reservaService: ReservaService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.reservaSelecionada = new ReservaModel();
        this.reservaSelecionada.quarto = new QuartoModel();

        let edit: boolean = this.router.url.includes('edit');
        let cad: boolean = this.router.url.includes('cad');
        this.mode = (edit || cad) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit || cad) {
            this.findReserva(this.router.url.split('/').pop()!)
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

    findReserva(id: string) {
        let idAsNumber = Number(id);

        this.reservaService.findById(idAsNumber).subscribe({
            next: (resp) => {
                if (resp.ok) {
                    this.reservaSelecionada = resp.body!;
                }
            },
            error: (err) => {
            },
            complete: () => {
            }
        })
    }
}
