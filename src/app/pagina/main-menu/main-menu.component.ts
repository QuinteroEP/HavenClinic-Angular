import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Cliente } from 'src/app/entity/clientes';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { Veterinario } from "../../entity/veterinarios";
import { VeterinarioService } from 'src/app/servicio/veterinario.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements AfterViewInit{
    constructor(
      private route: ActivatedRoute,
      private cdr: ChangeDetectorRef,
      public ClienteService: ClienteService,
      public VeterinarioService: VeterinarioService) { this.route.queryParams.subscribe(params => this.correo = params['correo']) }

    userType: string = '';
    correo: String = ' ';
    public clienteInfo: Cliente | null = null;
    public vetInfo: Veterinario | null = null;

    ngAfterViewInit(): void {
      this.route.queryParams.subscribe(params => {
        this.userType = params['userType'];
        this.cdr.detectChanges(); // para deteccion de cambios

        const token = localStorage.getItem('token');
        console.log('Token:', token);

        console.log("Tipo:" + this.userType);
        console.log("Correo: " + this.correo)
      });
    }

    ngOnInit(): void{
        this.ClienteService.findByEmail(this.correo).subscribe(cliente =>{
          console.log("informacion del cliente: ", cliente);
          this.clienteInfo = cliente;
        })
      }
}
