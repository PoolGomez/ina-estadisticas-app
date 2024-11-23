export interface Service {
    id: string;
    boleta: string;
    congregacion: string;
    fecha: string;
    mes: string;
    escuelaDominical: number;
    invitados: number;
    miembros: number;
    asistencia: number;
    oficiante: string;
    ofrenda: number;
    observacion: string;
}

export interface EndpointServiceCreate {
    boleta: string;
    congregacion: string;
    fecha: string;
    mes: string;
    escuelaDominical: number;
    invitados: number;
    miembros: number;
    asistencia: number;
    oficiante: string;
    ofrenda: number;
    observacion: string;
}