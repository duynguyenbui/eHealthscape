var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();
builder.AddServiceDefaults();

var withApiVersioning = builder.Services.AddApiVersioning();
builder.AddDefaultOpenApi(withApiVersioning);

var app = builder.Build();

app.MapDefaultEndpoints();
app.UseDefaultOpenApi();
app.NewVersionedApi("HealthRecord").MapHealthRecordV1(); //.RequireAuthorization();

app.MapGet("/error", context => throw new Exception());

app.Run();