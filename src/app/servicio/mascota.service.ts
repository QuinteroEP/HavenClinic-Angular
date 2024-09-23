import { Injectable } from '@angular/core';
import { Mascota } from '../mascotas/mascotas';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor() { }

  listaMascotas: Mascota[] = [
    {
      id: 1,
      nombre: "Moira",
      edad:  10,
      raza: "Labrador Negro",
      genero: "Hembra",
      condicion: "Displacia de cadera",
      descripcion: "Animal de edad mayor; su condicion le causa dolor en la pata trazera derecha",
      url: "/assets/images/pets/perroMoira.jpg"
    },

    {
      id: 2,
      nombre: "Bill",
      edad:  4,
      raza: "Criollo",
      genero: "Macho",
      condicion: "Fractura en la pata izquierda trasera",
      descripcion: "El animal callejero fue golpeado por un carro; presenta dificultad para caminar",
      url: "/assets/images/pets/perroBill.jpg",
    },

    {
      id: 3,
      nombre: "Trufa",
      edad:  8,
      raza: "Labrador Chocolate",
      genero: "Hembra",
      condicion: "En recuperacion de cesarea",
      descripcion: "El animal dio a luz a 4 cachorros labrador (3 chocolate, 1 negro - todos hembras) por medio de cesarea",
      url: "/assets/images/pets/perroTrufa.jpg",
    },

    {
      id: 4,
      nombre: "Suco",
      edad:  8,
      raza: "Gran Danes",
      genero: "Macho",
      condicion: "Artritis",
      descripcion: "Presenta dolor en la pata trazera izquierda",
      url: "/assets/images/pets/perroSuco.jpg",
    },

    {
      id: 5,
      nombre: "Napoleon",
      edad:  0,
      raza: "Chihuahua",
      genero: "Macho",
      condicion: "Recien Nacido",
      url: "/assets/images/pets/perroNapo.jpg",
    },

    {
      id: 6,
      nombre: "Belen",
      edad:  9,
      raza: "Labrador Negro",
      genero: "Hembra",
      condicion: "Ansiedad",
      url: "/assets/images/pets/perroBelen.jpg",
    },
  ];

  findAll(){
    return this.listaMascotas;
  }

  findById(id:number):Mascota{
    const mascota:Mascota = this.listaMascotas.find(o => o.id === id)!;
    return mascota;
  }
    addMascota(mascota: Mascota): void {
    this.listaMascotas.push(mascota);
  }
}
