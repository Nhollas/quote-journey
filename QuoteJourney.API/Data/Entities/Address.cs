namespace QuoteJourney.API.Data.Entities;

public class Address
{
    public string Postcode { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string[] FormattedAddress { get; set; }
    public string Thoroughfare { get; set; }
    public string BuildingName { get; set; }
    public string SubBuildingName { get; set; }
    public string SubBuildingNumber { get; set; }
    public string BuildingNumber { get; set; }
    public string Line1 { get; set; }
    public string Line2 { get; set; }
    public string Line3 { get; set; }
    public string Line4 { get; set; }
    public string Locality { get; set; }
    public string TownOrCity { get; set; }
    public string County { get; set; }
    public string District { get; set; }
    public string Country { get; set; }
    public bool Residential { get; set; }
}