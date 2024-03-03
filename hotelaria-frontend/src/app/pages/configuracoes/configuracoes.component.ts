import {Component} from '@angular/core';
import DevExpress from "devextreme";
import ValueChangedEvent = DevExpress.ui.dxDateBox.ValueChangedEvent;
import {ConfiguracaoModel} from "../../shared/models/configuracao.model";
import {ModeEnum} from "../../shared/enums/mode.enum";

@Component({
    selector: 'app-configuracoes',
    templateUrl: './configuracoes.component.html',
    styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent {

    configuracao: ConfiguracaoModel;
    hora: Date | number | string;
    cancelamentoAutomaticoAtivo: boolean | null | undefined = false;

    ngOnInit() {
        this.configuracao = new ConfiguracaoModel();
    }

    logar(event: ValueChangedEvent) {
        console.log(this.hora)
        console.log(new Date(this.hora).getHours())
        console.log(new Date(this.hora).getMinutes())
        console.log(this.formataHora())
    }

    formataHora(){
        let hora = new Date(this.hora).getHours().toString().padStart(2, '0');
        let minuto = new Date(this.hora).getMinutes().toString().padStart(2, '0');
        return `${hora}:${minuto}`;
    }

    protected readonly ModeEnum = ModeEnum;
}
