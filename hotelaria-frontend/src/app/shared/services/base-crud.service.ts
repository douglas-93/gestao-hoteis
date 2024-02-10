import {environment} from "../../../enviroment";
import {HttpClient} from "@angular/common/http";
import {GlobalOperator, RequestDTO} from "../dto/requestDTO";
import _ from "lodash";
import {Operation, SearchRequestDTO} from "../dto/searchRequestDTO";

export class BaseCRUDService<T> {

    url: string = environment.BASE_URL;
    requestDTO: RequestDTO;

    constructor(servicePath: string,
                protected http: HttpClient) {
        this.url = this.url.concat(`${servicePath}`)
    }

    findAll() {
        return this.http.get<T[]>(this.url, {observe: 'response'})
    }

    findById(id: number) {
        return this.http.get<T>(`${this.url}/${id}`, {observe: 'response'})
    }

    save(entity: T) {
        return this.http.post<T>(`${this.url}`, entity, {observe: 'response'})
    }

    update(id: number, entity: T) {
        return this.http.put<T>(`${this.url}/${id}`, entity, {observe: 'response'})
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`, {observe: 'response'})
    }

    specification(entity: RequestDTO) {
        return this.http.post<T[]>(`${this.url}/specification`, entity, {observe: 'response'})
    }

    specificationPaginated(entity: RequestDTO) {
        return this.http.post<T[]>(`${this.url}/specification/pagination`, entity, {observe: 'response'})
    }

    createSearchRequest(entity: T, globalOperator: GlobalOperator = GlobalOperator.AND) {
        this.requestDTO = new RequestDTO();
        this.requestDTO.globalOperator = globalOperator;
        this.requestDTO.searchRequestDTOS = [];

        // @ts-ignore
        Object.keys(entity).filter(key => !_.isNil(entity[key])).forEach(key => {
            const searchRequest: SearchRequestDTO = new SearchRequestDTO();
            searchRequest.columnName = key;
            searchRequest.value = entity[key];
            searchRequest.operation = Operation.LIKE;
            this.requestDTO.searchRequestDTOS.push(searchRequest);
        })

        return this.requestDTO;
    }
}
