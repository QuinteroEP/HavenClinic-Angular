// src/app/servicio/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dashboardDTO } from '../entity/dashboardDTO';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8090/dashboard/kpis';

  constructor(private http: HttpClient) { }

  getKPIs(): Observable<dashboardDTO> {
    return this.http.get<dashboardDTO>(this.apiUrl);
  }
}
