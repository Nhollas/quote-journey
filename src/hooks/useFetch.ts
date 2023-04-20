import { useState } from "react";
import axios from "axios";

interface UseFetchResponse {
  fetchData: <T>(endpoint: string) => Promise<T | null>;
  error?: string | undefined;
}

export function useFetch(): UseFetchResponse {
  const [error, setError] = useState<string | undefined>(undefined);

  async function fetchData<T>(endpoint: string): Promise<T | null> {
    try {
      const response = await axios.get<T>(endpoint, {
        headers: {
          Accept: "application/json",
        },
      });

      const { data } = response;

      return data;
    } catch (error: any) {
      if (error.response.status === 401) {
        const refreshed = await refreshAccessToken();

        if (!refreshed) {
          setError(
            "Your session has expired, please refresh the page for a new session."
          );

          return null;
        }

        return await fetchData<T>(endpoint);
      } else {
        setError("Something went wrong");

        return null;
      }
    }
  }

  async function refreshAccessToken(): Promise<boolean> {
    try {
      await axios.get("http://localhost:3000/api/quote/refresh", {
        headers: {
          Accept: "application/json",
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    error,
    fetchData,
  };
}
