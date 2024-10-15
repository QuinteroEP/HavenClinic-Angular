import { Tratamiento } from "./tratamientos";

export interface Mascota{
    id:number;
    nombre:string;
    edad:number;
    raza:string;
    url?:string;
    genero:string;
    condicion:string;
    descripcion?:string;
    enTratamiento?:boolean;
    tratamiento?: Tratamiento;
}