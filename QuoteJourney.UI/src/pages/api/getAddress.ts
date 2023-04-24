import { externalApiClient } from "lib/externalApiClient";
import { withQuoteAuth } from "middleware/withQuoteAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { Address } from "types";

const getAddressHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: address } = await externalApiClient.get<Address>(
    "/api/gateway/getAddress"
  );

  return res.status(200).json(address);
};

export default withQuoteAuth(getAddressHandler);
