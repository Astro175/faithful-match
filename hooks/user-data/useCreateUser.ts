import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";

export default function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: User) => userService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    onError: (error) => console.log(error)
  });
}
