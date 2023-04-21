import { withAuth } from "middleware/withAuth";
import { NextApiRequest, NextApiResponse } from "next";

const getVehicleHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

export default withAuth(getVehicleHandler);
