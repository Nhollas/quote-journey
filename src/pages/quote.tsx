import { serializeCookie } from "@/lib/serializeCookie";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";

type Response = {
  jwt: string;
  jwtExpiry: number;
  refreshToken: string;
  refreshTokenExpiry: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies.refreshToken) {
    return {
      props: {},
    };
  }

  const {
    data: { jwt, jwtExpiry, refreshToken, refreshTokenExpiry },
  } = await axios.get<Response>("http://localhost:3000/api/quote/start", {
    headers: {
      Accept: "application/json",
    },
    params: {
      apiKey: process.env.API_KEY,
    },
  });

  context.res.setHeader("Set-Cookie", [
    serializeCookie("jwt", jwt, context.req, {
      maxAge: jwtExpiry,
    }),
    serializeCookie("refreshToken", refreshToken, context.req, {
      maxAge: refreshTokenExpiry,
    }),
  ]);

  return {
    props: {},
  };
};

export default function Quote() {
  const [error, setError] = useState(null);

  // We cannot check if we have a JWT cookie as its httpOnly but will try anyways.
  async function attemptRefresh() {
    try {
      await axios.post("http://localhost:3000/api/quote/refresh", {
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error) {
      setError(error);
    }
  }

  async function getAddress() {
    try {
      const response = await axios.get("http://localhost:3000/api/getAddress", {
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error) {
      if (error.response.status === 401) {
        await attemptRefresh();
      } else {
        // Handle other errors
      }
    }
  }

  async function getVehicle() {
    try {
      const response = await axios.get("http://localhost:3000/api/getVehicle", {
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error) {
      if (error.response.status === 401) {
        await attemptRefresh();
      } else {
        // Handle other errors
      }
    }
  }

  return (
    <main>
      <h1>Quote Page</h1>
      {error && <p>{error.message}</p>}

      <button onClick={getAddress}>Get Address</button>
      <button onClick={getVehicle}>Get Vehicle</button>
    </main>
  );
}
