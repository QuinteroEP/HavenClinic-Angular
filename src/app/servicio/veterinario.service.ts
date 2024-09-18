import { Injectable } from '@angular/core';
import { Veterinario } from '../veterinarios/veterinarios';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  listaVeterinarios: Veterinario[] = [];

  constructor() { }

  findAll(){
    return this.listaVeterinarios;
  }

  findById(id:number):Veterinario{
    const veterinario:Veterinario = this.listaVeterinarios.find(o => o.id === id)!;
    return veterinario;
  }
}
