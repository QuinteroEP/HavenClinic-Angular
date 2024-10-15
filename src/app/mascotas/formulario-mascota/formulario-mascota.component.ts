import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../../entity/mascotas';
import { Router } from '@angular/router';
import {MascotaService} from "../../servicio/mascota.service";

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
    enTratamiento: false,
  }

  constructor(private router: Router, private mascotaService: MascotaService ) { }

  agregarMascota(): void {
    console.log('Agregando mascota:', this.formularioMascota);
    this.mascotaNueva = Object.assign({}, this.formularioMascota);

    this.mascotaService.addMascota(this.mascotaNueva.id, this.mascotaNueva).subscribe(
      (response) => {
        console.log('Mascota agregada con éxito', response);
        this.agregarMascotaEvent.emit(this.formularioMascota);
        this.router.navigate(['/Mascotas/all'], { queryParams: { userType: "veterinario" }});
      },
      (error) => {
        console.error('Error al agregar la mascota', error);
      }
    );
  }
}
