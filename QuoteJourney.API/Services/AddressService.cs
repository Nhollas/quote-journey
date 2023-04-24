using QuoteJourney.API.Data.Entities;
using QuoteJourney.API.Interfaces;

namespace QuoteJourney.API.Services;

public class AddressService : IAddressService
{
    public Address GetAddress()
    {
        return new Address
        {
            Postcode = "SG1 1AA",
            Latitude = 52.80926299999999,
            Longitude = -0.3700527,
            FormattedAddress = new string[]
            {
                "71 Trajan Gate",
                "",
                "",
                "Stevenage",
                "Hertfordshire"
            },
            Thoroughfare = "",
            BuildingName = "",
            SubBuildingName = "",
            SubBuildingNumber = "",
            BuildingNumber = "71",
            Line1 = "71 Trajan Gate",
            Line2 = "",
            Line3 = "",
            Line4 = "",
            Locality = "",
            TownOrCity = "Stevenage",
            County = "Hertfordshire",
            District = "",
            Country = "England",
            Residential = true
        };
    }
}