import {Component, OnInit} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {QuartoService} from "../../shared/services/quarto.service";
import {HospedeService} from "../../shared/services/hospede.service";
import {HospedeModel} from "../../shared/models/hospede.model";
import {QuartoModel} from "../../shared/models/quarto.model";

@Component({
    selector: 'app-reserva',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

    mode: ModeEnum = ModeEnum.LIST;
    hospedes: HospedeModel[] = [];
    quartos: QuartoModel[] = [];

    constructor(private router: Router,
                private quartoService: QuartoService,
                private hospedeService: HospedeService) {
    }

    ngOnInit(): void {
        this.buscaDadosIniciais();

        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit) {
            this.findReserva(this.router.url.split('/').pop()!)
        }
    }

    findReserva(id: string) {

    }

    buscar() {

    }

    novo() {
        this.router.navigate(['reservas', 'cad'])
    }

    salvar() {

    }

    buscaDadosIniciais() {
        forkJoin([this.hospedeService.findAll(), this.quartoService.findAll()])
            .subscribe(([hospResp, quartResp]) => {
                if (hospResp.ok && quartResp.ok) {
                    this.hospedes = hospResp.body!;
                    this.quartos = quartResp.body!;
                }
            })
    }
}
