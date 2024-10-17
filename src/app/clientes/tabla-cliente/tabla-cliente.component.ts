import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { Cliente } from '../../entity/clientes';
import { param } from 'jquery';
import cli from '@angular/cli';

@Component({
  selector: 'app-tabla-cliente',
  templateUrl: './tabla-cliente.component.html',
  styleUrls: ['./tabla-cliente.component.css']
})

export class TablaClienteComponent {

  cedula:number = 0;
  userType: string = ' ';
  correo: string = '';
  cedulaBusqueda: string = '';

  clienteSeleccionado!: Cliente
  listaClientes!: Cliente[]
  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService){ this.route.queryParams.subscribe(params =>{
      this.cedula = params['cedula'],
      this.userType = params['userType'],
      this.correo = params['correo']})
    }

    ngOnInit(): void{
  
          this.clienteService.findAll().subscribe(
            (clientes) => {
              this.listaClientes = clientes;
            }
          )
    }

    //metodos
    mostrarCliente(cliente:Cliente){
      this.clienteSeleccionado = cliente
    }
    

    eliminarCliente(cliente:Cliente){
      var index = this.listaClientes.indexOf(cliente);
      this.listaClientes.splice(index, 1);
      console.log("cedula cliente eliminado: " + cliente.cedula);
      this.clienteService.deleteByCedula(cliente.cedula);
    }

    buscarCliente() {
      if (this.cedulaBusqueda) {
        const cedula = parseInt(this.cedulaBusqueda, 10);
        if (!isNaN(cedula)) {
          this.clienteService.findByCedula(cedula).subscribe(
            (cliente) => {
              this.listaClientes = [cliente];
            },
            (error) => {
              console.error('Error fetching client by cedula', error);
              this.listaClientes = [];
            }
          );
        } else {
          console.error('Cédula debe ser un número');
        }
      } else {
        this.clienteService.findAll().subscribe(
          (clientes) => {
            this.listaClientes = clientes;
          }
        );
      }
    }



}
