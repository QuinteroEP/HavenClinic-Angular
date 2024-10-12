import { Component } from '@angular/core';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { MascotaService } from 'src/app/servicio/mascota.service';
import { Cliente } from '../../entity/clientes';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/entity/mascotas';
import cli from '@angular/cli';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-informacion-cliente',
  templateUrl: './informacion-cliente.component.html',
  styleUrls: ['./informacion-cliente.component.css']
})
export class InformacionClienteComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ClienteService: ClienteService,
    private MascotaService: MascotaService
  ){}

  cliente!: Cliente
  listaMascotas: Mascota[] | undefined

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const cedula = Number(param.get('cedula'));
      this.ClienteService.findByCedula(cedula).pipe(
        mergeMap(
          (clienteInfo) => {
            this.cliente = clienteInfo;
            return this.MascotaService.findByDueñoId(this.cliente.id)
          }
        )
      ).subscribe(
        (mascotas) => {
          this.listaMascotas = mascotas
        }
      )
    });
  }
}
