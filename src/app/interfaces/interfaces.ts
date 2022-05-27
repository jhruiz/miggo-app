export interface Componentmenu {
    img: string;
    name: string;
    redirectTo: string;
}

export interface ComponentSocialMedia {
    icon: string;
    color: string;
    redirectTo: string;
    system: string;
    location: string;
}

export interface ComponenteFacturas {
    codigo: string;
    consecutivodian: string;
    created: string;
    id: number;
    nombre: string;
    pagocontado: string;
    totalPago: string;
}

export interface ComponenteOrdenTrabajo {
    codigo: string;
    id: number;
    tecnico: string;
    cliente: string;
    estado: string;
}
