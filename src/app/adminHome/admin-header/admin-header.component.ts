import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/servicio/cliente.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements AfterViewInit {

  constructor(
    private ClienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    
   }

  /**
   * Hook del ciclo de vida que se llama después de que la vista de un componente ha sido completamente inicializada.
   * Este método verifica si la ruta actual es '/admin' y agrega un listener de evento de clic
   * al botón de toggle de la barra lateral para manejar el estado de toggle de la barra lateral.
   */
  ngAfterViewInit() {
    if (window.location.pathname.startsWith('/admin')) {
      const sidebarToggle = document.body.querySelector('#sidebarToggle') as HTMLElement;
      if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
        });
      }
    }
  }

  onLogout(): void {
    this.ClienteService.logout();
    this.router.navigate(['/']); // Redirige al usuario a la página de login
  }
}
