import { Injectable } from '@angular/core';
import { Droga } from '../entity/drogas';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mascota} from "../entity/mascotas";

@Injectable({
  providedIn: 'root'
})
export class DrogaService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Droga[]>{
    return this.http.get<Droga[]>('http://localhost:8090/drogas/all');
  }
}
