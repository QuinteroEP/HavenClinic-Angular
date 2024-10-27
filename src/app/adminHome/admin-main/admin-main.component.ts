
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { DashboardService } from 'src/app/servicio/dashboard.service';
import { Cliente } from '../../entity/clientes';
import { DataTable } from 'simple-datatables';
import { Chart, registerables } from 'chart.js';
import { dashboardDTO } from 'src/app/entity/dashboardDTO';
import { Droga } from "../../entity/drogas";
import { DrogaService } from "../../servicio/droga.service";

/**
 * Component representing the main admin view.
 */
@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit, AfterViewInit {
  listaDrogas!: Droga[]; // List of drugs
  datatable!: DataTable; // DataTable instance
  kpis: dashboardDTO | null = null; // KPIs data

  /**
   * Constructor to inject necessary services.
   * @param drogaService Service to fetch drug data.
   * @param dashboardService Service to fetch dashboard KPIs.
   */
  constructor(private drogaService: DrogaService, private dashboardService: DashboardService) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    // Fetch all drugs and insert data into the table
    this.drogaService.findAll().subscribe({
      next: (clientes) => {
        this.listaDrogas = clientes;
        this.insertDataIntoTable(); // Insert data into DataTable
      },
      error: (error) => {
        console.error('Error fetching clients', error);
      }
    });

    // Fetch KPIs and initialize charts
    this.dashboardService.getKPIs().subscribe({
      next: (data) => {
        this.kpis = data;
        this.initializeCharts(); // Initialize charts after KPIs are loaded
        this.initializeDataTable(); // Initialize DataTable
      },
      error: (error) => {
        console.error('Error fetching KPIs', error);
      }
    });
  }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized.
   */
  ngAfterViewInit() {
    Chart.register(...registerables); // Register Chart.js components

  }

  /**
   * Initializes the DataTable.
   */
  private initializeDataTable() {
    const datatablesSimple = document.getElementById('datatablesSimple') as HTMLTableElement;
    if (datatablesSimple) {
      this.datatable = new DataTable(datatablesSimple);
    }
  }

  /**
   * Inserts data into the DataTable.
   */
  private insertDataIntoTable() {
    if (this.datatable) {
      const newRows = this.listaDrogas.map(droga => [
        droga.nombre,
        droga.unidadesVendidas
      ]);
      this.datatable.insert({ data: newRows });
    }
  }

  /**
   * Initializes the charts with the fetched KPIs data.
   */
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

