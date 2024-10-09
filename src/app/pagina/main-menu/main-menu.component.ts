import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Cliente } from 'src/app/entity/clientes';
import { ClienteService } from 'src/app/servicio/cliente.service';
import {Veterinario} from "../../veterinarios/veterinarios";
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

        console.log("Tipo:" + this.userType);
        console.log("Correo: " + this.correo)
      });
    }

    ngOnInit(): void{
      if(this.userType === 'cliente'){
        console.log("de tipo clinete");
      }else if(this.userType === 'veterinario'){
        console.log("de tipo veterianrio");
      }
        this.ClienteService.findByEmail(this.correo).subscribe(cliente =>{
          console.log("informacion del cliente: ", cliente);
          this.clienteInfo = cliente;
        })
      }
}
