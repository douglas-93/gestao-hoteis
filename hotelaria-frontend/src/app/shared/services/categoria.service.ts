import { Injectable } from '@angular/core';
import {BaseCRUDService} from "./base-crud.service";
import {CategoriaQuartoModel} from "../models/categoriaQuarto.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseCRUDService<CategoriaQuartoModel>{

  constructor(http: HttpClient) {
    super('/categorias', http);
  }
}
