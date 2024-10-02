import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../clientes/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:8090/cliente/all');

  }
  findById(cedula:number): Observable<Cliente>{
    return this.http.get<Cliente>('http://localhost:8090/find/'+ cedula);
  }

  deletebyId(cedula:number){
    console.log(cedula);
    this.http.delete( 'http://localhost:8090/eliminarCliente/'+ cedula).subscribe();
  }

  addCliente(id:number, cliente:Cliente){
    this.http.post('http://localhost:8090/cliente/agregarCliente'+ id, cliente)
    .subscribe(
      response => {
        console.log('Mascota actualizada con éxito', response);
      },
      error => {
        console.error('Error al actualizar la mascota', error);
      }
    );
  }



  }


