import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ReservaService} from "../../shared/services/reserva.service";
import {ReservaModel} from "../../shared/models/reserva.model";
import notify from "devextreme/ui/notify";
import {Utils} from "../../shared/Utils";
import {QuartoModel} from "../../shared/models/quarto.model";
import {QuartoService} from "../../shared/services/quarto.service";
import {forkJoin} from "rxjs";
import {DxDataGridComponent} from "devextreme-angular";


@Component({
    selector: 'app-monitor-reservas',
    templateUrl: './monitor-reservas.component.html',
    styleUrls: ['./monitor-reservas.component.scss']
})
export class MonitorReservasComponent implements OnInit, AfterViewInit {

    @ViewChild('monitor', {static: false}) monitor: DxDataGridComponent;

    reservas: ReservaModel[] = [];
    quartos: QuartoModel[] = [];
    diasDaSemana: Date[] = [];
    semanaGerada: number = 0;
    protected readonly Utils = Utils;

    constructor(private reservaService: ReservaService,
                private quartoService: QuartoService,
                private zone: NgZone) {
    }

    ngOnInit() {

        let calls = forkJoin([this.reservaService.findAll(), this.quartoService.findAll()]);

        calls.subscribe(([respReserva, respQuarto]) => {
                if (respQuarto.ok && respReserva) {
                    this.quartos = respQuarto.body!;
                    this.reservas = respReserva.body!;
                }
            },
            ([errQuarto, errReserva]) => {
                if (errQuarto) {
                    notify('Não foi possível carregar os quartos', 'error', 3600);
                }
                if (errReserva) {
                    notify('Não foi possível carregar as reservas', 'error', 3600);
                }
            });

        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        // this.colocaReservaNoGrid();
    }

    ngAfterViewInit() {
        /*if (this.monitor) {
            this.monitor.instance.beginUpdate();

            // Iterar sobre colunas
            this.monitor.instance.getVisibleColumns().forEach(column => {
                console.log('Coluna:', column.caption);
            });

            // Iterar sobre linhas
            this.monitor.instance.getVisibleRows().forEach(row => {
                console.log('Linha:', row.data);
            });

            this.monitor.instance.endUpdate();
        }*/
    }

    periodoAnterior() {
        this.semanaGerada = this.semanaGerada - 1;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        this.colocaReservaNoGrid();
    }

    semanaAtual() {
        this.semanaGerada = 0;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        this.colocaReservaNoGrid();
    }

    proximoPeriodo() {
        this.semanaGerada = this.semanaGerada + 1;
        this.diasDaSemana = Utils.gerarDatasSemana(this.semanaGerada);
        this.colocaReservaNoGrid();
    }

    colocaReservaNoGrid() {
        this.zone.run(() => {
            this.monitor.instance.beginUpdate();

            this.reservas.forEach(reserva => {
                const dataReserva = new Date(reserva.dataEntrada);
                // const colunaCorrespondente = this.diasDaSemana.findIndex(data => data.getTime() === dataReserva.getTime());
                const colunaCorrespondente = this.diasDaSemana.findIndex(data => Utils.formatarDataParaString(data) === Utils.formatarDataParaString(dataReserva));
                console.log('ColunaCorrespondente: ' + colunaCorrespondente);

                if (colunaCorrespondente !== -1) {
                    const quartoCorrespondente = this.quartos.find(quarto => quarto.id === reserva.quartos[0].id);
                    console.log('QuartoCorrespondente' + quartoCorrespondente);

                    if (quartoCorrespondente) {
                        const linhaCorrespondente = this.monitor.instance.getRowIndexByKey(quartoCorrespondente.nome);
                        console.log('LinhaCorrespondente: ' + linhaCorrespondente);

                        // Obter a célula correspondente
                        const cellElement = this.monitor.instance.getCellElement(linhaCorrespondente, colunaCorrespondente);
                        console.log('CellElement: ' + cellElement)

                        // Defina o valor da célula com o nome do hóspede
                        if (cellElement) {
                            cellElement.innerText = reserva.hospedes[0].nome;

                            console.log(cellElement)

                            this.monitor.instance.repaint();
                        }
                    }
                }
            });

            this.monitor.instance.endUpdate();
        });
    }
}
