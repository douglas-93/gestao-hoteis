import {Injectable} from '@angular/core';
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {QuartoModel} from "../models/quarto.model";
import {Observable} from "rxjs";
import _ from "lodash";
import {ImagemQuartoModel} from "../models/imagemQuarto.model";

@Injectable({
    providedIn: 'root'
})
export class QuartoService extends BaseCRUDService<QuartoModel> {

    constructor(http: HttpClient) {
        super('/quartos', http);
    }


    create(entity: QuartoModel, imagens: (ImagemQuartoModel | null)[]): Observable<HttpResponse<any>> {
        return this.http.post(this.url, this.createForm(entity, imagens), {observe: 'response'});
    }


    updateQuarto(id: number, entity: QuartoModel, imagens: (ImagemQuartoModel | null)[], imagensExcluidas: (number | undefined)[]): Observable<HttpResponse<any>> {
        return this.http.put(`${this.url}/${id}`, this.createForm(entity, imagens, imagensExcluidas), {observe: 'response'});
    }

    createForm(entity: QuartoModel, imagens: any, imagensExcluidas: (number | undefined)[] = []) {

        const form = new FormData();

        form.append("nome", entity.nome);
        form.append("ativo", entity.ativo.toString());
        form.append("capacidadePessoas", entity.capacidadePessoas.toString());
        form.append("valorDiaria", entity.valorDiaria.toString());
        form.append("tipoQuarto", entity.tipoQuarto.id.toString());
        form.append("categoriaQuarto", entity.categoriaQuarto.id.toString());
        form.append("itens", entity.itens.toString());

        if (!_.isNil(imagensExcluidas)) {
            form.append("imagensExcluidas", imagensExcluidas.toString());
        }

        console.log(imagens)

        if (!_.isNil(imagens)) {
            imagens.forEach((imagem) => {
                form.append(`imagens`, imagem.arquivo, imagem.nome);
            });
        }

        return form;
    }
}
