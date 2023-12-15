import {Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {QuartoService} from "../../shared/services/quarto.service";
import {HospedeService} from "../../shared/services/hospede.service";
import {HospedeModel} from "../../shared/models/hospede.model";
import {QuartoModel} from "../../shared/models/quarto.model";
import {
    DxAutocompleteComponent
  , DxDataGridComponent
  , DxSelectBoxComponent
  , DxTabPanelComponent
} from "devextreme-angular";
import notify from "devextreme/ui/notify";
import _ from "lodash";
import {Utils} from "../../shared/Utils";
import {ReservaModel} from "../../shared/models/reserva.model";
import {ReservaService} from "../../shared/services/reserva.service";
import {EmpresaModel} from "../../shared/models/empresa.model";
import {EmpresaService} from "../../shared/services/empresa.service";

@Component({
    selector: 'app-reserva',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

    @ViewChild('hospedeAutoComplete') hospedeAutoComplete: DxAutocompleteComponent;
    @ViewChild('gridDeHospedesNaReserva') gridDeHospedesNaReserva: DxDataGridComponent;
    @ViewChild('quartoSelectBox') quartoSelectBox: DxSelectBoxComponent;
    @ViewChild('empresaSelect') empresaSelect: DxSelectBoxComponent;
    @ViewChild('tabPanel') tabPanel: DxTabPanelComponent;

    mode: ModeEnum = ModeEnum.LIST;
    reserva: ReservaModel;
    hospedeSelecinado: HospedeModel | null;
    quartoSelecinado: QuartoModel | null;
    reservaSelecionada: ReservaModel;
    isEmpresa: boolean = false;
    hoje: Date = new Date();
    protected readonly Utils = Utils;
    hospedes: HospedeModel[] = [];
    quartos: QuartoModel[] = [];
    empresas: EmpresaModel[] = [];
    reservas: ReservaModel[] = [];
    reservasJaRealizadas: ReservaModel[] = [];

    constructor(private router: Router,
                private quartoService: QuartoService,
                private hospedeService: HospedeService,
                private reservaService: ReservaService,
                private empresaService: EmpresaService) {
    }


    ngOnInit(): void {
        this.reserva = new ReservaModel();
        this.buscaDadosIniciais();

        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        if (edit) {
            this.findReserva(this.router.url.split('/').pop()!)
        }
    }


    findReserva(id: string) {
        let idAsNumber = Number(id);

        this.reservaService.findById(idAsNumber).subscribe(resp => {
            if (resp.ok) {
                if(!_.isNil(resp.body!.empresa)) {
                    this.isEmpresa = true;
                    this.buscaEmpresas();
                }
                this.reserva = resp.body!;
                this.reserva.dataEntrada = this.parseDataStringParaDate(this.reserva.dataEntrada.toString());
                this.reserva.dataPrevistaSaida = this.parseDataStringParaDate(this.reserva.dataPrevistaSaida.toString());
                this.empresaSelect.value = this.empresaSelect.items.find(e => e.id === this.reserva.empresa.id);
            }
        });
    }

    buscar() {
        this.reservaService.findAll().subscribe(resp => {
            if (resp.ok) {
                this.reservas = resp.body!;
            }
        })
    }

    novo() {
        this.router.navigate(['reservas', 'cad'])
    }

    salvar() {
        if (this.verificaAntesDeSalvar()) {

            this.reservaService.verificaDisponibilidade(this.reserva).subscribe(resp => {

                if (resp.status === 200 && resp.body != null) {
                    this.tabPanel.selectedIndex = this.tabPanel.items.length - 1;
                    this.reservasJaRealizadas = _.isNil(resp.body) ? [] : <ReservaModel[]>resp.body;
                    return;
                }

                if (resp.status === 204 && resp.body === null) {
                    notify('Data e quarto disponíveis', 'success', 3600);
                    this.reservaService.save(this.reserva).subscribe(resp => {
                        if (resp.ok) {
                            notify('Reserva realizada', 'success', 3600);
                            window.history.back();
                        }
                    })
                }
            })
        }
    }

    verificaAntesDeSalvar() {
        if (_.isNil(this.reserva.hospedes) || _.isEmpty(this.reserva.hospedes)) {
            notify('É necessário a inclusão de ao menos um hospede', 'error', 3600);
            return false;
        }
        if (_.isNil(this.reserva.quartos) || _.isEmpty(this.reserva.quartos)) {
            notify('É necessário a inclusão de ao menos um quarto', 'error', 3600);
            return false;
        }
        if (_.isNil(this.reserva.empresa) && this.isEmpresa) {
            notify('É necessário selecionar a empresa', 'error', 3600);
            return false;
        }
        if (_.isNil(this.reserva.dataEntrada)) {
            notify('Informe a data de entrada', 'error', 3600);
            return false;
        }
        if (_.isNil(this.reserva.dataPrevistaSaida)) {
            notify('Informe a data de saída', 'error', 3600);
            return false;
        }
        return true;
    }

    buscaDadosIniciais() {
        forkJoin([this.hospedeService.findAll(), this.quartoService.findAll()])
            .subscribe(([hospResp, quartResp]) => {
                if (hospResp.ok && quartResp.ok) {
                    this.hospedes = hospResp.body!;
                    this.quartos = quartResp.body!;
                }
            })
        this.buscaEmpresas();
    }

    adicionaHospedeGrid() {
        let hospede: HospedeModel | null = this.hospedeAutoComplete.selectedItem;
        if (_.isNil(hospede)) {
            notify('Selecione o hospede da caixa de seleção, caso não exista, realize o cadastro', 'warning', 5000);
            return;
        }
        if (_.includes(this.reserva.hospedes, hospede)) {
            notify('Hospede já está na reserva', 'warning', 3600);
            return;
        }
        this.reserva.hospedes.push(hospede);
        this.hospedeAutoComplete.value = '';
    }

    removeHospedeGrid() {
        if (_.isNil(this.hospedeSelecinado)) {
            notify('Selecione um hospede', 'warning', 3600);
            return;
        }

        let index: number = _.indexOf(this.reserva.hospedes, this.hospedeSelecinado);
        if (index != -1) {
            this.reserva.hospedes.splice(index, 1);
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
        if (_.includes(this.reserva.quartos, this.quartoSelectBox.selectedItem)) {
            notify('Quarto já está nesta reserva', 'error', 3600);
            return;
        }
        this.reserva.quartos.push(this.quartoSelectBox.selectedItem)
        this.quartoSelectBox.instance.reset();
    }

    removeQuartoGrid() {
        if (_.isNil(this.quartoSelecinado)) {
            notify('Selecione um quarto', 'warning', 3600);
            return;
        }

        let index: number = _.indexOf(this.reserva.quartos, this.quartoSelecinado);
        if (index != -1) {
            this.reserva.quartos.splice(index, 1);
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

    buscaEmpresas() {
        if (this.isEmpresa && _.isEmpty(this.empresas)) {
            this.empresaService.findAll().subscribe(resp => {
                if (resp.ok) {
                    this.empresas = resp.body!
                }
            })
        }
    }

    defineEmpresa() {
        this.reserva.empresa = this.empresaSelect.selectedItem;
    }

    selecionaReserva(event: any) {
        event.component.byKey(event.currentSelectedRowKeys[0]).done(reserva => {
            if (reserva) {
                this.reservaSelecionada = reserva;
            }
        });
    }

    editar(event: any) {
        this.router.navigate(['reservas', 'edit', this.reservaSelecionada.id])
    }

    /*montaReserva() {
        const reserva = new ReservaModel();
        reserva.hospedes = this.hospedesNaReserva;
        reserva.quartos = this.quartosNaReserva;
        reserva.empresa = this.empresaSelecionada;
        reserva.dataEntrada = <Date>this.dataEntrada;
        reserva.dataPrevistaSaida = <Date>this.dataSaida;
        reserva.valorDiaria = this.quartosNaReserva.reduce((total, quarto) => total + quarto.valorDiaria, 0);
        /!* +1 para contar com o dia de hoje *!/
        console.log(this.dataSaida)
        reserva.diasHospedado = Utils.diferencaEmDias(this.dataEntrada, this.dataSaida) + 1;

        return reserva;
    }

    montaReservaEdit(reserva: ReservaModel) {
        this.hospedesNaReserva = reserva.hospedes;
        this.quartosNaReserva = reserva.quartos;
        this.dataEntrada = this.parseDataStringParaDate(reserva.dataEntrada.toString());
        this.dataSaida = this.parseDataStringParaDate(reserva.dataPrevistaSaida.toString());
        if (this.isEmpresa) {
            /!*this.empresaSelect.value = this.empresas.find(e => e.razaoSocial === reserva.empresa.razaoSocial);
            this.cdr.detectChanges();*!/

            /!*
            *
            * Gambiarra pois não consegui fazer de forma alguma a função ser executada só após o empresaSelect ser renderizado
            * tentei promises, async/await, ngAfterViewInit dentre outras ...
            *
            *!/
            const defEmpr = setInterval(() => {
                if (!_.isNil(this.empresaSelect && this.empresas.length > 0)) {
                    this.empresaSelect.value = this.empresas.find(e => e.razaoSocial === reserva.empresa.razaoSocial);
                    clearInterval(defEmpr);
                }
            }, 100);
        }
    }*/

    parseDataStringParaDate(data: string) : Date {
        const partes = data.split('-');
        const ano = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1; // Meses em JavaScript são baseados em zero
        const dia = parseInt(partes[2]);

        return new Date(ano, mes, dia);
    }
}
