using Ecommerce.Api.Endpoints;
using Ecommerce.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://0.0.0.0:8080");

var connectionString =
    builder.Configuration.GetConnectionString("Postgres")
    ?? builder.Configuration["POSTGRES_CONNECTION"]
    ?? Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? "Host=localhost;Port=5432;Username=app;Password=app_pw;Database=appdb";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

var configuredOrigins = (builder.Configuration["AllowedOrigins"]
        ?? builder.Configuration["ALLOWED_ORIGINS"])
    ?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? Array.Empty<string>();

var defaultOrigins = new[]
{
    "https://dapang.live",
    "https://www.dapang.live",
    "http://localhost:5173",
};

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            // Allow configured origins or any dapang.live subdomain to avoid CORS drift between www/api hosts.
            .SetIsOriginAllowed(origin =>
            {
                if (configuredOrigins.Contains(origin, StringComparer.OrdinalIgnoreCase))
                {
                    return true;
                }

                if (defaultOrigins.Contains(origin, StringComparer.OrdinalIgnoreCase))
                {
                    return true;
                }

                return Uri.TryCreate(origin, UriKind.Absolute, out var uri)
                    && uri.Host.EndsWith(".dapang.live", StringComparison.OrdinalIgnoreCase);
            })
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

app.MapHealthEndpoints();
app.MapInfoEndpoints();
app.MapRoomTypeEndpoints();
app.MapBookingEndpoints();
app.MapTestEndpoints();

app.MapGet("/", () => Results.Redirect("/health"));

app.Run();
