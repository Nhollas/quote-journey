import { verifyToken } from "@/lib/jwt";
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
    return res
      .status(401)
      .json({ message: "The token provided was not valid." });
  }

  return res.status(200).json({
    registrationNumber: "BJ52SFK",
    make: "BMW",
    model: "X5 SPORT D AUTO",
    colour: "BLACK",
    fuelType: "DIESEL",
    engineCapacity: 2993,
    yearOfManufacture: 2006,
    vehicleAge: "15 Years 2 Months",
    wheelplan: "2 AXLE RIGID BODY",
    dateOfLastV5CIssued: "2021-12-15",
    typeApproval: "M1",
    co2Emissions: 250,
    registrationPlace: "Birmingham",
    tax: {
      taxStatus: "Untaxed",
      taxDueDate: "2021-09-07",
      days: "108",
    },
    mot: {
      motStatus: "Valid",
      motDueDate: "2022-07-05",
      days: 193,
    },
  });
}
