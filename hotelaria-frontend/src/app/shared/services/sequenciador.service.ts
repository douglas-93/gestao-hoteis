import {Injectable} from "@angular/core";
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SequenciadorService extends BaseCRUDService<number> {

    constructor(http: HttpClient) {
        super('/sequenciador', http);
    }

    public proximoNumero(atributo: string) {
        const params = new HttpParams()
            .set('atributo', atributo);

        return this.http.get<number>(`${this.url}/proximo`, {params, observe: 'response'});
    }
}
