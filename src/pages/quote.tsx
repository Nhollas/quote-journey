import { serializeCookie } from "lib/serializeCookie";
import { GetServerSideProps } from "next";
import { useFetch } from "hooks/useFetch";
import { useState } from "react";
import { Address, Vehicle } from "types";
import { client } from "lib/client";

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
  } = await client.get<Response>("/api/session/start", {
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

export default function Page() {
  const { fetchData, error } = useFetch();

  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);

  async function getAddress() {
    const address = await fetchData<Address>("/api/getAddress");

    setAddress(address);
  }

  async function getVehicle() {
    const vehicle = await fetchData<Vehicle>("/api/getVehicle");

    setVehicle(vehicle);
  }

  async function clearCookies() {
    await client.post("/api/session/clear");

    // This will fail and cause our error state to update.
    await fetchData<Vehicle>("/api/getVehicle");
  }

  return error ? (
    <section>
      <h1>Quote Page</h1>
      <p>{error}</p>
    </section>
  ) : (
    <section>
      <h1>Quote Page</h1>
      <button onClick={clearCookies}>Clear JWT & RefreshToken</button>
      <button onClick={getAddress}>Get Address</button>
      {address && <pre>{JSON.stringify(address, null, 2)}</pre>}
      <button onClick={getVehicle}>Get Vehicle</button>
      {vehicle && <pre>{JSON.stringify(vehicle, null, 2)}</pre>}
    </section>
  );
}
