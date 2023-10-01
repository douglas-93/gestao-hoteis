import {Component, OnInit} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
    mode: ModeEnum = ModeEnum.LIST;

    constructor(private router: Router) {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit) {
            this.findEmpresa(this.router.url.split('/').pop()!)
        }
    }

    ngOnInit(): void {
    }

    buscar() {

    }

    novo() {
        this.router.navigate(['empresas', 'cad'])
    }

    salvar() {

    }

    findEmpresa(id: string) {

    }
}
