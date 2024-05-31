var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();
var withApiVersioning = builder.Services.AddApiVersioning();
builder.AddDefaultOpenApi(withApiVersioning);

var app = builder.Build();

app.NewVersionedApi().MapSpeechRecognitionV1()
    .RequireAuthorization();

app.UseDefaultOpenApi();

// Task.Run(async () =>
// {
//     var scope = app.Services.CreateScope();
//
//     var redisProducer = scope.ServiceProvider.GetRequiredService<RedisProducerService>();
//
//     while (true)
//     {
//         await redisProducer.PublishAsync(new ExaminationSpeech()
//         {
//             UserId = Guid.NewGuid().ToString(),
//             Text = Guid.NewGuid() + ":::The patient reported feeling much better after the medication change",
//             PatientId = Guid.NewGuid().ToString()
//         });
//
//         await Task.Delay(5000);
//     }
// });

app.Run();