import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../entity/clientes';
import { User } from '../entity/user';

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
  findByCedula(cedula:number): Observable<Cliente>{
    return this.http.get<Cliente>('http://localhost:8090/cliente/find/'+ cedula);
  }

  findByEmail(correo:String): Observable<Cliente>{
    return this.http.get<Cliente>('http://localhost:8090/cliente/findEmail/' + correo.toString());
    }

    //para buscar todos los clientes con dicho nombre
    findByNombre(nombre: string): Observable<Cliente[]> {
      return this.http.get<Cliente[]>('http://localhost:8090/cliente/findClienteByNombre/'+nombre);
    }

  deleteByCedula(cedula:number){
    console.log(cedula);
    this.http.delete( 'http://localhost:8090/cliente/eliminarCliente/'+ cedula).subscribe();
  }

  //para agregar un nuevo cliente
  addCliente(cliente:Cliente): Observable<Cliente>{
    console.log("Agregando cliente: ",cliente);
   return this.http.post<Cliente>('http://localhost:8090/cliente/agregarCliente', cliente)
 
  }



    actualizarCliente(id: number, clienteAct: Cliente):Observable<Cliente>{
      return this.http.put<Cliente>('http://localhost:8090/cliente/update/' + id, clienteAct);
    }

    login(user: User, userType: string): Observable<string> {
      console.log(user);
      console.log(userType);
  
      const body = {
        email: user.correo,
        psw: user.password,
        userType: userType
       
      };
  console.log(body);
      return this.http.post('http://localhost:8090/login', body, { responseType: 'text' });
    }

    logout(): void {
      localStorage.removeItem('token');
    }
  

    ClienteHome(): Observable<Cliente>{
      return this.http.get<Cliente>('http://localhost:8090/cliente/details');
    }

  }


