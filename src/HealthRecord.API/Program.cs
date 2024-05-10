var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

// Write an api route return fake health record
app.MapGet("/api/healthrecord", () => new { Status = "Healthy" });

app.Run();