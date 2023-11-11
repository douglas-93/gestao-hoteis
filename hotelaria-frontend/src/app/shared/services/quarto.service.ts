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


    override save(entity: QuartoModel): Observable<HttpResponse<any>> {

        const form = new FormData();

        form.append("imagens", JSON.stringify(entity.imagem));
        form.append("nome", JSON.stringify(entity.nome));
        form.append("ativo", JSON.stringify(entity.ativo));
        form.append("capacidadePessoas", JSON.stringify(entity.capacidadePessoas));
        form.append("valorDiaria", JSON.stringify(entity.valorDiaria));
        form.append("tipoQuarto", JSON.stringify(entity.tipoQuarto));
        form.append("categoriaQuarto", JSON.stringify(entity.categoriaQuarto));
        form.append("itens", JSON.stringify(entity.itens));

        return this.http.post(this.url, form, {observe: 'response'});
    }

    fileToBlob(file: File): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.result instanceof ArrayBuffer) {
                    const blob = new Blob([reader.result], { type: file.type });
                    resolve(blob);
                } else {
                    reject(new Error('Failed to convert File to Blob'));
                }
            };

            reader.onerror = () => {
                reject(new Error('Error reading File'));
            };

            reader.readAsArrayBuffer(file);
        });
    }
}
