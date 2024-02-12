import {Injectable} from "@angular/core";
import {environment} from "../../../enviroment";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {map} from "rxjs";
import {RequestDTO} from "../dto/requestDTO";

@Injectable({
    providedIn: 'root'
})
export class RelatorioService {
    url: string = environment.BASE_URL;
    path: string = '/relatorio';

    constructor(private http: HttpClient) {
        this.url = this.url.concat(`${this.path}`);
    }

    gerarRelatorio(relatorio: string) {
        const params = new HttpParams()
            .set('relatorio', relatorio)

        return this.http.get(this.url, { params, observe: 'response', responseType: 'arraybuffer' })
            .pipe(map((response: HttpResponse<ArrayBuffer>) => {
                return new Blob([response.body!], { type: 'application/pdf' });
            }));
    }
    gerarRelatorioComFiltro(relatorio: string, requestDto: RequestDTO) {
        const params = new HttpParams()
            .set('relatorio', relatorio)

        return this.http.post(this.url, requestDto, { params, observe: 'response', responseType: 'arraybuffer' })
            .pipe(map((response: HttpResponse<ArrayBuffer>) => {
                return new Blob([response.body!], { type: 'application/pdf' });
            }));
    }
}
