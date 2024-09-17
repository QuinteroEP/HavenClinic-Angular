import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../mascotas';

@Component({
  selector: 'app-formulario-mascota',
  templateUrl: './formulario-mascota.component.html',
  styleUrls: ['./formulario-mascota.component.css']
})
export class FormularioMascotaComponent {
  @Output()
  agregarMascotaEvent = new EventEmitter<Mascota>();

  mascotaNueva!: Mascota;

  formularioMascota: Mascota ={
    id:0,
    nombre:"",
    edad:0,
    raza:"",
    url:"",
    genero:"",
    condicion:"",
    descripcion:"",
  }

  agregarMascota(){
    this.mascotaNueva = Object.assign({}, this.formularioMascota);

    this.agregarMascotaEvent.emit(this.formularioMascota);
  }
}
