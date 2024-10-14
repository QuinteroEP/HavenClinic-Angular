// src/app/entity/dashboard.dto.ts
export interface dashboardDTO {
  totalTratamientos: number;
  tratamientosPorMedicamento: { [key: string]: number };
  veterinariosActivos: number;
  veterinariosInactivos: number;
  totalMascotas: number;
  mascotasActivas: number;
  ventasTotales: number;
  gananciasTotales: number;
  top3Tratamientos: Object[];
}
