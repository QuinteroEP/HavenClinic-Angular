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
import { ChangeDetectorRef } from '@angular/core';

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
  correo: string = '';
  opcion: string = '';
  
  petId: number = 0;
  vetId: number = 0;
  drugId: number = 0;

  formularioTratamiento: Tratamiento ={
    id: 0,
    fecha: new Date
  }

  drogaNueva: string = '';

  constructor(private router: Router,
              private TratamientoService: TratamientoService,
              private MascotaService:MascotaService,
              private DrogaService:DrogaService,
              private VeterinarioService:VeterinarioService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef ) { 
                this.route.queryParams.subscribe(params =>{
                this.correo = params['correo']})}


  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.petId = Number(param.get('id'));

      this.TratamientoService.findByPetId(this.petId).subscribe(
        (tratamientoInfo) => {
            this.formularioTratamiento = tratamientoInfo;
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

    forkJoin({
      vetInfo: this.VeterinarioService.findByEmail(this.correo),
      droga: this.DrogaService.findByName(this.drogaNueva)
    }).subscribe({
      next: ({ vetInfo, droga }) => {
        this.vetId = vetInfo.vetId;
        this.drugId = droga.id;
        
        this.TratamientoService.addTratamiento(this.petId, this.vetId, this.drugId, this.tratamientoNuevo).subscribe(
          (response) => {
            console.log('Tratamiento agregado', response);
            this.agregarTratamientoEvent.emit(this.formularioTratamiento);
            this.router.navigate(['/Mascotas/all'], { queryParams: { userType: "veterinario", correo: this.correo } });
          },
          (error) => {
            console.error('Error al agregar el tratamiento', error);
          }
        );
      },
      error: (error) => {
        console.error('Error al obtener información', error);
      }
    });
  }

  actualizarTratamiento(): void{
    this.tratamientoNuevo = Object.assign({}, this.formularioTratamiento);
    console.log("revision de formulario: ", this.tratamientoNuevo);

    forkJoin({
      vetInfo: this.VeterinarioService.findByEmail(this.correo),
      droga: this.DrogaService.findByName(this.drogaNueva)
    }).subscribe({
      next: ({ vetInfo, droga }) => {
        this.vetId = vetInfo.vetId;
        this.drugId = droga.id;
        
        this.TratamientoService.addTratamiento(this.petId, this.vetId, this.drugId, this.tratamientoNuevo).subscribe(
          (response) => {
            console.log('Tratamiento agregado', response);
            this.agregarTratamientoEvent.emit(this.formularioTratamiento);
            this.router.navigate(['/Mascotas/all'], { queryParams: { userType: "veterinario" } });
          },
          (error) => {
            console.error('Error al agregar el tratamiento', error);
          }
        );
      },
      error: (error) => {
        console.error('Error al obtener información', error);
      }
    });
  }
}
