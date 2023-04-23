import { withAuth } from "middleware/withAuth";
import { NextApiRequest, NextApiResponse } from "next";

const getAddressHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({
    postcode: "SG1 1AA",
    latitude: 52.80926299999999,
    longitude: -0.3700527,
    formatted_address: ["71 Trajan Gate", "", "", "Stevenage", "Hertfordshire"],
    thoroughfare: "",
    building_name: "",
    sub_building_name: "",
    sub_building_number: "",
    building_number: "71",
    line_1: "71 Trajan Gate",
    line_2: "",
    line_3: "",
    line_4: "",
    locality: "",
    town_or_city: "Stevenage",
    county: "Hertfordshire",
    district: "",
    country: "England",
    residential: true,
  });
};

export default withAuth(getAddressHandler);