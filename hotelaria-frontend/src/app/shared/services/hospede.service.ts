import {Injectable} from '@angular/core';
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient} from "@angular/common/http";
import {HospedeModel} from "../models/hospede.model";

@Injectable({
    providedIn: 'root'
})
export class HospedeService extends BaseCRUDService<HospedeModel> {

    constructor(http: HttpClient) {
        super('/hospedes', http);
    }
}
