import { Injectable } from '@angular/core';
import { Mascota } from '../entity/mascotas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../entity/tratamientos';

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
    return this.http.get<Mascota>('http://localhost:8090/mascotas/petInfo/'+id);
  }
  deleteById(id:number){
    console.log(id);
   this.http.delete('http://localhost:8090/mascotas/deletePet/'+id).subscribe();
  }
  addMascota(id: number, mascota: Mascota): Observable<any> {
    return this.http.post('http://localhost:8090/mascotas/addPet/'+ id, mascota);
  }

  findByDueñoId(id: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>('http://localhost:8090/mascotas/mascotascliente/' +id);
  }

  actualizar(MascotaAct: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>('http://localhost:8090/mascotas/actualizar_mascota/'+MascotaAct.id, MascotaAct);
  }

  switchTratamiento(id: number): Observable<Mascota>{
    return this.http.put<Mascota>('http://localhost:8090/tratamientos/alter/' +id, {});
  }

  findByNombre(nombre: string): Observable<Mascota[]> {
    return this.http.get<Mascota[]>('http://localhost:8090/mascotas/findByNombre/'+nombre);
  }

  getPacientes(id: number): Observable<Mascota[]>{
    return this.http.get<Mascota[]>('http://localhost:8090/mascotas/pacientes/'+id);
  }
}
