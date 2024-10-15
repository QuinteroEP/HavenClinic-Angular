import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veterinario } from '../veterinarios/veterinarios';
import {Cliente} from "../entity/clientes"; // Asegúrate de que la ruta es correcta

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private baseUrl = 'http://localhost:8090/veterinarios';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Veterinario[]> {
    console.log("Listando todos los veterinarios");
    return this.http.get<Veterinario[]>('http://localhost:8090/veterinarios/all');
  }

  
  findById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/find/${id}`);
  }

  findByCedula(cedula: number): Observable<Veterinario> {
    console.log("cedula:" + cedula)
    return this.http.get<Veterinario>('http://localhost:8090/veterinarios/findByCed/'+ cedula);
  }

  deleteByCedula(cedula: number){
    console.log(cedula);
    this.http.delete(`${this.baseUrl}/eliminarVeterinario/${cedula}`).subscribe();
    }

  addVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    console.log("Agregando veterinario:", veterinario);
    return this.http.post<Veterinario>('http://localhost:8090/veterinarios/agregarVeterinario', veterinario);
  }

  updateVeterinario(id: number, veterinario: Veterinario): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update/${id}`, veterinario);
  }

  findByEmail(correo:String): Observable<Cliente>{
    return this.http.get<Cliente>('http://localhost:8090/cliente/findEmail/' + encodeURIComponent(correo.toString()))
  }
}
