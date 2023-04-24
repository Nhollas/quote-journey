import { GetServerSideProps } from "next";
import { useFetch } from "hooks/useFetch";
import { useState } from "react";
import { Address, Vehicle } from "types";
import { client } from "lib/client";
import { externalApiClient } from "lib/externalApiClient";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  if (req.cookies.QuoteId) {
    return {
      props: {},
    };
  }

  const session = await getServerSession(req, res, authOptions);

  const response = await externalApiClient.post(
    session
      ? `/api/gateway/createQuote?ownerId=${session.user.id}`
      : `/api/gateway/createQuote`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (response.headers["set-cookie"]) {
    context.res.setHeader("set-cookie", response.headers["set-cookie"]);
  }

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
    await client.post("/api/clearQuote");

    // This will fail and cause our error state to update.
    // Probably should add something to the useFetch hook to handle this properly.
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
      <button onClick={clearCookies}>Clear QuoteId Cookie</button>
      <button onClick={getAddress}>Get Address</button>
      {address && <pre>{JSON.stringify(address, null, 2)}</pre>}
      <button onClick={getVehicle}>Get Vehicle</button>
      {vehicle && <pre>{JSON.stringify(vehicle, null, 2)}</pre>}
    </section>
  );
}
