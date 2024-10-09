import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaMascotaComponent } from './mascotas/tabla-mascota/tabla-mascota.component';
import { TablaClienteComponent } from './clientes/tabla-cliente/tabla-cliente.component';
import { LandingComponent } from './pagina/landing/landing.component';
import { InformacionMascotaComponent } from './mascotas/informacion-mascota/informacion-mascota.component';
import { InformacionClienteComponent } from './clientes/informacion-cliente/informacion-cliente.component';
import { ActualizarMascotaComponent } from './mascotas/actualizar-mascota/actualizar-mascota.component';
import { FormularioMascotaComponent } from "./mascotas/formulario-mascota/formulario-mascota.component";
import { MainMenuComponent } from "./pagina/main-menu/main-menu.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'Mascotas/mis_mascotas', component: TablaMascotaComponent},
  {path: 'Mascotas/all', component: TablaMascotaComponent},
  {path: 'cliente/all', component: TablaClienteComponent},
  {path: 'cliente/informacion/:cedula', component: InformacionClienteComponent},
  {path: 'Mascotas/informacion/:id', component: InformacionMascotaComponent},
  {path: 'Mascotas/actualizar/:id', component: ActualizarMascotaComponent},
  {path: 'Mascotas/agregar', component: FormularioMascotaComponent},
  {path: 'main-menu', component: MainMenuComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
