import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { DashboardService } from 'src/app/servicio/dashboard.service';
import { Cliente } from '../../entity/clientes';
import { DataTable } from 'simple-datatables';
import { Chart, registerables } from 'chart.js';
import { dashboardDTO } from 'src/app/entity/dashboardDTO';
import { Droga } from "../../entity/drogas";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit, AfterViewInit {
  listaClientes!: Cliente[];
  datatable!: DataTable;
  kpis: dashboardDTO | null = null;

  id:number = 0;
  userType:string = "admin";

  constructor(
    private router: ActivatedRoute,
  
    private clienteService: ClienteService, 
    private dashboardService: DashboardService){ 
    }

   // verVeterinario(): void {
   //   this.router.navigate(['/veterinario/all'], { queryParams: { userType: this.userType } });
   // }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
        console.log(this.listaClientes); // Verify data is being fetched
        this.insertDataIntoTable(); // Insert data into DataTable
      },
      error: (error) => {
        console.error('Error fetching clients', error);
      }
    });

    this.dashboardService.getKPIs().subscribe({
      next: (data) => {
        this.kpis = data;
        this.initializeCharts(); // Initialize charts after kpis is loaded
      },
      error: (error) => {
        console.error('Error fetching KPIs', error);
      }
    });
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    this.initializeDataTable();
  }

  private initializeDataTable() {
    const datatablesSimple = document.getElementById('datatablesSimple') as HTMLTableElement;
    if (datatablesSimple) {
      this.datatable = new DataTable(datatablesSimple);
    }
  }

  private insertDataIntoTable() {
    if (this.datatable) {
      const newRows = this.listaClientes.map(cliente => [
        cliente.nombre,
        cliente.celular,
        cliente.correo,
        cliente.cedula
      ]);
      this.datatable.insert({ data: newRows });
    }
  }

  

  private initializeCharts() {
    const pieChartCanvas = document.getElementById('myAreaChart') as HTMLCanvasElement;
    const barChartCanvas = document.getElementById('myBarChart') as HTMLCanvasElement;

    if (pieChartCanvas && this.kpis) {
      const labels = ['Veterinarios Activos', 'Veterinarios Inactivos'];
      const data = [this.kpis.veterinariosActivos, this.kpis.veterinariosInactivos];

      new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Status de los veterinarios',
            backgroundColor: [
              'rgba(75,192,192,0.2)', // Active
              'rgba(255,99,132,0.2)'  // Inactive
            ],
            borderColor: [
              'rgba(75,192,192,1)', // Active
              'rgba(255,99,132,1)'  // Inactive
            ],
            data: data,
          }],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
    }

    if (barChartCanvas && this.kpis) {
      const labels = this.kpis.top3Tratamientos.map((tratamiento: any) => tratamiento[0]);
      const data = this.kpis.top3Tratamientos.map((tratamiento: any) => tratamiento[1]);

      new Chart(barChartCanvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Unidades Vendidas',
            backgroundColor: 'rgba(2,117,216,1)',
            borderColor: 'rgba(2,117,216,1)',
            data: data,
          }],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 5
              },
              grid: {
                color: 'rgba(0, 0, 0, .125)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }
}
