import {Injectable} from "@angular/core";
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient} from "@angular/common/http";
import {ReservaModel} from "../models/reserva.model";

@Injectable({
    providedIn: 'root'
})
export class ReservaService extends BaseCRUDService<ReservaModel> {

    constructor(http: HttpClient) {
        super('/reservas', http);
    }

    verificaDisponibilidade(reserva: ReservaModel) {
        return this.http.post(`${this.url}/v`, reserva, {observe: 'response'});
    }
}
