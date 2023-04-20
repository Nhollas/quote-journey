import { serializeCookie } from "lib/serializeCookie";
import { generateAccessToken } from "lib/jwt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ message: "You are not authorized." });
  }

  let decoded = "";

  try {
    decoded = jwt.verify(
      req.cookies.refreshToken,
      process.env.SECRET_REFRESH_TOKEN!
    );
  } catch (err) {
    return res.status(405).send("Token is invalid");
  }

  const refreshedJwt = generateAccessToken();

  res.setHeader("Set-Cookie", [
    serializeCookie("jwt", refreshedJwt, req, {
      maxAge: 30,
    }),
  ]);

  return res.status(200).json({ success: true });
}
