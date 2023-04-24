namespace QuoteJourney.API.Middleware;

public class ApiKeyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _apiKey;

    public ApiKeyMiddleware(RequestDelegate next, string apiKey)
    {
        _next = next;
        _apiKey = apiKey;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (!context.Request.Headers.TryGetValue("x-api-key", out var apiKeyHeader) ||
            apiKeyHeader != _apiKey)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Unauthorized: Invalid API key");
            return;
        }

        await _next(context);
    }
}