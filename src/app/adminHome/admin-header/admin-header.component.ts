import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements AfterViewInit {

  ngAfterViewInit() {
    if (window.location.pathname === '/admin') {
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
}
