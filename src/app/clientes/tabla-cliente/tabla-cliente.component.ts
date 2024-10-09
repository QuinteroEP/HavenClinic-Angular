import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { Cliente } from '../../entity/clientes';
import cli from '@angular/cli';

@Component({
  selector: 'app-tabla-cliente',
  templateUrl: './tabla-cliente.component.html',
  styleUrls: ['./tabla-cliente.component.css']
})

export class TablaClienteComponent {
  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService){ }

    listaClientes!: Cliente[]

    ngOnInit(): void{
      /*
      if(this.userType === 'cliente'){
        this.mascotaService.findByDueñoId(this.id).subscribe(
          (mascotas) => {
            this.listaMascotas = mascotas;
          })
      }*/

          this.clienteService.findAll().subscribe(
            (clientes) => {
              this.listaClientes = clientes;
            }
          )
    }
}
