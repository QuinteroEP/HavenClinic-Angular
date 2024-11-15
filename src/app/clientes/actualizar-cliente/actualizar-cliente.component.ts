import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/entity/clientes';
import { ClienteService } from 'src/app/servicio/cliente.service';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent {
  informacionClienteParaActualizar: Cliente = {
    clienteId: 0,
    nombre: '',
    cedula: 0,
    celular: 0,
    correo: '',
    contrasena: '',
  };

  pass: string = '';

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const cedula = Number(param.get('cedula'));
      this.clienteService.findByCedula(cedula).subscribe(
        (ClienteInfo) => {
          this.informacionClienteParaActualizar = ClienteInfo;
          this.pass = ClienteInfo.contrasena
          //Se debe guardar la contraseña en la variable pass porque Angular no reconoce la Ñ
        },
        (error) => {
          console.error('Error fetching Cliente info:', error);
        }
      );
    });
  }

  actualizarCliente(): void {
    console.log('Actualizando informacion: ' + this.informacionClienteParaActualizar.clienteId);
    this.informacionClienteParaActualizar.contrasena = this.pass;
    //se regresa de pass a contraseña
    this.clienteService.actualizarCliente(this.informacionClienteParaActualizar.clienteId ,this.informacionClienteParaActualizar).subscribe(
      (response) => {
        console.log('Cliente actualizado con exito', response);
        this.router.navigate(['/cliente/all'], { queryParams: { userType: 'veterinario' } });
      }
    );
  }
}