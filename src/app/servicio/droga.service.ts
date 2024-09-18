import { Injectable } from '@angular/core';
import { Droga } from '../drogas/drogas';

@Injectable({
  providedIn: 'root'
})
export class DrogaService {

  listaDrogas: Droga[] = [];

  constructor() { }

  findAll(){
    return this.listaDrogas;
  }

  findById(id:number):Droga{
    const droga:Droga = this.listaDrogas.find(o => o.id === id)!;
    return droga;
  }
}
