using Npgsql;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://0.0.0.0:8080");
var app = builder.Build();

object HealthPayload() => new { status = "ok", service = "ecommerce-api" };
object InfoPayload() => new
{
    service = "ecommerce-api",
    version = typeof(Program).Assembly.GetName().Version?.ToString() ?? "unknown"
};

var connectionString =
    builder.Configuration.GetConnectionString("Postgres")
    ?? builder.Configuration["POSTGRES_CONNECTION"]
    ?? Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? "Host=localhost;Port=5432;Username=app;Password=app_pw;Database=appdb";

var dataSource = new NpgsqlDataSourceBuilder(connectionString).Build();

// API routes
app.MapGet("/api/health", () => Results.Ok(HealthPayload()));
app.MapGet("/api/info", () => Results.Ok(InfoPayload()));

// Support both /api/* and root path to handle ingress rewrite differences
async Task<IResult> GetUsers()
{
    await using var conn = await dataSource.OpenConnectionAsync();
    await using var cmd = new NpgsqlCommand("SELECT id, name, email FROM users ORDER BY id;", conn);
    await using var reader = await cmd.ExecuteReaderAsync();

    var users = new List<UserRow>();
    while (await reader.ReadAsync())
    {
        users.Add(new UserRow(
            reader.GetInt32(0),
            reader.GetString(1),
            reader.GetString(2)
        ));
    }

    return Results.Ok(users);
}

app.MapGet("/api/datatest", GetUsers);

app.MapGet("/", () => Results.Redirect("/api/health"));

app.Run();

record UserRow(int Id, string Name, string Email);
