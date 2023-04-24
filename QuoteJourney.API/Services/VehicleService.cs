using QuoteJourney.API.Data.Entities;
using QuoteJourney.API.Interfaces;

namespace QuoteJourney.API.Services;

public class VehicleService : IVehicleService
{
    public Vehicle GetVehicle()
    {
        return new Vehicle
        {
            RegistrationNumber = "BJ52SFK",
            Make = "BMW",
            Model = "X5 SPORT D AUTO",
            Colour = "BLACK",
            FuelType = "DIESEL",
            EngineCapacity = 2993,
            YearOfManufacture = 2006,
            VehicleAge = "15 Years 2 Months",
            Wheelplan = "2 AXLE RIGID BODY",
            DateOfLastV5CIssued = DateTime.Parse("2021-12-15"),
            TypeApproval = "M1",
            Co2Emissions = 250,
            RegistrationPlace = "Birmingham",
            Tax = new Tax
            {
                TaxStatus = "Untaxed",
                TaxDueDate = DateTime.Parse("2021-09-07"),
                Days = "108"
            },
            Mot = new Mot
            {
                MotStatus = "Valid",
                MotDueDate = DateTime.Parse("2022-07-05"),
                Days = 193
            }
        };
    }
}