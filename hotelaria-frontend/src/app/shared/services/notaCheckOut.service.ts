import {BaseCRUDService} from "./base-crud.service";
import {NotaCheckOutModel} from "../models/notaCheckOut.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class NotaCheckOutService extends BaseCRUDService<NotaCheckOutModel>{
    constructor(http: HttpClient) {
        super('/checkOut', http);
    }
}
