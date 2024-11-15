import { Component, Input } from '@angular/core';
import { Mascota } from '../../entity/mascotas';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MascotaService } from 'src/app/servicio/mascota.service';
import { forkJoin, map, mergeMap, switchMap } from 'rxjs';
import { Tratamiento } from 'src/app/entity/tratamientos';
import { merge } from 'jquery';
import { TratamientoService } from 'src/app/servicio/tratamiento.service';
import { DrogaService } from 'src/app/servicio/droga.service';
import { Droga } from 'src/app/entity/drogas';

@Component({
  selector: 'app-informacion-mascota',
  templateUrl: './informacion-mascota.component.html',
  styleUrls: ['./informacion-mascota.component.css']
})
export class InformacionMascotaComponent {
  @Input()
  mascota!: Mascota;
  userType: string = ' ';
  correo: string = '';

  historial: Tratamiento[] | undefined;
  drogas: Droga[] | undefined;
  nombreDrogas: string[] = [];
  fotoUrl: string = '';

  constructor(
    private MascotaService:MascotaService,
    private TratamientoService:TratamientoService,
    private DrogaService:DrogaService,
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
        switchMap((mascota) => {
          this.mascota = mascota;
          this.fotoUrl = "http://localhost:8090" + mascota.url
          console.log("Foto:" + this.fotoUrl)
    
          return this.TratamientoService.getHistorial(mascota.id);
        }),
        switchMap((historial: Tratamiento[]) => {
          this.historial = historial;

          const drogaObservables = historial.map((tratamiento) =>
            this.TratamientoService.getDroga(tratamiento.id)
          );
          return forkJoin(drogaObservables).pipe(
            map((drogas: Droga[]) => {
              this.nombreDrogas = drogas.map(droga => droga.nombre);
            })
          );
        })
      ).subscribe({
        next: () => {
          console.log('Historial:', this.historial);
          console.log('Drug Names:', this.nombreDrogas);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
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
}