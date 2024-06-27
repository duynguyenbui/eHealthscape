using eHealthscape.ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapGet("/", () => "Welcome to BFF!");
app.MapReverseProxy();
app.MapDefaultEndpoints();

app.Run();