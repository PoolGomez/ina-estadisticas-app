import { UserInfo } from "@/models";
import { getUser, getUsers, updateRolUser, updateUser } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const queryKey = "users";

export const useUsers = () => {
    return useQuery({
        queryKey: [queryKey],
        queryFn: getUsers
    });
};

export const useUserById = (id:string) => {
    return useQuery({
        queryKey:[queryKey, id],
        queryFn: ()=> getUser(id), enabled: !!id
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, user}:{id:string, user:UserInfo}) => updateUser(id,user),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:[queryKey]
            });
        },
        onError:(error)=>{

            return error instanceof Error ? error.message : ' Error actualizando usuario'
        }
    })
}

export const useUpdateRolUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, rol}:{id:string, rol:string}) => updateRolUser(id,rol),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:[queryKey]
            });
        },
        onError:(error)=>{

            return error instanceof Error ? error.message : ' Error actualizando rol del usuario'
        }
    })
}
