import {Injectable} from "@angular/core";
import {BaseCRUDService} from "./base-crud.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ArquivoDIgitalModel} from "../models/ArquivoDIgitalModel";
import {HotelModel} from "../models/hotel.model";
import _ from "lodash";
import FormData from "form-data";

@Injectable({
    providedIn: 'root'
})
export class ArquivoDigitalService extends BaseCRUDService<ArquivoDIgitalModel> {

    constructor(http: HttpClient) {
        super('/arquivo-digital', http);
    }

    saveFile(file: File) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        return this.http.post<HotelModel>(`${this.url}`, this.createForm(file), {headers: headers, observe: 'response'});
    }

    createForm(file: File) {
        const form: FormData = new FormData();
        if (!_.isNil(file)) {
            form.append('arquivo', this.fileToBlob(file), file.name);
        }

        return form;
    }

    fileToBlob(file: File): Blob {
        return new Blob([file], {type: file.type});
    }
}
