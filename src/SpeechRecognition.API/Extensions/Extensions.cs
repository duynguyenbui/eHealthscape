using eHealthscape.SpeechRecognition.API.Services;

namespace eHealthscape.SpeechRecognition.API.Extensions;

public static class Extensions
{
    public static void AddApplicationServices(this IHostApplicationBuilder builder)
    {
        builder.AddDefaultAuthentication();

        builder.Services.AddSingleton<IConnectionMultiplexer>(
            ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("Redis")!));

        builder.Services.AddScoped<ISpeechRecognitionRepository, RedisSpeechRecognitionRepository>();
        builder.Services.AddScoped<RedisProducerService>();

        if (builder.Configuration.GetSection("AI").Exists())
        {
            builder.Services.AddOpenAIServices(options =>
            {
                options.ApiUrl = builder.Configuration["AI:OpenAI:BaseUrl"]!;
                options.ApiKey = builder.Configuration["AI:OpenAI:ApiKey"]!;
            });
            builder.Services.AddScoped<IAnalysisSpeechService, AnalysisSpeechService>();
        }
    }
}