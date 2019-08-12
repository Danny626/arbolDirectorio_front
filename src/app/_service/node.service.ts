import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Folder, Nodo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  url = `${environment.apiUrl}/directorio`;

  constructor(private http: HttpClient) {}

  // getFiles() {
  //   return this.http.get<any>(`${this.url}/listarFullDirectorios`);
  // }

  // getFiles() {
  //   return this.http.get<any>('assets/data/dataXjson.json');
  // }

  getFiles() {
    return this.http.get<Nodo>(`${this.url}/obtenerJson`);
  }

  createJsonFile() {
    return this.http.get(`${this.url}/listarFullDirectorios`);
  }

  getDirectories() {
    return this.http.get<any>('C:/jsonFolders.json');
  }

  getLazyFolders(data: Folder) {
    return this.http.post<any>(`${this.url}/listarDirectorios`, data);
  }

  getLazyFiles(data: Folder) {
    return this.http.post<any>(`${this.url}/listarArchivos`, data);
  }

  getFileByte(urlArchivo: string) {
    return this.http.post(`${this.url}/verArchivo`, urlArchivo, {
      responseType: 'blob'
    });
  }
}
