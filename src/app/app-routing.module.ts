import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaMascotaComponent } from './mascotas/tabla-mascota/tabla-mascota.component';
import { LandingComponent } from './pagina/landing/landing.component';
import { InformacionMascotaComponent } from './mascotas/informacion-mascota/informacion-mascota.component';
import { ActualizarMascotaComponent } from './mascotas/actualizar-mascota/actualizar-mascota.component';
import {FormularioMascotaComponent} from "./mascotas/formulario-mascota/formulario-mascota.component";
import {MainMenuComponent} from "./pagina/main-menu/main-menu.component";

const routes: Routes = [
  {path: 'Mascotas', component: TablaMascotaComponent},
  {path: '', component: LandingComponent},
  {path: 'Mascotas/informacion/:id', component: InformacionMascotaComponent},
  {path: 'Mascotas/actualizar/:id', component: ActualizarMascotaComponent},
  {path: 'Mascotas/agregar', component: FormularioMascotaComponent},
  { path: 'main-menu', component: MainMenuComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
