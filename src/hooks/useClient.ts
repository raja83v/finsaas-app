import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { getClientProfile, Client } from "@/api/client";

export const useClient = () => {
  const { user } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (!user) {
        setClient(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const clientData = await getClientProfile(user.id);
        setClient(clientData);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching client profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [user]);

  return { client, loading, error };
};
