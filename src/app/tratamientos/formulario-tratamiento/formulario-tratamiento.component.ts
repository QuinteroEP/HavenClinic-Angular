import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tratamiento } from 'src/app/entity/tratamientos';
import { TratamientoService } from 'src/app/servicio/tratamiento.service';
import { MascotaService } from 'src/app/servicio/mascota.service';
import { DrogaService } from 'src/app/servicio/droga.service';
import { VeterinarioService } from 'src/app/servicio/veterinario.service';
import { Mascota } from '../../entity/mascotas';
import {Droga} from "../../entity/drogas";
import { Veterinario } from 'src/app/entity/veterinarios';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-formulario-tratamiento',
  templateUrl: './formulario-tratamiento.component.html',
  styleUrls: ['./formulario-tratamiento.component.css']
})
export class FormularioTratamientoComponent {
  @Output()
  agregarTratamientoEvent = new EventEmitter<Tratamiento>();

  tratamientoNuevo!: Tratamiento;
  drogas: Droga[] = [];
  vetInfo!: Veterinario;
  correo: string = '';
  petId: number = 0;

  formularioTratamiento: Tratamiento ={
    id: 0,
    fecha: new Date,
    mascota: {
      id: 0,
      nombre: '',
      edad: 0,
      raza: '',
      url: '',
      genero: '',
      condicion: '',
      descripcion: '',
      enTratamiento: false
    },
    veterinario: {
      vetId: 0,
      correo: '',
      cedula: 0,
      nombre: '',
      celular: 0,
      especialidad: '',
      contrasena: '',
      foto: '',
      numAtenciones: 0,
      activo: false
    },
    droga: {
      id: 0,
      nombre: '',
      precioVenta: 0,
      precioCompra: 0,
      unidadesDisponibles: 0,
      unidadesVendidas: 0
    }
  }

  constructor(private router: Router,
              private TratamientoService: TratamientoService,
              private MascotaService:MascotaService,
              private DrogaService:DrogaService,
              private VeterinarioService:VeterinarioService,
              private route: ActivatedRoute, ) { 
                this.route.queryParams.subscribe(params =>{
                this.correo = params['correo']})}


  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.petId = Number(param.get('id'));

      this.MascotaService.findById(this.petId).subscribe(
        (MascotaInfo) => {
          if(MascotaInfo.tratamiento){
            this.formularioTratamiento = MascotaInfo.tratamiento;
          }
        },
        (error) => {
          console.error('Error fetching Tratamiento info:', error);
        }
      );
    });

    this.DrogaService.findAll().subscribe(
      (listaDrogas) => {
        this.drogas = listaDrogas;
      },
      (error: any) => {
        console.error('Error fetching Droga info:', error);
      }
    );
  }

  agregarTratamiento(): void {
    console.log(this.correo); // imprimir correo
    this.tratamientoNuevo = Object.assign({}, this.formularioTratamiento);
    console.log("revision de formulario: ", this.tratamientoNuevo);

    let veterinarioInfo: any;
    let drogaInfo: any;
    let mascotaId: number;

    
    this.VeterinarioService.findByEmail(this.correo).subscribe(
      (vetInfo) => {
        this.tratamientoNuevo.veterinario.vetId = vetInfo.vetId;
      }
    )
    this.tratamientoNuevo = Object.assign({}, this.formularioTratamiento);
    

    this.TratamientoService.addTratamiento(this.petId, this.tratamientoNuevo).subscribe(
      (response) => {
        console.log('Tratamiento agregado', response);
        this.agregarTratamientoEvent.emit(this.formularioTratamiento);
        this.router.navigate(['/Mascotas/all'], { queryParams: { userType: "veterinario" }});
      },
      (error) => {
        console.error('Error al agregar el tratamiento', error);
      }
    )
  
/*
    this.VeterinarioService.findByEmail(this.correo).subscribe(
        (informacion) => {
            console.log("informacion del veterinario: ", informacion);
            veterinarioInfo = informacion;

            this.DrogaService.findByName(this.tratamientoNuevo.nombredroga).subscribe(
                (droga) => {
                    console.log("informacion de la droga: ", droga);
                    drogaInfo = droga;

                    this.route.paramMap.subscribe(param => {
                        mascotaId = Number(param.get('id'));

                        // Asignar valores una vez que todas las operaciones asíncronas han terminado
                        this.tratamientoNuevo.idVeterinario = veterinarioInfo.vetId;
                        this.tratamientoNuevo.idDroga = drogaInfo.id;
                        this.tratamientoNuevo.idMascota = mascotaId;

                        console.log('Agregando tratamiento:', this.tratamientoNuevo);

                        this.TratamientoService.addTratamiento(this.tratamientoNuevo.idMascota, this.tratamientoNuevo).subscribe(
                            (response) => {
                                console.log('Tratamiento agregado con éxito', response);
                                this.agregarTratamientoEvent.emit(this.formularioTratamiento);
                                this.router.navigate(['/Mascotas/all'], { queryParams: { userType: "veterinario", correo: this.correo } });
                            },
                            (error) => {
                                console.error('Error al agregar el tratamiento', error);
                            }
                        );
                    });
                },
                (error) => {
                    console.error('Error al obtener la información de la droga', error);
                }
            );
        },
        (error) => {
            console.error('Error al obtener la información del veterinario', error);
        }
    );*/
  }
}
