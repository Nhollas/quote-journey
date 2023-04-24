namespace QuoteJourney.API.Data.Entities;

public class Vehicle
{
    public string RegistrationNumber { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public string Colour { get; set; }
    public string FuelType { get; set; }
    public int EngineCapacity { get; set; }
    public int YearOfManufacture { get; set; }
    public string VehicleAge { get; set; }
    public string Wheelplan { get; set; }
    public DateTime DateOfLastV5CIssued { get; set; }
    public string TypeApproval { get; set; }
    public int Co2Emissions { get; set; }
    public string RegistrationPlace { get; set; }
    public Tax Tax { get; set; }
    public Mot Mot { get; set; }
}

public class Tax
{
    public string TaxStatus { get; set; }
    public DateTime TaxDueDate { get; set; }
    public string Days { get; set; }
}

public class Mot
{
    public string MotStatus { get; set; }
    public DateTime MotDueDate { get; set; }
    public int Days { get; set; }
}
