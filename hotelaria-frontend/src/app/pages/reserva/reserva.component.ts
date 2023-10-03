import {Component, OnInit} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";

@Component({
    selector: 'app-reserva',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
    mode: ModeEnum = ModeEnum.LIST;

    constructor(private router: Router) {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit) {
            this.findReserva(this.router.url.split('/').pop()!)
        }
    }

    ngOnInit(): void {
    }

    findReserva(id: string) {

    }

    buscar() {

    }

    novo() {
        this.router.navigate(['hospedes', 'cad'])
    }

    salvar() {

    }
}
