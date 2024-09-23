import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../mascotas';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  agregarMascota(){
    this.agregarMascotaEvent.emit(this.formularioMascota);
    this.router.navigate(['/Mascotas']);

  }
}
