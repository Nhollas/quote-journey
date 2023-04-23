import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "You are not authorized." });
  }

  // This would be from our database.
  const quoteId = "ebbfc760-2885-4717-b151-bf2dc9b9cd71";

  return res.status(200).json({
    quoteId,
  });
}
