export interface Tratamiento{
        id: number;
    fecha: Date;
    mascota: {
        id: number;
        nombre: string;
        edad: number;
        raza: string;
        url: string;
        genero: string;
        condicion: string;
        descripcion: string;
        enTratamiento: boolean;
    };
    veterinario: {
        vetId: number;
        correo: string;
        cedula: number;
        nombre: string;
        celular: number;
        especialidad: string;
        contrasena: string;
        foto: string;
        numAtenciones: number;
        activo: boolean;
    };
    droga: {
        id: number;
        nombre: string;
        precioVenta: number;
        precioCompra: number;
        unidadesDisponibles: number;
        unidadesVendidas: number;
    };
}
