import {Injectable} from "@angular/core";
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ReservaModel} from "../models/reserva.model";

@Injectable({
    providedIn: 'root'
})
export class ReservaService extends BaseCRUDService<ReservaModel> {

    constructor(http: HttpClient) {
        super('/reservas', http);
    }

    checkIn(reserva: ReservaModel) {
        return this.http.post<ReservaModel>(`${this.url}/checkIn`, reserva, {observe: 'response'});
    }

    cancelar(reserva: ReservaModel) {
        return this.http.post<ReservaModel>(`${this.url}/cancelar`, reserva, {observe: 'response'});
    }

    verificaDisponibilidade(reserva: ReservaModel) {
        return this.http.post<ReservaModel[]>(`${this.url}/v`, reserva, {observe: 'response'});
    }

    buscarReservasPorPeriodo(dataEntrada1: string, dataEntrada2: string, dataPrevistaSaida1: string, dataPrevistaSaida2: string) {
        const params = new HttpParams()
            .set('dataEntrada1', dataEntrada1)
            .set('dataEntrada2', dataEntrada2)
            .set('dataPrevistaSaida1', dataPrevistaSaida1)
            .set('dataPrevistaSaida2', dataPrevistaSaida2);

        return this.http.get<ReservaModel[]>(`${this.url}/reserva-ativa-periodo`, {params, observe: 'response'});
    }

    buscarReservasPorPeriodoComCheckIn(dataEntrada1: string, dataEntrada2: string, dataPrevistaSaida1: string, dataPrevistaSaida2: string) {
        const params = new HttpParams()
            .set('dataEntrada1', dataEntrada1)
            .set('dataEntrada2', dataEntrada2)
            .set('dataPrevistaSaida1', dataPrevistaSaida1)
            .set('dataPrevistaSaida2', dataPrevistaSaida2);

        return this.http.get<ReservaModel[]>(`${this.url}/reserva-ativa-periodo-checkIn`, {
            params
          , observe: 'response'
        });
    }

    buscaReservasSemCheckOut() {
        return this.http.get<ReservaModel[]>(`${this.url}/reservas-sem-checkOut`, {observe: 'response'});
    }
}
