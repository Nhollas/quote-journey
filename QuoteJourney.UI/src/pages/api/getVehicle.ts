import { externalApiClient } from "clients";
import { NextApiRequest, NextApiResponse } from "next";
import { Vehicle } from "types";

const getVehicleHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: vehicle } = await externalApiClient.get<Vehicle>(
    "/api/gateway/getVehicle"
  );

  return res.status(200).json(vehicle);
};

export default getVehicleHandler;
