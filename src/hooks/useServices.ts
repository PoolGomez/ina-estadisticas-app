import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { Service } from '@/domain/models/Service';
// import { getServices } from '@/application/useCases/getServices';
// import { ServiceRepository } from '@/infrastructure/repositories/serviceRepository';
import { Service } from '@/models/service.model';
import { createService, deleteService, getServiceById, getServices, updateService } from '@/services';

// export const useServices = () => {
//   return useQuery<Service[]>({
//     queryKey: ["services"], 
//     queryFn: getServices,
//     // enabled:false
//   });
// };


// const serviceRepository = new ServiceRepository();
const queryKey = "services"

export const useServices = () => {
  return useQuery({
    queryKey:[queryKey],
    queryFn: getServices
    // queryFn: serviceRepository.findAll
  });
};

export const useServiceById = (id: string) => {
  return useQuery({
    queryKey:[queryKey,id],
    queryFn: ()=> getServiceById(id), enabled: !!id
    // queryFn: ()=>serviceRepository.findById(id),
    //   enabled: !!id
  }); 
}

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: (service: Omit<Service, 'id'>) => serviceRepository.create(service),
    mutationFn: (service: Omit<Service, 'id'>) => createService(service),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:[queryKey]
      });
    },
    onError: (error)=>{
      //  alert(error instanceof Error ? error.message : ' Error creando servicio')
      // return error.response?.data?.message || 'Ocurrió un error al crear el servicio';
      return error instanceof Error ? error.message : ' Error creando servicio'
    }
  });
};



export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, service }: { id: string; service: Partial<Omit<Service, 'id'>> }) =>
      // serviceRepository.update(id, service),
    updateService(id, service),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:[queryKey]
      });
    },
    onError: (error)=>{
      console.log()
      // alert(error instanceof Error ? error.message : ' Error actualizando servicio')
      return error instanceof Error ? error.message : ' Error actualizando servicio'
    }
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: (id: string) => serviceRepository.delete(id),
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:[queryKey]
      });
    },
    onError:(error)=>{
      console.log("error hook:", error)
      return error instanceof Error ? error.message : ' Error borrando servicio'
    }
  });
};

