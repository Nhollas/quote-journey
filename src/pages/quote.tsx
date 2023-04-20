import { serializeCookie } from "@/lib/serializeCookie";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";

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

async function getAddress() {
  // If we don't have a JWT, we need to refresh it
  if (!getCookie("jwt")) {
    await axios.get("http://localhost:3000/api/quote/refresh", {
      headers: {
        Accept: "application/json",
      },
    });
  }

  try {
    const { data } = await axios.get("http://localhost:3000/api/getAddress", {
      headers: {
        Accept: "application/json",
      },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getVehicle() {
  // If we don't have a JWT, we need to refresh it
  if (!getCookie("jwt")) {
    await axios.get("http://localhost:3000/api/quote/refresh", {
      headers: {
        Accept: "application/json",
      },
    });
  }

  try {
    const { data } = await axios.get("http://localhost:3000/api/getVehicle", {
      headers: {
        Accept: "application/json",
      },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export default function Quote() {
  return (
    <main>
      <h1>Quote Page</h1>

      <button onClick={getAddress}>Get Address</button>
      <button onClick={getVehicle}>Get Vehicle</button>
    </main>
  );
}
