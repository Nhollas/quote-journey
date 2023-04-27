using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
        {
            string pem = configuration.GetSection("Authentication:CLERK_JWT_VERIFICATION_KEY").Value!;
            string[] splitPem = Regex.Matches(pem, ".{1,64}").Select(m => m.Value).ToArray();
            string publicKey = "-----BEGIN PUBLIC KEY-----\n" + string.Join("\n", splitPem) + "\n-----END PUBLIC KEY-----";
            RSA rsa = RSA.Create();
            rsa.ImportFromPem(publicKey);
            SecurityKey issuerSigningKey = new RsaSecurityKey(rsa);

            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = "https://measured-bird-88.clerk.accounts.dev",
                ValidateIssuer = true,
                ValidateLifetime = true,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = issuerSigningKey
            };
        }
    );


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

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ApiKeyMiddleware>(configuration.GetSection("Authentication:API-KEY").Value);

app.MapControllers();

app.Run();