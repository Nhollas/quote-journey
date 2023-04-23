using System.Security.Claims;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

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

builder.Services.AddAuthentication()
    .AddCookie("QuoteJourney", options =>
    {
        options.Cookie.Name = "QuoteId";
        // Hate this..
        options.LoginPath = "";
    })
    // This could be JWT or whatever..
    .AddCookie("Default", options =>
    {
        options.Cookie.Name = "Default";
        // Hate this..
        options.LoginPath = "";
    });

builder.Services.AddHttpContextAccessor();

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

app.MapGet("/fresh-quote", async (HttpContext context, string apiKey, IConfiguration configuration) =>
{
    // check if the API key query parameter is present
    if (apiKey != configuration.GetSection("Authentication:API-KEY").Value)
    {
        return Results.Unauthorized();
    }

    // sign in the user
    await context.SignInAsync("QuoteJourney", new ClaimsPrincipal(
        new ClaimsIdentity(
            new[] { new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()) },
            "QuoteJourney")));

    // return a response
    return Results.Ok();
});

app.MapGet("/fresh-quote-default", async (HttpContext context, string apiKey, IConfiguration configuration) =>
{
    // check if the API key query parameter is present
    if (apiKey != configuration.GetSection("Authentication:API-KEY").Value)
    {
        return Results.Unauthorized();
    }

    // sign in the user
    await context.SignInAsync("Default", new ClaimsPrincipal(
        new ClaimsIdentity(
            new[] { new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()) },
            "Default")));

    // return a response
    return Results.Ok();
});



app.MapControllers();

app.Run();