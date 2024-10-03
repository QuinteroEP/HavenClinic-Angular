import { Injectable } from '@angular/core';
import { Mascota } from '../entity/mascotas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(
    private http: HttpClient
  ) { }


  findAll(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>('http://localhost:8090/mascotas/vetmascota');
  }

  findById(id:number):Observable<Mascota>{
    return this.http.get<Mascota>('http://localhost:8090/mascotas/mascotascliente/'+id);
  }
  deletebyId(id:number){
    console.log(id);
    this.http.delete( 'http://localhost:8090/delete/'+id).subscribe();
  }
  addMascota(id: number, mascota: Mascota): Observable<any> {
    return this.http.post('http://localhost:8090/actualizar_mascota/' + id, mascota);
  }

  findByDueñoId(id: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>('http://localhost:8090/mascotas/mis_mascotas/' +id);
  }
}
