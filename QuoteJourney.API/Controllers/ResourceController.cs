using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace QuoteJourney.API.Controllers;

[Route("api/")]
[ApiController]
// Any normal logged in user can access any of the routes in this controller.
[Authorize(AuthenticationSchemes = "Default")]
public class ResourceController : ControllerBase
{
    private readonly IConfiguration _configuration;
    
    public ResourceController(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    [HttpGet("getAddress", Name = "Get Address")]
    // Here & below we are also allowing access to this route if the user has been authenticated using the "QuoteJourney" scheme.
    // Default users will still be able to access this route and /getVehicle.
    [Authorize(AuthenticationSchemes = "QuoteJourney")]
    public IActionResult GetAddress()
    {
        return Ok(new
        {
            postcode = "SG1 1AA",
            latitude = 52.80926299999999,
            longitude = -0.3700527,
            formatted_address = new string[]
            {
                "71 Trajan Gate",
                "",
                "",
                "Stevenage",
                "Hertfordshire"
            },
            thoroughfare = "",
            building_name = "",
            sub_building_name = "",
            sub_building_number = "",
            building_number = "71",
            line_1 = "71 Trajan Gate",
            line_2 = "",
            line_3 = "",
            line_4 = "",
            locality = "",
            town_or_city = "Stevenage",
            county = "Hertfordshire",
            district = "",
            country = "England",
            residential = true
        });
    }

    [HttpGet("getVehicle", Name = "Get Vehicle")]
    [Authorize(AuthenticationSchemes = "QuoteJourney")]
    public IActionResult GetVehicle()
    {
        return Ok(new
        {
            registrationNumber = "BJ52SFK",
            make = "BMW",
            model = "X5 SPORT D AUTO",
            colour = "BLACK",
            fuelType = "DIESEL",
            engineCapacity = 2993,
            yearOfManufacture = 2006,
            vehicleAge = "15 Years 2 Months",
            wheelplan = "2 AXLE RIGID BODY",
            dateOfLastV5CIssued = "2021-12-15",
            typeApproval = "M1",
            co2Emissions = 250,
            registrationPlace = "Birmingham",
            tax = new
            {
                taxStatus = "Untaxed",
                taxDueDate = "2021-09-07",
                days = "108"
            },
            mot = new
            {
                motStatus = "Valid",
                motDueDate = "2022-07-05",
                days = 193
            }
        });
    }

    [HttpGet("getDriver", Name = "Get Driver")]
    public IActionResult GetDriver()
    {
        return Ok();
    }
}
