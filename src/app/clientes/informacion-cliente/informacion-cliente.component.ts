import { Component } from '@angular/core';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { Cliente } from '../../entity/clientes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-informacion-cliente',
  templateUrl: './informacion-cliente.component.html',
  styleUrls: ['./informacion-cliente.component.css']
})
export class InformacionClienteComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ClienteService: ClienteService
  ){}

  cliente!: Cliente
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const cedula = Number(param.get('cedula'));
      this.ClienteService.findByCedula(cedula).subscribe(
        (clienteInfo) => {
          this.cliente = clienteInfo
        },
        (error) => {
          console.error('Error fetching Cliente info:', error);
        }
      );
    });
  }
}
