import {Injectable} from '@angular/core';
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient} from "@angular/common/http";
import {HotelModel} from "../models/hotel.model";

@Injectable({
    providedIn: 'root'
})
export class HotelService extends BaseCRUDService<HotelModel> {

    constructor(http: HttpClient) {
        super('/hotel', http);
    }

    findLastId() {
        return this.http.get<number>(`${this.url}/lastId`, {observe: 'response'});
    }
}
