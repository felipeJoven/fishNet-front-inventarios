import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { SalidaAlimentos } from '../models/inv-salida-alimento'

@Injectable({
  providedIn: 'root'
})
export class InvSalidaAlimentosService {
  private apiUrl = 'http://localhost:8080/api/V1/salida-alimentos'

  constructor( private http: HttpClient) { }


  obtenerSalidaAlimentos(): Observable<SalidaAlimentos[]> {
    return this.http.get<SalidaAlimentos[]>(this.apiUrl);
  }

  obtenerSalidaAlimentosPorId(id: number): Observable<SalidaAlimentos> {
    return this.http.get<SalidaAlimentos>(this.apiUrl + `/${id}`);
  }

  addEditSalida(postData: any, selectL: any){
    
    if(!selectL){
      return this.http.post(this.apiUrl, postData);
    }else {
      return this.http.put(this.apiUrl + `/${selectL}`, postData);
    }
  }

  eliminarSalidaAlimentos(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
