import { Component, Input } from '@angular/core';
import { Mascota } from '../../entity/mascotas';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MascotaService } from 'src/app/servicio/mascota.service';
import { mergeMap } from 'rxjs';
import { Tratamiento } from 'src/app/entity/tratamientos';
import { merge } from 'jquery';
import { TratamientoService } from 'src/app/servicio/tratamiento.service';

@Component({
  selector: 'app-informacion-mascota',
  templateUrl: './informacion-mascota.component.html',
  styleUrls: ['./informacion-mascota.component.css']
})
export class InformacionMascotaComponent {
  @Input()
  mascota!: Mascota;
  userType: string = ' ';
  historial: Tratamiento[] | undefined;
  correo: string = '';

  constructor(
    private MascotaService:MascotaService,
    private TratamientoService:TratamientoService,
    private route: ActivatedRoute,
    private router: Router,
    
  ){ this.route.queryParams.subscribe(params =>{
    this.userType = params['userType'],
    this.correo = params['correo']})
  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.MascotaService.findById(id).pipe(
        mergeMap(
          (mascotaInfo) => {
            this.mascota = mascotaInfo;
            return this.TratamientoService.getHistorial(this.mascota.id)
          }
        )
      ).subscribe(
        (history) => {
          this.historial = history
        }
      );
    });
  }

  administrarTratamiento(mascota: Mascota){
    this.MascotaService.switchTratamiento(mascota.id).subscribe(
      (updatedMascota: Mascota) => {
          mascota.enTratamiento = updatedMascota.enTratamiento;
      },
      (error) => {
          console.error('Error updating Mascota:', error);
      }
    );
  }

  modificarTratamiento(mascota: Mascota){
    console.log("Modificar")
  }

  generarTratamiento(mascota: Mascota){
    console.log("Generar")
  }
}