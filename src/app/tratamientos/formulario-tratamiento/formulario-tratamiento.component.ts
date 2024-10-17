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
    idVeterinario: 0,
    idMascota: 0,
    idDroga: 0,
    nombredroga: ''
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
      const id = Number(param.get('id'));

      this.MascotaService.findById(id).subscribe(
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
    this.VeterinarioService.findByEmail(this.correo).subscribe(
      (informacion) => {
        this.formularioTratamiento.idVeterinario = informacion.vetId;
      }
    )

    this.DrogaService.findByName(this.formularioTratamiento.nombredroga).subscribe(
      (drogaInfo) => {
        this.formularioTratamiento.idDroga = drogaInfo.id;
      }
    )

    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.formularioTratamiento.idMascota = id;
    })

    console.log('Agregando tratamiento:', this.formularioTratamiento);    
    this.tratamientoNuevo = Object.assign({}, this.formularioTratamiento);

    this.TratamientoService.addTratamiento(this.tratamientoNuevo.id, this.tratamientoNuevo).subscribe(
      (response) => {
        console.log('Tratamiento agregado con éxito', response);
        this.agregarTratamientoEvent.emit(this.formularioTratamiento);
        this.router.navigate(['/Mascotas/all'], { queryParams: { userType: "veterinario" }});
      },
      (error) => {
        console.error('Error al agregar el tratamiento', error);
      }
    );
  }
}
