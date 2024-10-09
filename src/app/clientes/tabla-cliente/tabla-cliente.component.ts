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
  
          this.clienteService.findAll().subscribe(
            (clientes) => {
              this.listaClientes = clientes;
            }
          )
    }

    //metodos
    eliminarCliente(cliente:Cliente){
      var index = this.listaClientes.indexOf(cliente);
      this.listaClientes.splice(index, 1);
      console.log("cedula cliente eliminado: " + cliente.cedula);
      this.clienteService.deleteByCedula(cliente.cedula);
    }










}
