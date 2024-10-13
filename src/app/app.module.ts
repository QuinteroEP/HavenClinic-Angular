import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './pagina/footer/footer.component';
import { NavbarComponent } from './pagina/navbar/navbar.component';
import { TablaMascotaComponent } from './mascotas/tabla-mascota/tabla-mascota.component';
import { InformacionMascotaComponent } from './mascotas/informacion-mascota/informacion-mascota.component';
import { FormularioMascotaComponent } from './mascotas/formulario-mascota/formulario-mascota.component';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './pagina/landing/landing.component';
import { EdadPipe } from './pipes/edad.pipe';
import { ActualizarMascotaComponent } from './mascotas/actualizar-mascota/actualizar-mascota.component';
import { MainMenuComponent } from './pagina/main-menu/main-menu.component';
import { NavbarAuxComponent } from './pagina/navbar-aux/navbar-aux.component';
import { HttpClientModule } from '@angular/common/http';
import { TablaClienteComponent } from './clientes/tabla-cliente/tabla-cliente.component';
import { InformacionClienteComponent } from './clientes/informacion-cliente/informacion-cliente.component';
import { ActualizarClienteComponent } from './clientes/actualizar-cliente/actualizar-cliente.component';
import { AdminFooterComponent } from './adminHome/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './adminHome/admin-header/admin-header.component';
import { AdminMainComponent } from './adminHome/admin-main/admin-main.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    TablaMascotaComponent,
    InformacionMascotaComponent,
    FormularioMascotaComponent,
    LandingComponent,
    EdadPipe,
    ActualizarMascotaComponent,
    MainMenuComponent,
    NavbarAuxComponent,
    TablaClienteComponent,
    InformacionClienteComponent,
    ActualizarClienteComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminMainComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
