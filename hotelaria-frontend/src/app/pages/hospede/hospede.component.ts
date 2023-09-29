import {Component, OnInit} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";

@Component({
    selector: 'app-hospede',
    templateUrl: './hospede.component.html',
    styleUrls: ['./hospede.component.scss']
})
export class HospedeComponent implements OnInit {

    mode: ModeEnum = ModeEnum.LIST;
    hoje: Date = new Date(Date.now());

    constructor(private router: Router) {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit) {
            this.findHospede(this.router.url.split('/').pop()!)
        }
    }

    ngOnInit(): void {
    }

    buscar() {

    }

    novo() {
        this.router.navigate(['hospedes', 'cad'])
    }

    salvar() {

    }

    findHospede(id: string) {

    }
}
