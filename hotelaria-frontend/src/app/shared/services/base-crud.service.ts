import {environment} from "../../../enviroment";
import {HttpClient} from "@angular/common/http";

export abstract class BaseCRUDService<T> {

  url: string = environment.BASE_URL;

  constructor(servicePath: string,
              private http: HttpClient) {
    this.url = this.url.concat(`/${servicePath}`)
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

}
