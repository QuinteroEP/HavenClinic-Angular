import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaMascotaComponent } from './mascotas/tabla-mascota/tabla-mascota.component';
import { TablaClienteComponent } from './clientes/tabla-cliente/tabla-cliente.component';
import { TablaVeterinarioComponent } from './veterinarios/tabla-veterinario/tabla-veterinario.component';


import { InformacionMascotaComponent } from './mascotas/informacion-mascota/informacion-mascota.component';
import { InformacionClienteComponent } from './clientes/informacion-cliente/informacion-cliente.component';
import { InformacionVeterinarioComponent } from './veterinarios/informacion-veterinario/informacion-veterinario.component';

import { ActualizarMascotaComponent } from './mascotas/actualizar-mascota/actualizar-mascota.component';
import { ActualizarClienteComponent } from './clientes/actualizar-cliente/actualizar-cliente.component';
import { ActualizarVeterinarioComponent } from './veterinarios/actualizar-veterinario/actualizar-veterinario.component';

import { FormularioMascotaComponent } from "./mascotas/formulario-mascota/formulario-mascota.component";
import { FormularioTratamientoComponent } from './tratamientos/formulario-tratamiento/formulario-tratamiento.component';
import { FormularioVeterinarioComponent } from './veterinarios/formulario-veterinario/formulario-veterinario.component';

import { MainMenuComponent } from "./pagina/main-menu/main-menu.component";
import { LandingComponent } from './pagina/landing/landing.component';
import { AdminMainComponent } from "./adminHome/admin-main/admin-main.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'Mascotas/mis_mascotas', component: TablaMascotaComponent},
  {path: 'Mascotas/all', component: TablaMascotaComponent},
  {path: 'cliente/all', component: TablaClienteComponent},
  {path: 'veterinario/all', component: TablaVeterinarioComponent},

  {path: 'cliente/informacion/:cedula', component: InformacionClienteComponent},
  {path: 'Mascotas/informacion/:id', component: InformacionMascotaComponent},
  {path: 'veterinario/informacion/:cedula', component: InformacionVeterinarioComponent},

  {path: 'Mascotas/actualizar/:id', component: ActualizarMascotaComponent},
  {path: 'cliente/actualizar/:cedula', component: ActualizarClienteComponent},
{path: 'veterinario/actualizar/:cedula', component: ActualizarVeterinarioComponent},

  {path: 'Mascotas/agregar', component: FormularioMascotaComponent},
  {path: 'veterinario/agregar', component: FormularioVeterinarioComponent},

  {path: 'Mascotas/tratamiento/modificar/:id', component: FormularioTratamientoComponent},
  {path: 'main-menu', component: MainMenuComponent },
  {path: "admin", component: AdminMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
