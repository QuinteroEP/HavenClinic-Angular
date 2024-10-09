import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../entity/clientes';

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
    return this.http.get<Cliente>('http://localhost:8090/cliente/find/'+ cedula);
  }

  deleteByCedula(cedula:number){
    console.log(cedula);
    this.http.delete( 'http://localhost:8090/cliente/eliminarCliente/'+ cedula).subscribe();
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

  findByEmail(correo:String): Observable<Cliente>{
    return this.http.get<Cliente>('http://localhost:8090/cliente/findEmail/' + encodeURIComponent(correo.toString()))
    }
  }


