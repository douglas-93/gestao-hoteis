import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
import {RequestDTO} from "../../shared/dto/requestDTO";
import {Operation, SearchRequestDTO} from "../../shared/dto/searchRequestDTO";
import DevExpress from "devextreme";
import ValueChangedEvent = DevExpress.ui.dxAutocomplete.ValueChangedEvent;

@Component({
    selector: 'app-reserva',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

    @ViewChild('hospedeAutoComplete') hospedeAutoComplete: DxAutocompleteComponent;
    @ViewChild('gridDeHospedesNaReserva') gridDeHospedesNaReserva: DxDataGridComponent;
    @ViewChild('quartoSelectBox') quartoSelectBox: DxSelectBoxComponent;
    @ViewChild('empresaSelect', {static: false}) empresaSelect: DxSelectBoxComponent;
    @ViewChild('tabPanel') tabPanel: DxTabPanelComponent;

    mode: ModeEnum = ModeEnum.LIST;
    reserva: ReservaModel;
    hospedeSelecinado: HospedeModel | null;
    quartoSelecinado: QuartoModel | null;
    reservaSelecionada: ReservaModel;
    hoje: Date = new Date();
    hospedes: HospedeModel[] = [];
    quartos: QuartoModel[] = [];
    empresas: EmpresaModel[] = [];
    reservas: ReservaModel[] = [];
    reservasJaRealizadas: ReservaModel[] = [];
    reservaFilter: ReservaModel;
    hospedeFilter: number;
    quartoFilter: number;
    protected readonly Utils = Utils;

    constructor(private router: Router,
                private quartoService: QuartoService,
                private hospedeService: HospedeService,
                private reservaService: ReservaService,
                private empresaService: EmpresaService,
                private cdr: ChangeDetectorRef) {
    }


    ngOnInit(): void {
        this.reserva = new ReservaModel();
        this.reservaFilter = new ReservaModel();
        this.reserva.quarto = new QuartoModel();
        this.reservaFilter.quarto = new QuartoModel();
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
                this.reserva = resp.body!;
                this.reserva.dataEntrada = this.parseDataStringParaDate(this.reserva.dataEntrada.toString());
                this.reserva.dataPrevistaSaida = this.parseDataStringParaDate(this.reserva.dataPrevistaSaida.toString());
                this.reserva.quartos.push(this.reserva.quarto);
                if (this.reserva.isEmpresa) {
                    const defineEmpresa = setTimeout(() => {
                        const empresa = this.empresas.find(e => e.id === this.reserva.empresa?.id);
                        if (empresa) {
                            this.empresaSelect.instance.option('value', empresa);
                            this.empresaSelect?.instance.repaint();
                            this.cdr.detectChanges();
                            clearTimeout(defineEmpresa);
                        }
                    }, 500);
                }
            }
        });
    }

    buscar() {
        const excludeColumns = ["isEmpresa", "hospedes", "quartos", "quarto"];

        let keys = Object.keys(this.reservaFilter).filter(r => !excludeColumns.includes(r));
        if (keys.length > 0
            || (!_.isNil(this.hospedeFilter))
            || (!_.isNil(this.quartoFilter))) {

            const requestDTO: RequestDTO = this.reservaService.createSearchRequest(this.reservaFilter);

            requestDTO.searchRequestDTOS = requestDTO.searchRequestDTOS
                .filter(r => !excludeColumns.includes(r.columnName));

            requestDTO.searchRequestDTOS.forEach(r => {
                if (r.columnName.includes('data')) {
                    r.value = Utils.formatarDataParaStringSemDiaSemana(new Date(r.value));
                    r.operation = Operation.EQUAL;
                }
            })

            if (!_.isNil(this.quartoFilter)) {
                const nomeQuartoSearchRequest: SearchRequestDTO = new SearchRequestDTO();
                nomeQuartoSearchRequest.columnName = 'id';
                nomeQuartoSearchRequest.value = this.quartoFilter.toString();
                nomeQuartoSearchRequest.operation = Operation.JOIN;
                nomeQuartoSearchRequest.joinTable = 'quarto'
                requestDTO.searchRequestDTOS.push(nomeQuartoSearchRequest);
            }


            if (!_.isNil(this.hospedeFilter)) {
                const nomeHospedeSearchRequest: SearchRequestDTO = new SearchRequestDTO();
                nomeHospedeSearchRequest.columnName = 'id';
                nomeHospedeSearchRequest.value = this.hospedeFilter.toString();
                nomeHospedeSearchRequest.operation = Operation.JOIN;
                nomeHospedeSearchRequest.joinTable = 'hospedes';
                requestDTO.searchRequestDTOS.push(nomeHospedeSearchRequest);
            }

            this.reservaService.specification(requestDTO).subscribe({
                next: resp => {
                    if (resp.ok) {
                        this.reservas = resp.body!;
                    }
                }
            })

            return;
        }

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

            if (_.isNil(this.reserva.id)) {

                this.reservaService.verificaDisponibilidade(this.reserva).subscribe(resp => {

                    if (resp.status === 200 && resp.body != null) {
                        this.tabPanel.selectedIndex = this.tabPanel.items.length - 1;
                        this.reservasJaRealizadas = _.isNil(resp.body) ? [] : <ReservaModel[]>resp.body;
                        return;
                    }

                    if (resp.status === 204 && resp.body === null) {
                        notify('Data e quarto disponíveis', 'success', 3600);
                        if (_.isNil(this.reserva.quarto)) {
                            this.reserva.quarto = new QuartoModel();
                        }
                        this.reserva.quarto = this.reserva.quartos[0];
                        this.reservaService.save(this.reserva).subscribe(resp => {
                            if (resp.ok) {
                                notify('Reserva realizada', 'success', 3600);
                                window.history.back();
                            }
                        })
                    }
                })
            } else {
                if (!_.isNil(this.reserva.checkedIn) || !_.isNil(this.reserva.checkedOut) ||
                    !_.isNil(this.reserva.cancelada) || !_.isNil(this.reserva.dataSaida)) {
                    notify('Impossível alterar, etapas posteriores já foram executadas.', 'error', 3600);
                } else {
                    this.reservaService.update(this.reserva.id, this.reserva).subscribe(resp => {
                        if (resp.ok) {
                            notify('Reserva alterada com sucesso', 'success', 3600);
                            window.history.back();
                        }
                    })
                }
            }
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
        if (_.isNil(this.reserva.empresa) && this.reserva.isEmpresa) {
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
        forkJoin([this.hospedeService.findAll(), this.quartoService.findAll(), this.empresaService.findAll()])
            .subscribe(([hospResp, quartResp, empResp]) => {
                if (hospResp.ok && quartResp.ok && empResp.ok) {
                    this.hospedes = hospResp.body!;
                    this.quartos = quartResp.body!;
                    this.empresas = empResp.body!;
                }
            })
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
        this.reserva.quartos.push(this.quartoSelectBox.selectedItem);
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

    editar() {
        this.router.navigate(['reservas', 'edit', this.reservaSelecionada.id]);
    }

    parseDataStringParaDate(data: string): Date {
        const partes = data.split('-');
        const ano = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1; // Meses em JavaScript são baseados em zero
        const dia = parseInt(partes[2]);

        return new Date(ano, mes, dia);
    }

    exclui(): void {
        const id = this.reserva.id;

        if (!_.isNil(this.reserva.id)) {

            if (!_.isNil(this.reserva.checkedIn) || !_.isNil(this.reserva.checkedOut) ||
                !_.isNil(this.reserva.cancelada) || !_.isNil(this.reserva.dataSaida)) {
                notify('Impossível exclusão, etapas posteriores já foram executadas.', 'error', 3600);
                return;
            }

            this.reservaService.delete(id).subscribe(resp => {
                if (resp.ok) {
                    notify('Reserva Excluida com sucesso!', 'success', 3600);
                    window.history.back();
                    return;
                }
            })
        }

        /*notify('Não foi possível encontrar a reserva, verifique ou entre em contato com seu suporte técnico.'
            , 'error', 3600);*/
    }

    limpaEmpresa() {
        if (!this.reserva.isEmpresa) {
            this.reserva.empresa = undefined;
        }
    }

    defineHospedeFiltro(e: any) {
        this.hospedeFilter = this.hospedes.find(h => h.nome === e.value)?.id!;
    }

    defineQuartoFiltro(e: any) {
        this.quartoFilter = this.quartos.find(q => q.nome === e.value)?.id!;
    }
}
