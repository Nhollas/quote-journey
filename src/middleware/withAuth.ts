import { verifyToken } from "lib/jwt";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const withAuth =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.cookies.jwt) {
      return res.status(401).json({ message: "A token is required." });
    }

    const jwt = await verifyToken(req.cookies.jwt, res);

    if (!jwt) {
      return res
        .status(401)
        .json({ message: "The token provided was not valid." });
    }

    return handler(req, res);
  };
