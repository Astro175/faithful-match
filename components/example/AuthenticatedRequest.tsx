import { useAuthToken } from "@/hooks/useAuthToken";

export const AuthenticatedRequest = () => {
  const { token, loading, error } = useAuthToken();

  const makeAuthenticatedRequest = async () => {
    if (!token) {
      console.error('No token available');
      return;
    }

    try {
      const response = await fetch('https://terrier-smooth-mouse.ngrok-free.app/api/your-endpoint', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Response:', data);
    } catch (err) {
      console.error('Request failed:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!token) return <div>Not authenticated</div>;

  return (
    <button onClick={makeAuthenticatedRequest}>
      Make Authenticated Request
    </button>
  );
};
