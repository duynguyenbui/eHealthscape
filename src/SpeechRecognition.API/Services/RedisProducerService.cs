using eHealthscape.SpeechRecognition.API.Model;

namespace eHealthscape.SpeechRecognition.API.Services;

public class RedisProducerService
{
    private readonly ILogger<RedisProducerService> _logger;
    private readonly ConnectionMultiplexer _connectionMultiplexer;
    private readonly string _channel = "speeches";

    public RedisProducerService(IConfiguration configuration, ILogger<RedisProducerService> logger)
    {
        _logger = logger;

        var connectionString = configuration.GetConnectionString("Redis");
        _connectionMultiplexer = ConnectionMultiplexer.Connect(connectionString);
    }

    public async Task PublishAsync(Speech speech)
    {
        var sub = _connectionMultiplexer.GetSubscriber();

        _logger.LogInformation("Producer running at: {time}", DateTimeOffset.Now);
        
        var json = JsonSerializer.SerializeToUtf8Bytes(speech, SpeechSerializationContext.Default.Speech!);
        
        await sub.PublishAsync(_channel, json);
    }
}

