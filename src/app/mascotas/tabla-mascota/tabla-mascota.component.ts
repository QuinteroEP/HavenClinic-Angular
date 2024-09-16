import { Component } from '@angular/core';
import { Mascota } from '../mascotas';

@Component({
  selector: 'app-tabla-mascota',
  templateUrl: './tabla-mascota.component.html',
  styleUrls: ['./tabla-mascota.component.css']
})
export class TablaMascotaComponent {
  mascotaSelec!: Mascota;

  listaMascotas: Mascota[] = [
    {
      nombre: "Moira",
      edad:  10,
      raza: "Labrador Negro",
      genero: "Hembra",
      condicion: "Displacia de cadera",
      descripcion: "Animal de edad mayor; su condicion le causa dolor en la pata trazera derecha",
    },
    
    {
      nombre: "Bill",
      edad:  4,
      raza: "Criollo",
      genero: "Macho",
      condicion: "Fractura en la pata izquierda trasera",
      descripcion: "El animal callejero fue golpeado por un carro; presenta dificultad para caminar",
    },

    {
      nombre: "Trufa",
      edad:  8,
      raza: "Labrador Chocolate",
      genero: "Hembra",
      condicion: "En recuperacion de cesarea",
      descripcion: "El animal dio a luz a 4 cachorros labrador (3 chocolate, 1 negro - todos hembras) por medio de cesarea",
    },

    {
      nombre: "Suco",
      edad:  8,
      raza: "Gran Danes",
      genero: "Macho",
      condicion: "Artritis",
      descripcion: "Presenta dolor en la pata trazera izquierda",
    },

    {
      nombre: "Napoleon",
      edad:  0,
      raza: "Chihuahua",
      genero: "Macho",
      condicion: "Recien Nacido",
    },

    {
      nombre: "Belen",
      edad:  9,
      raza: "Labrador Negro",
      genero: "Hembra",
      condicion: "Ansiedad",
    },
  ];

    //metodos

    mostrarMascota(mascota: Mascota){
      this.mascotaSelec = mascota;
    }

    agregarMascota(mascota: Mascota){
      this.listaMascotas.push(mascota);
    }
}
