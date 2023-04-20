import { verifyToken } from "@/utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies.jwt) {
    return res.status(401).json({ message: "A token is required." });
  }

  const jwt = await verifyToken(req.cookies.jwt, res);

  if (!jwt) {
    return res.status(401).json({ message: "The token provided was not valid." });
  }

  return res.status(200).json({
    "postcode": "PE10 2AH",
    "latitude": 52.80926299999999,
    "longitude": -0.3700527,
    "formatted_address": [
      "56 Spa Chase",
      "",
      "",
      "Bourne",
      "Lincolnshire"
    ],
    "thoroughfare": "",
    "building_name": "",
    "sub_building_name": "",
    "sub_building_number": "",
    "building_number": "56",
    "line_1": "56 Spa Chase",
    "line_2": "",
    "line_3": "",
    "line_4": "",
    "locality": "",
    "town_or_city": "Bourne",
    "county": "Lincolnshire",
    "district": "South Kesteven",
    "country": "England",
    "residential": true
  });
}