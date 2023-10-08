import {Injectable} from '@angular/core';
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient} from "@angular/common/http";
import {QuartoModel} from "../models/quarto.model";

@Injectable({
    providedIn: 'root'
})
export class QuartoService extends BaseCRUDService<QuartoModel> {

    constructor(http: HttpClient) {
        super('/quartos', http);
    }
}
