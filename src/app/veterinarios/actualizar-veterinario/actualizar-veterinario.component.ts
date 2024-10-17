//actulizar-veterinario.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Veterinario } from 'src/app/entity/veterinarios';
import { VeterinarioService } from 'src/app/servicio/veterinario.service';

@Component({
  selector: 'app-actualizar-veterinario',
  templateUrl: './actualizar-veterinario.component.html',
  styleUrls: ['./actualizar-veterinario.component.css']
})
export class ActualizarVeterinarioComponent {
  informacionVetParaActualizar: Veterinario = {
    vetId: 0,
    nombre: '',
    especialidad: '',
    correo: '', 
    cedula: 0,
    celular:0,
    contrasena: '',
    foto: '',
    numAtenciones:0,
    activo: true
  };
  constructor(
    private veterinarioService:VeterinarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const cedula = Number(param.get('cedula'));
      this.veterinarioService.findByCedula(cedula).subscribe(
        (veterinarioInfo) => {
          this.informacionVetParaActualizar = veterinarioInfo;
        },
        (error) => {
          console.error('Error fetching Veterinario info:', error);
        }
      );
    }
    );
  }

  actualizarVeterinario(): void {
    console.log('Actualizando informacion:', this.informacionVetParaActualizar.cedula);
    this.veterinarioService.updateVeterinario(this.informacionVetParaActualizar).subscribe(
      
      (response) => {
        console.log('Veterinario actualizado con exito', response);
        this.router.navigate(['/veterinario/all'], { queryParams: { userType: "admin" } });
      },
      
    )
  }

}