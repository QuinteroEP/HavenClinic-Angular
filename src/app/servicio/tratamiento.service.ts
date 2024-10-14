import { Injectable } from '@angular/core';
import { Tratamiento } from '../entity/tratamientos';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  listaTratamientos: Tratamiento[] = [];

  constructor() { }

  findAll(){
    return this.listaTratamientos;
  }

  findById(id:number):Tratamiento{
    const tratamiento:Tratamiento = this.listaTratamientos.find(o => o.id === id)!;
    return tratamiento;
  }


}
