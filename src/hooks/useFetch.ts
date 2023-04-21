import { useState } from "react";
import axios, { AxiosError } from "axios";
import { client } from "lib/client";

interface UseFetchResponse {
  fetchData: <T>(endpoint: string) => Promise<T | undefined>;
  error?: string;
}

export function useFetch(): UseFetchResponse {
  const [error, setError] = useState<string | undefined>(undefined);

  async function fetchData<T>(endpoint: string): Promise<T | undefined> {
    try {
      const response = await client.get<T>(endpoint);

      const { data } = response;

      return data;
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          const isRefreshed = await refreshAccessToken();

          if (!isRefreshed) {
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

  return {
    error,
    fetchData,
  };
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    await client.get("/api/session/refresh");

    return true;
  } catch (error) {
    return false;
  }
}
