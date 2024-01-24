import {Component} from '@angular/core';
import DevExpress from "devextreme";
import ValueChangedEvent = DevExpress.ui.dxDateBox.ValueChangedEvent;

@Component({
    selector: 'app-configuracoes',
    templateUrl: './configuracoes.component.html',
    styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent {
    hora: Date | number | string;

    logar(event: ValueChangedEvent) {
        console.log(event)
        console.log(this.hora)
        console.log(new Date(this.hora).getHours())
        console.log(new Date(this.hora).getMinutes())
    }
}
