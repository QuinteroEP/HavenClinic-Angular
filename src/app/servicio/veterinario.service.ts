//veterinario.service
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {Cliente} from "../entity/clientes"; // Asegúrate de que la ruta es correcta
import { Veterinario } from '../entity/veterinarios';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private baseUrl = 'http://localhost:8090/veterinarios';

  constructor(
    private http: HttpClient
  ) { }

  //para mostrar todos los veterinarios
  findAll(): Observable<Veterinario[]> {
    console.log("Listando todos los veterinarios");
    return this.http.get<Veterinario[]>('http://localhost:8090/veterinarios/all');
  }

  //para buscar por el id
  findById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/find/${id}`);
  }
   //buscar a partir del email
   findByEmail(correo:String): Observable<Veterinario>{
    return this.http.get<Veterinario>('http://localhost:8090/veterinarios/findEmail/' + encodeURIComponent(correo.toString()))
  }
  //busca los veterinarios que tengna dicho nombre
  findByNombre(nombre: string): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>('http://localhost:8090/veterinarios/findByNombre/'+nombre);
  }

  //para buscar por la cedula, se usa este
  findByCedula(cedula: number): Observable<Veterinario> {
    console.log("cedula:" + cedula)
    return this.http.get<Veterinario>('http://localhost:8090/veterinarios/findByCedula/'+ cedula);
  }

  //para borrar por la cedula
  deleteByCedula(cedula: number){
    console.log(cedula);
    this.http.delete('http://localhost:8090/eliminarVeterinario/'+cedula).subscribe();
    }

    //En lugar de borrar directamente al veterinario solo cambia su estado a desactivado:
    cambiarEstado(veterinario: Veterinario): Observable<void> {
      console.log(veterinario);
      return this.http.put<void>('http://localhost:8090/veterinarios/cambiarestado/'+veterinario.cedula, veterinario);

    }

    //para agregar un nuevo veterinario
  addVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    console.log("Agregando veterinario:", veterinario);
    return this.http.post<Veterinario>('http://localhost:8090/veterinarios/agregarVeterinario', veterinario);
  }

  //actualiza al veterinario
  updateVeterinario(veterinario: Veterinario): Observable<void> {
    return this.http.put<void>('http://localhost:8090/veterinarios/update/'+veterinario.cedula, veterinario);
  }

 
}