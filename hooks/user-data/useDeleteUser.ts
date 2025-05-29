import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { useQueryClient } from "@tanstack/react-query";


export default function useDeleteUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => userService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['user']}),
        onError: (error) => console.log(error)
    })
}