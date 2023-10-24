import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {QuartoService} from "../../shared/services/quarto.service";
import {HospedeService} from "../../shared/services/hospede.service";
import {HospedeModel} from "../../shared/models/hospede.model";
import {QuartoModel} from "../../shared/models/quarto.model";
import {DxAutocompleteComponent, DxDataGridComponent, DxSelectBoxComponent} from "devextreme-angular";
import notify from "devextreme/ui/notify";
import _ from "lodash";
import {Utils} from "../../shared/Utils";

@Component({
    selector: 'app-reserva',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

    @ViewChild('hospedeAutoComplete') hospedeAutoComplete: DxAutocompleteComponent;
    @ViewChild('gridDeHospedesNaReserva') gridDeHospedesNaReserva: DxDataGridComponent;
    @ViewChild('quartoSelectBox') quartoSelectBox: DxSelectBoxComponent;

    mode: ModeEnum = ModeEnum.LIST;
    hospedes: HospedeModel[] = [];
    hospedesNaReserva: HospedeModel[] = [];
    hospedeSelecinado: HospedeModel | null;
    quartos: QuartoModel[] = [];
    quartosNaReserva: QuartoModel[] = [];
    quartoSelecinado: QuartoModel | null;
    hoje: Date = new Date();
    dataEntrada: Date | number | string = new Date();
    dataSaida: Date | number | string = new Date();
    protected readonly Utils = Utils;

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
        console.log(this.hospedesNaReserva)
        console.log(this.quartosNaReserva)
        console.log(this.dataEntrada)
        console.log(this.dataSaida)
        console.log(Utils.diferencaEmDias(this.dataEntrada, this.dataSaida))
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

    adicionaHospedeGrid() {
        let hospede: HospedeModel | null = this.hospedeAutoComplete.selectedItem;
        if (_.isNil(hospede)) {
            notify('Selecione o hospede da caixa de seleção, caso não exista, realize o cadastro', 'warning', 5000);
            return;
        }
        if (_.includes(this.hospedesNaReserva, hospede)) {
            notify('Hospede já está na reserva', 'warning', 3600);
            return;
        }
        this.hospedesNaReserva.push(hospede);
        this.hospedeAutoComplete.value = '';
    }

    removeHospedeGrid() {
        if (_.isNil(this.hospedeSelecinado)) {
            notify('Selecione um hospede', 'warning', 3600);
            return;
        }

        let index: number = _.indexOf(this.hospedesNaReserva, this.hospedeSelecinado);
        if (index != -1) {
            this.hospedesNaReserva.splice(index, 1);
            this.hospedeSelecinado = null;
        }
    }

    selecionaHospede(e) {
        e.component.byKey(e.currentSelectedRowKeys[0]).done(hospede => {
            if (hospede) {
                this.hospedeSelecinado = hospede;
            }
        });
    }

    adicionaQuartoGrid() {
        if (_.isNil(this.quartoSelectBox.selectedItem)) {
            notify('Selecione um quarto', 'warning', 3600);
            return;
        }
        if (_.includes(this.quartosNaReserva, this.quartoSelectBox.selectedItem)) {
            notify('Quarto já está nesta reserva', 'error', 3600);
            return;
        }
        this.quartosNaReserva.push(this.quartoSelectBox.selectedItem)
        this.quartoSelectBox.instance.reset();
    }

    removeQuartoGrid() {
        if (_.isNil(this.quartoSelecinado)) {
            notify('Selecione um quarto', 'warning', 3600);
            return;
        }

        let index: number = _.indexOf(this.quartosNaReserva, this.quartoSelecinado);
        if (index != -1) {
            this.quartosNaReserva.splice(index, 1);
            this.quartoSelecinado = null;
        }
    }

    selecionaQuarto(e) {
        e.component.byKey(e.currentSelectedRowKeys[0]).done(quarto => {
            if (quarto) {
                this.quartoSelecinado = quarto;
            }
        });
    }
}
