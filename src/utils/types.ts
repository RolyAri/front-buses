export interface Marca {
    id: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
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

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface ApiResponse<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}