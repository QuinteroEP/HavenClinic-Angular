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
    constructor(private petService: MascotaService){}

    ngOnInit(): void{
      this.listaMascotas = this.petService.findAll();
    }

    //metodos

    mostrarMascota(mascota: Mascota){
      this.mascotaSelec = mascota;
    }

    onAgregarMascota(mascota: Mascota){
      this.listaMascotas.push(mascota);
      console.log('Mascota agregada:', mascota);
    }

    eliminarMascota(mascota: Mascota){
      var index = this.listaMascotas.indexOf(mascota);
      this.listaMascotas.splice(index, 1);
    }
}
