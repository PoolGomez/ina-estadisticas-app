import { EndpointServiceCreate, Service } from "@/models";


export const createServiceAdapter = (service: EndpointServiceCreate) => {
    const formattedService: Omit<Service, 'id'> = {
        boleta:             service.boleta,
        congregacion:       service.congregacion,
        fecha:              service.fecha,
        mes:                service.mes,
        escuelaDominical:   service.escuelaDominical,
        invitados:          service.invitados,
        miembros:           service.miembros,
        asistencia:         service.asistencia,
        oficiante:          service.oficiante,
        ofrenda:            service.ofrenda,
        observacion:        service.observacion,
    };
    return formattedService;
  };

//   name: service.data.name,
//     gender: service.data.gender,
//     status: service.data.status