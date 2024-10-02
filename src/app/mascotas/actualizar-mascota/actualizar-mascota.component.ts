import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/servicio/mascota.service';
import { Mascota } from '../mascotas';

@Component({
  selector: 'app-actualizar-mascota',
  templateUrl: './actualizar-mascota.component.html',
  styleUrls: ['./actualizar-mascota.component.css']
})
export class ActualizarMascotaComponent {
  informacionParaActualizar: Mascota = {
    id: 0,
    nombre: '',
    edad: 0,
    raza: '',
    genero: '',
    condicion: '',
    descripcion: ''
  };

  constructor(
    private MascotaService:MascotaService,
    private route: ActivatedRoute,
    private router: Router){}

    ngOnInit(): void {
      this.route.paramMap.subscribe(param => {
        const id = Number(param.get('id'));
        this.MascotaService.findById(id).subscribe(
          (MascotaInfo) => {
            this.informacionParaActualizar = MascotaInfo;
          },
          (error) => {
            console.error('Error fetching Mascota info:', error);
          }
        );
      });
    }
  

  actualizarMascota(){
    this.router.navigate(['/Mascotas']);
  }

}
