import {Component} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";

@Component({
    selector: 'app-hotel',
    templateUrl: './hotel.component.html',
    styleUrls: ['./hotel.component.scss']
})
export class HotelComponent {
    mode: ModeEnum = ModeEnum.LIST;

    constructor(private router: Router) {
    }

    ngOnInit() {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit) {
            this._findHotel(this.router.url.split('/').pop()!)
        }
    }

    buscar() {

    }

    novo() {
        this.router.navigate(['hotel', 'cad'])
    }

    salvar() {

    }

    private _findHotel(id: string) {

    }
}
