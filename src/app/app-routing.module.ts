import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaMascotaComponent } from './mascotas/tabla-mascota/tabla-mascota.component';
import { TablaClienteComponent } from './clientes/tabla-cliente/tabla-cliente.component';
import { TablaVeterinarioComponent } from './veterinarios/tabla-veterinario/tabla-veterinario.component';

import { LandingComponent } from './pagina/landing/landing.component';
import { InformacionMascotaComponent } from './mascotas/informacion-mascota/informacion-mascota.component';
import { InformacionClienteComponent } from './clientes/informacion-cliente/informacion-cliente.component';
import { InformacionVeterinarioComponent } from './veterinarios/informacion-veterinario/informacion-veterinario.component';

import { ActualizarMascotaComponent } from './mascotas/actualizar-mascota/actualizar-mascota.component';
<<<<<<< Updated upstream
import { FormularioMascotaComponent } from "./mascotas/formulario-mascota/formulario-mascota.component";
=======
import { ActualizarClienteComponent } from './clientes/actualizar-cliente/actualizar-cliente.component';
import { ActualizarVeterinarioComponent } from './veterinarios/actualizar-veterinario/actualizar-veterinario.component';

import { FormularioMascotaComponent } from './mascotas/formulario-mascota/formulario-mascota.component';
import { FormularioClienteComponent } from './clientes/formulario-cliente/formulario-cliente.component';  
import { FormularioVeterinarioComponent } from './veterinarios/formulario-veterinario/formulario-veterinario.component';


>>>>>>> Stashed changes
import { MainMenuComponent } from "./pagina/main-menu/main-menu.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'Mascotas/mis_mascotas', component: TablaMascotaComponent},
  {path: 'Mascotas/all', component: TablaMascotaComponent},
  {path: 'cliente/all', component: TablaClienteComponent},
  {path: 'veterinario/all', component: TablaVeterinarioComponent},
  
  {path: 'Mascotas/informacion/:id', component: InformacionMascotaComponent},
  {path: 'cliente/informacion/:cedula', component: InformacionClienteComponent},
  {path: 'veterinario/informacion/:cedula', component: InformacionVeterinarioComponent},

  {path: 'Mascotas/actualizar/:id', component: ActualizarMascotaComponent},
<<<<<<< Updated upstream
=======
  {path: 'cliente/actualizar/:cedula', component: ActualizarClienteComponent},
  {path:  'veterinario/actualizar/:cedula', component: ActualizarVeterinarioComponent},

>>>>>>> Stashed changes
  {path: 'Mascotas/agregar', component: FormularioMascotaComponent},
  {path: 'cliente/agregar', component: FormularioClienteComponent},
  {path: 'veterinario/agregar', component: FormularioVeterinarioComponent},

  {path: 'main-menu', component: MainMenuComponent },
<<<<<<< Updated upstream
=======
  {path: "admin", component: AdminMainComponent},

>>>>>>> Stashed changes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
