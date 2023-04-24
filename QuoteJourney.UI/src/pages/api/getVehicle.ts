import { externalApiClient } from "lib/externalApiClient";
import { withQuoteAuth } from "middleware/withQuoteAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { Vehicle } from "types";

const getVehicleHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: vehicle } = await externalApiClient.get<Vehicle>(
    "/api/gateway/getVehicle"
  );

  return res.status(200).json(vehicle);
};

export default withQuoteAuth(getVehicleHandler);
