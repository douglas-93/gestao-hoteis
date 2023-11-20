import {Injectable} from '@angular/core';
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {QuartoModel} from "../models/quarto.model";
import {Observable} from "rxjs";
import _ from "lodash";

@Injectable({
    providedIn: 'root'
})
export class QuartoService extends BaseCRUDService<QuartoModel> {

    constructor(http: HttpClient) {
        super('/quartos', http);
    }


    // @ts-ignore
    override save(entity: QuartoModel, imagens: any, imagensExcluidas: (number | undefined)[] = []): Observable<HttpResponse<any>> {

        const form = this.createForm(entity, imagens, imagensExcluidas);

        return this.http.post(this.url, form, {observe: 'response'});
    }


    // @ts-ignore
    override update(id: number, entity: QuartoModel, imagens: any, imagensExcluidas?: (number | undefined)[] = []): Observable<HttpResponse<any>> {

        const form = this.createForm(entity, imagens, imagensExcluidas);

        return this.http.put(`${this.url}/${id}`, form, {observe: 'response'});
    }

    createForm(entity: QuartoModel, imagens: any, imagensExcluidas: (number | undefined)[]) {
        // @ts-ignore
        const form = new FormData();

        form.append("nome", entity.nome);
        form.append("ativo", JSON.stringify(entity.ativo));
        form.append("capacidadePessoas", JSON.stringify(entity.capacidadePessoas));
        form.append("valorDiaria", JSON.stringify(entity.valorDiaria));
        form.append("tipoQuarto", entity.tipoQuarto.id.toString());
        form.append("categoriaQuarto", entity.categoriaQuarto.id.toString());
        form.append("itens", JSON.stringify(entity.itens));
        if (!_.isNil(imagensExcluidas)) {
            form.append("imagensExcluidas", JSON.stringify(imagensExcluidas));
        }


        imagens.forEach((imagem) => {
            form.append(`imagens`, imagem.arquivo, imagem.arquivo.name);
        });

        return form;
    }
}
