using eHealthscape.SpeechRecognition.API.Grpc;

var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();
builder.Services.AddGrpc();

var app = builder.Build();

app.MapGrpcService<SpeechService>();

app.Run();