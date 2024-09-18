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
    ActualizarMascotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
