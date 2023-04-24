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

      console.log(response);

      const { data } = response;

      return data;
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError(error.response.data.message);

          return undefined;
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
