import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { Cliente } from './entity/clientes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Haven";
  constructor(private router: Router) {}

  public clienteInfo: Cliente | null = null;

  isLandingPage(): boolean {
    return this.router.url === '/';
  }
}
