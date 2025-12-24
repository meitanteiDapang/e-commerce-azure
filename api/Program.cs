var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));
app.MapGet("/api/info", () => Results.Ok(new
{
    service = "ecommerce-api",
    version = typeof(Program).Assembly.GetName().Version?.ToString() ?? "unknown"
}));
app.MapGet("/", () => Results.Redirect("/api/health"));

app.Run();
