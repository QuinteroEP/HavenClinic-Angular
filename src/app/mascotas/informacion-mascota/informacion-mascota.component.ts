import { Component, Input } from '@angular/core';
import { Mascota } from '../mascotas';

@Component({
  selector: 'app-informacion-mascota',
  templateUrl: './informacion-mascota.component.html',
  styleUrls: ['./informacion-mascota.component.css']
})
export class InformacionMascotaComponent {
  @Input()
  mascota!: Mascota;
}
