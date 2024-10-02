import { Component } from '@angular/core';
import { Mascota } from '../mascotas';
import { MascotaService } from 'src/app/servicio/mascota.service';

@Component({
  selector: 'app-tabla-mascota',
  templateUrl: './tabla-mascota.component.html',
  styleUrls: ['./tabla-mascota.component.css']
})
export class TablaMascotaComponent {
  mascotaSelec!: Mascota;
  listaMascotas!: Mascota[];

    //injecciones
    constructor(private mascotaService: MascotaService){}

    ngOnInit(): void{
      this.mascotaService.findAll().subscribe(
        (mascotas) => {
          this.listaMascotas = mascotas;
        })

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
      this.mascotaService.deletebyId(mascota.id); 
    }
}
