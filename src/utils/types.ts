export interface Marca {
    id: number;
    nombre: string;
}

export interface Bus {
    id: number;
    numeroDeBus: string;
    placa: string;
    fechaCreacion: string;
    caracteristicas: string;
    activo: boolean;
    marca: Marca;
}