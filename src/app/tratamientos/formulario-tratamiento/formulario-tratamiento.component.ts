import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tratamiento } from 'src/app/entity/tratamientos';
import { TratamientoService } from 'src/app/servicio/tratamiento.service';
import { MascotaService } from 'src/app/servicio/mascota.service';
import { Mascota } from '../../entity/mascotas';

@Component({
  selector: 'app-formulario-tratamiento',
  templateUrl: './formulario-tratamiento.component.html',
  styleUrls: ['./formulario-tratamiento.component.css']
})
export class FormularioTratamientoComponent {
  @Output()
  agregarTratamientoEvent = new EventEmitter<Tratamiento>();

  tratamientoNuevo!: Tratamiento;

  formularioTratamiento: Tratamiento ={
    id: 0,
    fecha: new Date,
    idVeterinario: 0,
    idMascota: 0,
    idDroga: 0,
    nombreDroga: ''
  }

  constructor(private router: Router, 
              private TratamientoService: TratamientoService,
              private MascotaService:MascotaService,
              private route: ActivatedRoute, ) { }
              

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.MascotaService.findById(id).subscribe(
        (MascotaInfo) => {
          this.formularioTratamiento = MascotaInfo.tratamiento ?? {} as Tratamiento;
        },
        (error) => {
          console.error('Error fetching Tratamiento info:', error);
        }
      );
    });
  }

  agregarTratamiento(): void {
    console.log('Agregando tratamiento:', this.formularioTratamiento);
    this.tratamientoNuevo = Object.assign({}, this.formularioTratamiento);

    this.TratamientoService.addTratamiento(this.tratamientoNuevo.id, this.tratamientoNuevo).subscribe(
      (response) => {
        console.log('Tratamiento agregado con éxito', response);
        this.agregarTratamientoEvent.emit(this.formularioTratamiento);
        this.router.navigate(['/Mascotas/all'], { queryParams: { userType: "veterinario" }});
      },
      (error) => {
        console.error('Error al agregar el tratamiento', error);
      }
    );
  }
}
