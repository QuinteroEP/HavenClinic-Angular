import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { param } from 'jquery';
import { Cliente } from 'src/app/entity/clientes';
import { ClienteService } from 'src/app/servicio/cliente.service';

@Component({
  selector: 'app-navbar-aux',
  templateUrl: './navbar-aux.component.html',
  styleUrls: ['./navbar-aux.component.css']
})

export class NavbarAuxComponent {
  userType: string | null = null;
  correo: string = ' ';
  cliente: Cliente | null = null;
  
  @Input() public clienteInfo: Cliente | null = null;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef,
    private ClienteService: ClienteService) { this.route.queryParams.subscribe(params => {
      this.userType = params['userType'], 
      this.correo = params['correo']}) 
    }

  navigateToMainMenu() {
    this.router.navigate(['/main-menu'], { queryParams: { userType: this.userType, correo: this.correo } });
  }

  ngOnChanges(): void{
    console.log("Navbar: " + this.correo);

    this.ClienteService.findByEmail(this.correo!).subscribe(cliente =>{
      console.log("Navbar - informacion: ", cliente);
      this.cliente = cliente;
    })

  }
}
