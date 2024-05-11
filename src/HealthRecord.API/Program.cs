var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();

var withApiVersioning = builder.Services.AddApiVersioning();
builder.AddDefaultOpenApi(withApiVersioning);

var app = builder.Build();

app.NewVersionedApi("HealthRecord").MapHealthRecordV1();
app.UseDefaultOpenApi();

app.Run();

public partial class Program;