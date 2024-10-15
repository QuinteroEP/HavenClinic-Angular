import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from 'src/app/entity/clientes';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicio/cliente.service';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent {
  @Output()
  agregarClienteEvent = new EventEmitter<Cliente>();
  clienteNuevo!: Cliente;

  formularioCliente: Cliente = {
    id: 0,
    nombre: '',
    cedula: 0,
    celular: 0,
    correo: '',
    contrasena: '',
  };

  constructor(private router:Router, private clienteService:ClienteService) { }

  //se encarga de agregar a clienteService el nuevo cliente
agregarCliente():void{
console.log("Agregando cliente:", this.formularioCliente.nombre);	
this.clienteNuevo = Object.assign({}, this.formularioCliente);

this.clienteService.addCliente( this.clienteNuevo).subscribe(
(response) => {
console.log('Cliente agregado con válido', response);
this.agregarClienteEvent.emit(this.formularioCliente);
this.router.navigate(['cliente/all'], { queryParams: { userType: "veterinario" } });
},
(error) => {
console.error('Error al agregar el cliente', error);
}

);


  }

}
