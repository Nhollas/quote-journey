using Microsoft.AspNetCore.Mvc;
using QuoteJourney.API.Interfaces;

namespace QuoteJourney.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GatewayController : ControllerBase
{
    private readonly IVehicleService _vehicleService;
    private readonly IAddressService _addressService;
    private readonly IQuoteService _quoteService;

    public GatewayController(
        IVehicleService vehicleService,
        IAddressService addressService,
        IQuoteService quoteService)
    {
        _vehicleService = vehicleService;
        _addressService = addressService;
        _quoteService = quoteService;
    }
    
    [HttpGet("getAddress", Name = "Get Address")]
    public IActionResult GetAddress()
    {
        return Ok(_addressService.GetAddress());
    }

    [HttpGet("getVehicle", Name = "Get Vehicle")]
    public IActionResult GetVehicle()
    {
        return Ok(_vehicleService.GetVehicle());
    }
    
    [HttpGet("getQuote/{quoteId}", Name = "Get Quote")]
    public async Task<IActionResult> GetQuote(Guid quoteId)
    {
        return Ok(await _quoteService.GetQuoteAsync(quoteId));
    }
    
    [HttpPost("createQuote", Name = "Create Quote")]
    public async Task<IActionResult> CreateQuote([FromQuery] string? ownerId)
    {
        var quote = await _quoteService.CreateQuoteAsync(ownerId);
        // add set cookie to the response.

        Response.Cookies.Append("QuoteId", quote.Id.ToString(), new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Strict,
            Secure = false
        });
        
        return Ok(quote);
    }
    
    [HttpDelete("deleteQuote/{quoteId}", Name = "Delete Quote")]
    public async Task<IActionResult> DeleteQuote(Guid quoteId)
    {
        await _quoteService.DeleteQuoteAsync(quoteId);
        return NoContent();
    }
}