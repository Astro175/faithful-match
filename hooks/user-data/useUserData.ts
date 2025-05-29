import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";


export default function useUser(id: string) {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => userService.getById(id)
    })
}