import { Component, Input } from '@angular/core';
import { Mascota } from '../../entity/mascotas';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MascotaService } from 'src/app/servicio/mascota.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-informacion-mascota',
  templateUrl: './informacion-mascota.component.html',
  styleUrls: ['./informacion-mascota.component.css']
})
export class InformacionMascotaComponent {
  @Input()
  mascota!: Mascota;

  constructor(
    private mascotaService:MascotaService,
    private route: ActivatedRoute,
    private router: Router,
    
  ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.mascotaService.findById(id).subscribe(
        (mascotaInfo) => {
          this.mascota = mascotaInfo
          console.log("Foto: " + mascotaInfo.url);
        },
        (error) => {
          console.error('Error fetching Mascota info:', error);
        }
      );
    });
  }
}