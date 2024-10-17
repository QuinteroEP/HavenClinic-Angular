import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veterinario } from 'src/app/entity/veterinarios';
import { VeterinarioService } from 'src/app/servicio/veterinario.service';

@Component({
  selector: 'app-tabla-veterinario',
  templateUrl: './tabla-veterinario.component.html',
  styleUrls: ['./tabla-veterinario.component.css']
})
export class TablaVeterinarioComponent {
  //Variables
  id: number = 0
  veterinarioSelec!:Veterinario
  listaVeterinarios!:Veterinario[]
  userType: string = ' '
  nombreBusqueda: string = '';
  
  //constructor
  constructor(
    private route: ActivatedRoute,
    private veterinarioService:VeterinarioService){ this.route.queryParams.subscribe(
     // params =>{// this.userType = params['userType']}
     )
    }

  ngOnInit(): void {
 this.veterinarioService.findAll().subscribe(
   (veterinarios) => {
     this.listaVeterinarios = veterinarios
   }
 )
  }


  //metodos
//no se usa
mostrarVeterinario(veterinario:Veterinario){
  this.veterinarioSelec = veterinario
}

//no se usa
onAgregarVeterinario(veterinario:Veterinario){
  this.listaVeterinarios.push(veterinario)
  this.veterinarioService.addVeterinario(veterinario)
}

//funcion para eliminar el veterinario
eliminarVeterinario(veterinario:Veterinario){

  console.log("cedula veterinario eliminado: " + veterinario.cedula)
  this.veterinarioService.cambiarEstado(veterinario)
}

//se despliega al darle al boton busca por nombre
buscarVeterinario() {
  if (this.nombreBusqueda) {
    console.log(this.nombreBusqueda);
    this.veterinarioService.findByNombre(this.nombreBusqueda).subscribe(
      (veterinarios) => {
        console.log(veterinarios);
        this.listaVeterinarios = veterinarios;
      },
      (error) => {
        console.error('Error fetching veterinarians by nombre', error);
        this.listaVeterinarios = [];
      }
    );
  } else {
    this.veterinarioService.findAll().subscribe(
      (veterinarios) => {
        this.listaVeterinarios = veterinarios;
      }
    );
  }
}
}
