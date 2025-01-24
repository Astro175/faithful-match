import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export const useAuthToken = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (!isLoaded || !isSignedIn) {
        setLoading(false);
        return;
      }

      try {
        const sessionToken = await getToken();
        setToken(sessionToken);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [isLoaded, isSignedIn, getToken]);

  return { token, loading, error, refreshToken: () => fetchToken() };
};
