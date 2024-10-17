import { Component } from '@angular/core';
import { Mascota } from '../../entity/mascotas';
import { MascotaService } from 'src/app/servicio/mascota.service';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';

@Component({
  selector: 'app-tabla-mascota',
  templateUrl: './tabla-mascota.component.html',
  styleUrls: ['./tabla-mascota.component.css']
})
export class TablaMascotaComponent {
  id: number = 0;
  mascotaSelec!: Mascota;
  listaMascotas!: Mascota[];
  userType: string = ' ';
  correo: string = '';

  //injecciones
  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService){ this.route.queryParams.subscribe(params =>{
      this.id = params['id'],
      this.userType = params['userType'],
      this.correo = params['correo']})
    }

    ngOnInit(): void{
      if(this.userType === 'cliente'){
        this.mascotaService.findByDueñoId(this.id).subscribe(
          (mascotas) => {
            this.listaMascotas = mascotas;
          })
      }
      else if(this.userType === 'veterinario'){
        this.mascotaService.findAll().subscribe(
          (mascotas) => {
            this.listaMascotas = mascotas;
          })
      }
    }

    //metodos
    mostrarMascota(mascota: Mascota){
      this.mascotaSelec = mascota;
    }

    onAgregarMascota(mascota: Mascota){
      this.listaMascotas.push(mascota);
      this.mascotaService.addMascota(mascota.id, mascota);
    }

    eliminarMascota(mascota: Mascota){
      var index = this.listaMascotas.indexOf(mascota);
      this.listaMascotas.splice(index, 1);
      console.log("Id mascota eliminada: " + mascota.id);
      this.mascotaService.deleteById(mascota.id);
    }
}
