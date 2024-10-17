//formulario-veterinario.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from 'src/app/entity/veterinarios';
import { VeterinarioService } from 'src/app/servicio/veterinario.service';

@Component({
  selector: 'app-formulario-veterinario',
  templateUrl: './formulario-veterinario.component.html',
  styleUrls: ['./formulario-veterinario.component.css']
})
export class FormularioVeterinarioComponent {
  @Output()
  agregarVeterinarioEvent = new EventEmitter<Veterinario>();

  veterinarioNueva!:Veterinario;

  formularioVeterinario: Veterinario = {
    vetId: 0,
    nombre: '',
    especialidad: '',
    correo: '',
    cedula: 0,
    celular: 0,
    contrasena: '',
    foto: '',
    numAtenciones: 0,
    activo: true
  }

  constructor(private router:Router, private veterinarioService:VeterinarioService){}

  //para agregar una veterinario
  agregarVeterinario():void{

    console.log('Agregando veterinario:', this.formularioVeterinario);
    this.veterinarioNueva = Object.assign({}, this.formularioVeterinario);
    this.veterinarioService.addVeterinario(this.veterinarioNueva).subscribe(
      (response) => {
        console.log('Veterinario agregado con exito', response);
        this.agregarVeterinarioEvent.emit(this.formularioVeterinario);
        this.router.navigate(['/admin/veterinario/all'], { queryParams: { userType: "admin" } });
      },
      (error) => {
        console.error('Error al agregar el veterinario', error);
      }
    );
  }

}
