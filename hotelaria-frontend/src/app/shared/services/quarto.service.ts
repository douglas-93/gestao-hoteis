import {Injectable} from '@angular/core';
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {QuartoModel} from "../models/quarto.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class QuartoService extends BaseCRUDService<QuartoModel> {

    constructor(http: HttpClient) {
        super('/quartos', http);
    }


    override save(entity: QuartoModel): Observable<HttpResponse<QuartoModel>> {
        const formData M= new FormData();
        formData.append();
        return ;
    }
}
