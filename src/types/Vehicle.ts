export type Vehicle = {
  registrationNumber: string;
  make: string;
  model: string;
  colour: string;
  fuelType: string;
  engineCapacity: number;
  yearOfManufacture: number;
  vehicleAge: string;
  wheelplan: string;
  dateOfLastV5CIssued: string;
  typeApproval: string;
  co2Emissions: number;
  registrationPlace: string;
  tax: {
    taxStatus: string;
    taxDueDate: string;
    days: string;
  };
  mot: {
    motStatus: string;
    motDueDate: string;
    days: number;
  };
};
