import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veterinario } from '../entity/veterinarios';
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
    return this.http.get<Veterinario[]>(`${this.baseUrl}/all`);
  }

  findById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/find/${id}`);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>('${this.baseUrl}/delete/${id}');
  }

  addVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.baseUrl}/agregarVeterinario`, veterinario);
  }

  updateVeterinario(id: number, veterinario: Veterinario): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update/${id}`, veterinario);
  }

  findByEmail(correo:String): Observable<Cliente>{
    return this.http.get<Cliente>('http://localhost:8090/cliente/findEmail/' + encodeURIComponent(correo.toString()))
  }
}
