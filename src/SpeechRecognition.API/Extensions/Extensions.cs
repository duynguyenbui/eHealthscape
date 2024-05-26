using eHealthscape.ServiceDefaults;

namespace eHealthscape.SpeechRecognition.API.Extensions;

public static class Extensions
{
    public static void AddApplicationServices(this IHostApplicationBuilder builder)
    {
        builder.AddDefaultAuthentication();

        builder.Services.AddSingleton<IConnectionMultiplexer>(
            ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("Redis")!));

        builder.Services.AddScoped<ISpeechRecognitionRepository, RedisSpeechRecognitionRepository>();
    }
}