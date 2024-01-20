import {Component} from '@angular/core';
import {HotelService} from "../../shared/services/hotel.service";
import {HotelModel} from "../../shared/models/hotel.model";
import {ArquivoDIgitalModel} from "../../shared/models/ArquivoDIgitalModel";
import {ArquivoDigitalService} from "../../shared/services/arquivoDigitalService";
import {lastValueFrom} from "rxjs";

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {

    hotel: HotelModel;
    arquivoDigital: ArquivoDIgitalModel;
    dataHoraHoje: number;
    isCalculadoraVisible: boolean = false;

    constructor(private hotelService: HotelService,
                private arquivoDigitalService: ArquivoDigitalService) {
        this.dataHoraHoje = Date.now();
    }

    async ngOnInit() {
        this.hotel = new HotelModel();
        setInterval(() => this.atualizaDataHora(), 1000);
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

    atualizaDataHora() {
        this.dataHoraHoje = Date.now();
    }
}
