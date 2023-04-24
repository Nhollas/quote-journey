using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using QuoteJourney.API.Data;
using QuoteJourney.API.Interfaces;
using QuoteJourney.API.Middleware;
using QuoteJourney.API.Services;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddDbContext<QuoteJourneyDbContext>(c =>
    c.UseSqlServer(configuration.GetConnectionString("QuoteJourneyConnection")));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
            policy.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                .WithOrigins("http://localhost:3000"));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IQuoteService, QuoteService>();
builder.Services.AddScoped<IVehicleService, VehicleService>();
builder.Services.AddScoped<IAddressService, AddressService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors();

app.UseMiddleware<ApiKeyMiddleware>(configuration.GetSection("Authentication:API-KEY").Value);

app.MapControllers();

app.Run();