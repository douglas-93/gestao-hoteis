import { Injectable } from '@angular/core';
import {BaseCRUDService} from "./base-crud.service";
import {TipoQuartoModel} from "../models/tipoQuarto.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TipoService extends BaseCRUDService<TipoQuartoModel>{

  constructor(http: HttpClient) {
    super('/tipos', http);
  }
}
