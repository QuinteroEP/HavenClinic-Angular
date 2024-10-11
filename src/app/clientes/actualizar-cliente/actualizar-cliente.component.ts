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
    id: 0,
    nombre: '',
    cedula: 0,
    celular: 0,
    correo: '',
    contrasena: '',
  };

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const cedula = Number(param.get('cedula'));
      this.clienteService.findByCedula(cedula).subscribe(
        (ClienteInfo) => {
          this.informacionClienteParaActualizar = ClienteInfo;
        },
        (error) => {
          console.error('Error fetching Cliente info:', error);
        }
      );
    });
  }

  actualizarCliente(): void {
    console.log('Actualizando informacion: ' + this.informacionClienteParaActualizar.id);
    this.clienteService.actualizarCliente(this.informacionClienteParaActualizar).subscribe(
      (response) => {
        console.log('Cliente actualizado con exito', response);
        this.router.navigate(['/cliente/all'], { queryParams: { userType: 'veterinario' } });
      }
    );
  }
}