import {Injectable} from "@angular/core";
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient} from "@angular/common/http";
import {ImagemQuartoModel} from "../models/imagemQuarto.model";

@Injectable({
    providedIn: 'root'
})
export class ImagemQuartoService extends BaseCRUDService<ImagemQuartoModel> {

    constructor(http: HttpClient) {
        super('/imagem_quarto', http);
    }
}
