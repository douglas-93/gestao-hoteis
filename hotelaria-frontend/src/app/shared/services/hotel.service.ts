import {Injectable} from '@angular/core';
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HotelModel} from "../models/hotel.model";
import _ from "lodash";
import {ArquivoDIgitalModel} from "../models/ArquivoDIgitalModel";

@Injectable({
    providedIn: 'root'
})
export class HotelService extends BaseCRUDService<HotelModel> {

    constructor(http: HttpClient) {
        super('/hotel', http);
    }
}
