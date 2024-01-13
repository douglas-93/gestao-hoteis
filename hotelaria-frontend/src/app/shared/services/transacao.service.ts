import {Injectable} from "@angular/core";
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient} from "@angular/common/http";
import {TransacaoModel} from "../models/transacaoModel";

@Injectable({
    providedIn: 'root'
})
export class TransacaoService extends BaseCRUDService<TransacaoModel> {

    constructor(http: HttpClient) {
        super('/transacao', http);
    }
}
