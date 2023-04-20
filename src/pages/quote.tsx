import { serializeCookie } from "lib/serializeCookie";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useFetch } from "hooks/useFetch";
import { useState } from "react";
import { Address, Vehicle } from "types";

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

export default function Page() {
  const { fetchData, error } = useFetch();

  const [address, setAddress] = useState<Address | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  async function getAddress() {
    const address = await fetchData<Address>(
      "http://localhost:3000/api/getAddress"
    );

    setAddress(address);
  }

  async function getVehicle() {
    const vehicle = await fetchData<Vehicle>(
      "http://localhost:3000/api/getVehicle"
    );

    setVehicle(vehicle);
  }

  return error ? (
    <section>
      <h1>Quote Page</h1>
      <p>{error}</p>
    </section>
  ) : (
    <section>
      <h1>Quote Page</h1>
      <button onClick={getAddress}>Get Address</button>
      {address && <p>{address.line_1}</p>}
      <button onClick={getVehicle}>Get Vehicle</button>
      {vehicle && <p>{vehicle.make}</p>}
    </section>
  );
}
