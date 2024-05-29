var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();

var app = builder.Build();

app.Map("/", (HttpContext context) =>
{
    var scope = context.RequestServices.CreateScope();

    var redisProducer = scope.ServiceProvider.GetRequiredService<RedisProducerService>();

    _ = redisProducer.PublishAsync(new Speech()
    {
        UserId = "user123",
        Text = "The patient reported feeling much better after the medication change.",
        PatientId = "patient001"
    });
});

Task.Run(async () =>
{
    var scope = app.Services.CreateScope();

    var redisProducer = scope.ServiceProvider.GetRequiredService<RedisProducerService>();

    while (true)
    {
        await redisProducer.PublishAsync(new Speech()
        {
            UserId = Guid.NewGuid().ToString(),
            Text = Guid.NewGuid() + ":::The patient reported feeling much better after the medication change",
            PatientId = Guid.NewGuid().ToString()
        });

        await Task.Delay(5000);
    }
});

app.Run();