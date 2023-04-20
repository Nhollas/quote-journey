import { useState } from "react";
import axios, { AxiosError } from "axios";

interface UseFetchResponse {
  fetchData: <T>(endpoint: string) => Promise<T | undefined>;
  error?: string | undefined;
}

export function useFetch(): UseFetchResponse {
  const [error, setError] = useState<string | undefined>(undefined);

  async function fetchData<T>(endpoint: string): Promise<T | undefined> {
    try {
      const response = await axios.get<T>(endpoint, {
        headers: {
          Accept: "application/json",
        },
      });

      const { data } = response;

      return data;
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          const refreshed = await refreshAccessToken();

          if (!refreshed) {
            setError(
              "Your session has expired, please refresh the page for a new session."
            );

            return undefined;
          }

          return await fetchData<T>(endpoint);
        }
      }

      setError("Something went wrong");

      return undefined;
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
