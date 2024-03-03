import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseCRUDService} from "./base-crud.service";
import {ConfiguracaoModel} from "../models/configuracao.model";

@Injectable({
    providedIn: 'root'
})
export class ConfiguracaoService extends BaseCRUDService<ConfiguracaoModel>{
    constructor(http: HttpClient) {
        super('/configuracao', http);
    }
}
