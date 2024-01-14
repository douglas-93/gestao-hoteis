import {Injectable} from "@angular/core";
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient} from "@angular/common/http";
import {TransacaoModel} from "../models/transacaoModel";
import {ReservaModel} from "../models/reserva.model";

@Injectable({
    providedIn: 'root'
})
export class TransacaoService extends BaseCRUDService<TransacaoModel> {

    constructor(http: HttpClient) {
        super('/transacao', http);
    }

    findByReserva(reserva: ReservaModel) {
        return this.http.post<TransacaoModel[]>(`${this.url}/transacao-por-reserva`, reserva, {observe: 'response'});
    }
}
