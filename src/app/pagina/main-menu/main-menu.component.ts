import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Cliente } from 'src/app/entity/clientes';
import { ClienteService } from 'src/app/servicio/cliente.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements AfterViewInit{
    constructor(
      private route: ActivatedRoute,  
      private cdr: ChangeDetectorRef,
      public ClienteService: ClienteService) { this.route.queryParams.subscribe(params => this.correo = params['correo']) }

    userType: string = '';
    correo: String = ' ';
    public clienteInfo: Cliente | null = null;

    ngAfterViewInit(): void {
      this.route.queryParams.subscribe(params => {
        this.userType = params['userType'];
        this.cdr.detectChanges(); // para deteccion de cambios

        console.log("Tipo:" + this.userType);
        console.log("Correo: " + this.correo)
      });
    }

    ngOnInit(): void{
      console.log("Usuario logeado: ")

      this.ClienteService.findByEmail(this.correo).subscribe(cliente =>{
        console.log("informacion: ", cliente);
        this.clienteInfo = cliente;
      })
    }
}
