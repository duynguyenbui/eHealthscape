var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();
var withApiVersioning = builder.Services.AddApiVersioning();


var app = builder.Build();

app.NewVersionedApi("HealthRecord").MapHealthRecordV1();

app.Run();