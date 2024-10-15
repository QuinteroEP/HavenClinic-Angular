import { Component, Input } from '@angular/core';
import { Mascota } from '../../entity/mascotas';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MascotaService } from 'src/app/servicio/mascota.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-informacion-mascota',
  templateUrl: './informacion-mascota.component.html',
  styleUrls: ['./informacion-mascota.component.css']
})
export class InformacionMascotaComponent {
  @Input()
  mascota!: Mascota;

  constructor(
    private MascotaService:MascotaService,
    private route: ActivatedRoute,
    private router: Router,
    
  ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.MascotaService.findById(id).subscribe(
        (MascotaInfo) => {
          this.mascota = MascotaInfo
          console.log("Foto: " + MascotaInfo.url);
          console.log(this.mascota)
        },
        (error) => {
          console.error('Error fetching Mascota info:', error);
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