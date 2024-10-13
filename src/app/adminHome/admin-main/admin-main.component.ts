import { Component, AfterViewInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements AfterViewInit {

  ngAfterViewInit() {
    if (window.location.pathname === '/admin') {
      const datatablesSimple = document.getElementById('datatablesSimple') as HTMLTableElement;
      const areaChartCanvas = document.getElementById('myAreaChart') as HTMLCanvasElement;
      const barChartCanvas = document.getElementById('myBarChart') as HTMLCanvasElement;

      if (datatablesSimple) {
        new DataTable(datatablesSimple);
      }

      Chart.register(...registerables);

      if (areaChartCanvas) {
        new Chart(areaChartCanvas, {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'My First dataset',
              backgroundColor: 'rgba(2,117,216,0.2)',
              borderColor: 'rgba(2,117,216,1)',
              data: [0, 10, 5, 2, 20, 30, 45],
            }],
          },
          options: {
            scales: {
              x: {
                type: 'category',
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                grid: {
                  display: false
                }
              },
              y: {
                beginAtZero: true,
                max: 100,
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

      if (barChartCanvas) {
        new Chart(barChartCanvas, {
          type: 'bar',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
              label: 'Revenue',
              backgroundColor: 'rgba(2,117,216,1)',
              borderColor: 'rgba(2,117,216,1)',
              data: [4215, 5312, 6251, 7841, 9821, 14984],
            }],
          },
          options: {
            scales: {
              x: {
                type: 'category',
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                grid: {
                  display: false
                }
              },
              y: {
                beginAtZero: true,
                max: 15000,
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
}
