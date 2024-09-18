import { Component, Input } from '@angular/core';
import { Mascota } from '../mascotas';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MascotaService } from 'src/app/servicio/mascota.service';

@Component({
  selector: 'app-informacion-mascota',
  templateUrl: './informacion-mascota.component.html',
  styleUrls: ['./informacion-mascota.component.css']
})
export class InformacionMascotaComponent {
  @Input()
  mascota!: Mascota;

  constructor(
    private MascotaService:MascotaService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(){
    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.mascota = this.MascotaService.findById(id);
    })
  }
}
