import {Injectable} from "@angular/core";
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient} from "@angular/common/http";
import {ProdutoModel} from "../models/ProdutoModel";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService extends BaseCRUDService<ProdutoModel> {

    constructor(http: HttpClient) {
        super('/produtos', http);
    }
}
