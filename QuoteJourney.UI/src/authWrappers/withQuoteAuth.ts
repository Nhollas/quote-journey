import { externalApiClient } from "clients";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { Quote } from "types";

export const withQuoteAuth =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = getAuth(req);

    // If user is already logged in then they can access our BFF.
    if (user) {
      return handler(req, res);
    }

    if (!req.cookies.QuoteId) {
      return res.status(401).json({ message: "A QuoteId cookie is required." });
    }

    // This additional server side check is maybe not necessary, but it's added protection.
    const { data: quote } = await externalApiClient.get<Quote>(
      `/api/gateway/getQuote/${req.cookies.QuoteId}`
    );

    if (!quote) {
      return res
        .status(401)
        .json({ message: "The QuoteId cookie provided was not valid." });
    }

    return handler(req, res);
  };
