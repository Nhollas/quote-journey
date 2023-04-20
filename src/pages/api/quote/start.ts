import { generateAccessToken, generateRefreshToken } from "lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "You are not authorized." });
  }

  const jwt = generateAccessToken();
  const refreshToken = generateRefreshToken();

  return res.status(200).json({
    jwt,
    refreshToken,
    jwtExpiry: 30,
    refreshTokenExpiry: 60 * 60 * 24,
  });
}
