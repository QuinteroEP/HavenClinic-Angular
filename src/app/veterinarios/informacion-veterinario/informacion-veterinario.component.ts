import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Veterinario } from 'src/app/entity/veterinarios';
import { VeterinarioService } from 'src/app/servicio/veterinario.service';

@Component({
  selector: 'app-informacion-veterinario',
  templateUrl: './informacion-veterinario.component.html',
  styleUrls: ['./informacion-veterinario.component.css']
})
export class InformacionVeterinarioComponent {

  @Input()
  veterinario!:Veterinario

  constructor(
    private veterinarioService:VeterinarioService,
    private route: ActivatedRoute,
    private router:Router,

  ){}

  ngOnInit(): void{
     this.route.paramMap.subscribe(param =>{
      const cedula = Number(param.get('cedula'));
    this.veterinarioService.findByCedula(cedula).subscribe(
      (veterinarioInfo)=>{
        this.veterinario = veterinarioInfo
        
      },
      (error) => {
        console.error('Error fetching Mascota info:', error);
      }
    );

    });
  }

}
