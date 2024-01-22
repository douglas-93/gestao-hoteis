import {Component} from '@angular/core';
import {HotelService} from "../../shared/services/hotel.service";
import {HotelModel} from "../../shared/models/hotel.model";
import {ArquivoDIgitalModel} from "../../shared/models/ArquivoDIgitalModel";
import {ArquivoDigitalService} from "../../shared/services/arquivoDigitalService";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {ReservaService} from "../../shared/services/reserva.service";
import {Utils} from "../../shared/Utils";
import _ from "lodash";
import {ReservaModel} from "../../shared/models/reserva.model";
import {QuartoModel} from "../../shared/models/quarto.model";
import {QuartoService} from "../../shared/services/quarto.service";

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {

    hotel: HotelModel;
    arquivoDigital: ArquivoDIgitalModel;
    dataHoraHoje: number;
    isCalculadoraVisible: boolean = false;
    reservasNaSemana: number;
    reservasComCheckIn: number;
    reservasComCheckOut: number;
    reservasPrevistasParaSair: number;
    checkOutParaHoje: number;
    quartoMaisVagoDaSemana: string | undefined;
    reservas: ReservaModel[] | undefined;
    quartos: QuartoModel[] | undefined;
    quartosOcupados;

    constructor(private hotelService: HotelService,
                private arquivoDigitalService: ArquivoDigitalService,
                private reservasService: ReservaService,
                private quartosService: QuartoService,
                private router: Router) {
        this.dataHoraHoje = Date.now();
    }

    ngOnInit() {
        this.hotel = new HotelModel();
        setInterval(() => this.atualizaDataHora(), 1000);
        this.pegaDadosHotel();
        this.pegaReservasEQuartos();

    }

    async pegaDadosHotel() {
        let resp = await lastValueFrom(this.hotelService.findById(3));
        if (resp.ok) {
            this.hotel = resp.body!;
        }

        let response = await lastValueFrom(this.arquivoDigitalService.findById(this.hotel.logoMarcaId));
        if (response.ok) {
            this.arquivoDigital = response.body!;
            this.hotel.logoAsDataSource = `data:${this.arquivoDigital.tipo};base64,${this.arquivoDigital.dados}`;
        }
    }

    async pegaReservasEQuartos() {
        const diasSemana = Utils.gerarDatasSemana(0);
        let dataInicial = Utils.formatarDataParaStringSemDiaSemana(diasSemana.at(0)!);
        let dataFinal = Utils.formatarDataParaStringSemDiaSemana(diasSemana.pop()!);
        let respR = await lastValueFrom(this.reservasService.buscarReservasPorPeriodo(dataInicial, dataFinal, dataInicial, dataFinal));
        this.reservas = respR.ok ? respR.body! : undefined;

        let respQ = await lastValueFrom(this.quartosService.findAll());
        this.quartos = respQ.ok ? respQ.body! : undefined;

        this.geraEstatisticas(diasSemana);
    }

    geraEstatisticas(diasSemana) {
        if (!_.isUndefined(this.reservas)) {
            this.reservasNaSemana = this.reservas.length;
            this.reservasComCheckIn = 0;
            this.reservasComCheckOut = 0;
            this.reservasPrevistasParaSair = 0;
            this.checkOutParaHoje = 0;
            let hojeGetDate = new Date().getDate();
            let diasGetDate = diasSemana.map(d => d.getDate());
            let quartosOcupados = this.quartos?.map(q => {return {quarto: q.nome, ocupacao: 0}});

            this.reservas.forEach(r => {
                if (r.checkedIn && !r.checkedOut) {
                    this.reservasComCheckIn += 1;
                }
                if (r.checkedOut) {
                    this.reservasComCheckOut += 1;
                }
                if (diasGetDate.includes(Utils.parseDataStringParaDate(<string>r.dataPrevistaSaida).getDate()) && r.checkedIn && !r.checkedOut) {
                    this.reservasPrevistasParaSair += 1;
                }
                if (hojeGetDate == Utils.parseDataStringParaDate(<string>r.dataPrevistaSaida).getDate() && r.checkedIn && !r.checkedOut) {
                    this.checkOutParaHoje += 1;
                }

                if (quartosOcupados) {
                    let quartoOcupado = quartosOcupados.find(q => q.quarto === r.quarto.nome);
                    if (quartoOcupado) {
                        quartoOcupado.ocupacao += 1;
                    }
                }
            });
            this.quartosOcupados = quartosOcupados;
            let menor = _.minBy(quartosOcupados, (q) => q.ocupacao);
            let qmo = quartosOcupados?.filter(q => q.ocupacao == menor?.ocupacao);
            if (qmo){
                this.quartoMaisVagoDaSemana = qmo!.length > 1 ? qmo.map(q => q.quarto).join(', ') : qmo[0].quarto;
            }
        }
    }

    atualizaDataHora() {
        this.dataHoraHoje = Date.now();
    }

    navegarPara(path: string) {
        this.router.navigate([path])
    }
}
