var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.AddApplicationServices();
var withApiVersioning = builder.Services.AddApiVersioning();
builder.AddDefaultOpenApi(withApiVersioning);

var app = builder.Build();

app.MapDefaultEndpoints();
app.UseDefaultOpenApi();
app.NewVersionedApi().MapSpeechRecognitionV1()
    .RequireAuthorization();

app.MapGet("/error", () =>
{
    throw new NotImplementedException();
});
app.MapGet("/hello", () => "Hello, from Speech Recognition API");


app.Run();