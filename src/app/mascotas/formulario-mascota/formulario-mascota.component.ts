import { Component, EventEmitter, Output } from '@angular/core';
import { Mascota } from '../../entity/mascotas';
import { ActivatedRoute, Router } from '@angular/router';
import {MascotaService} from "../../servicio/mascota.service";
import {VeterinarioService} from "../../servicio/veterinario.service";
import { Veterinario } from 'src/app/entity/veterinarios';

@Component({
  selector: 'app-formulario-mascota',
  templateUrl: './formulario-mascota.component.html',
  styleUrls: ['./formulario-mascota.component.css']
})
export class FormularioMascotaComponent {
  @Output()
  agregarMascotaEvent = new EventEmitter<Mascota>();

  mascotaNueva!: Mascota;
  vetInfo!: Veterinario;
  correo: string = '';

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
    cedulaDueno: 0,
  }

  constructor(
    private router: Router, 
    private mascotaService: MascotaService, 
    private VeterinarioService: VeterinarioService,
    private route: ActivatedRoute, ) { 
      this.route.queryParams.subscribe(params =>{
      this.correo = params['correo']}
    )}
    
  agregarMascota(): void {
    console.log('Agregando mascota:', this.formularioMascota);
    this.mascotaNueva = Object.assign({}, this.formularioMascota);
    const cedulaDueno = this.mascotaNueva.cedulaDueno ?? 0; // Provide a default value if undefined

    this.mascotaService.addMascota(cedulaDueno, this.mascotaNueva).subscribe(
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
