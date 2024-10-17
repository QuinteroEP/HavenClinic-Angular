import { Injectable } from '@angular/core';
import { Tratamiento } from '../entity/tratamientos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Droga} from "../entity/drogas";
import {Mascota} from "../entity/mascotas";

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  listaTratamientos: Tratamiento[] = [];

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Tratamiento[]>{
    return this.http.get<Tratamiento[]>('http://localhost:8090/tratamientos/all');
  }

  findById(id:number):Observable<Tratamiento>{
    return this.http.get<Tratamiento>('http://localhost:8090/tratamientos/info/'+id);
  }

  findByPetId(id: number):Observable<Tratamiento>{
    return this.http.get<Tratamiento>('http://localhost:8090/tratamientos/mascota/'+id);
  }

  addTratamiento(mascotaId: number, tratamiento: Tratamiento): Observable<any> {
    return this.http.post('http://localhost:8090/tratamientos/add/'+mascotaId, tratamiento);
  }

  actualizarTratamiento(mascotaId: number, tratamiento: Tratamiento): Observable<any> {
    return this.http.put('http://localhost:8090/tratamientos/update/'+mascotaId, tratamiento);
  }

  getHistorial(id: number): Observable<Tratamiento[]>{
    return this.http.get<Tratamiento[]>('http://localhost:8090/tratamientos/historial/' +id)
  }
}
