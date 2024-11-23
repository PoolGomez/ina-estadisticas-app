import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { Service } from '@/domain/models/Service';
// import { getServices } from '@/application/useCases/getServices';
import { ServiceRepository } from '@/infrastructure/repositories/serviceRepository';
import { Service } from '@/models/service.model';

// export const useServices = () => {
//   return useQuery<Service[]>({
//     queryKey: ["services"], 
//     queryFn: getServices,
//     // enabled:false
//   });
// };


const serviceRepository = new ServiceRepository();

export const useServices = () => {
  return useQuery({
    queryKey:["services"],
    queryFn: serviceRepository.findAll  
  });
};

export const useServiceById = (id: string) => {
  return useQuery({
    queryKey:["services",id],
    queryFn: ()=>serviceRepository.findById(id),
      enabled: !!id
  }); 
}

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (service: Omit<Service, 'id'>) => serviceRepository.create(service),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["services"]
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
      serviceRepository.update(id, service),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["services"]
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
    mutationFn: (id: string) => serviceRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["services"]
      });
    },
    onError:(error)=>{
      console.log("error hook:", error)
      return error instanceof Error ? error.message : ' Error borrando servicio'
    }
  });
};

