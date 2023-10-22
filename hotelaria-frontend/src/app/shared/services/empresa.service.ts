import {Injectable} from "@angular/core";
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient} from "@angular/common/http";
import {EmpresaModel} from "../models/empresa.model";

@Injectable({
    providedIn: 'root'
})
export class EmpresaService extends BaseCRUDService<EmpresaModel> {

    constructor(http: HttpClient) {
        super('/empresas', http);
    }
}
