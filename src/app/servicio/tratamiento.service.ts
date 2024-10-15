import { Injectable } from '@angular/core';
import { Tratamiento } from '../entity/tratamientos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  listaTratamientos: Tratamiento[] = [];

  constructor(
    private http: HttpClient
  ) { }

  findAll(){
    return this.listaTratamientos;
  }

  findById(id:number):Tratamiento{
    const tratamiento:Tratamiento = this.listaTratamientos.find(o => o.id === id)!;
    return tratamiento;
  }

  addTratamiento(id: number, tratamiento: Tratamiento): Observable<any> {
    return this.http.post('http://localhost:8090/tratamientos/add/'+id, tratamiento);
  }
}
