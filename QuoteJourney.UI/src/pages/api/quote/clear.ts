import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Set-Cookie", [
    "QuoteId=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "refreshToken=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
  ]);
  return res.status(200).json({ success: true });
}
