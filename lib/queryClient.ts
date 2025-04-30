import { QueryClient } from "@tanstack/react-query";


export const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    }
  }
});


export const getClientQueryClient = () => {
  if (typeof window === 'undefined') {
    throw new Error('This should only be used on the client side');
  }
  return createQueryClient();
};