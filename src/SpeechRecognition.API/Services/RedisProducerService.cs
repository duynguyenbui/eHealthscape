namespace eHealthscape.SpeechRecognition.API.Services;

public class RedisProducerService
{
    private readonly ILogger<RedisProducerService> _logger;
    private readonly ConnectionMultiplexer _connectionMultiplexer;
    private readonly string _prefix;
    private readonly string[] _channels;
    private int _currentChannelIndex;

    public RedisProducerService(IConfiguration configuration, ILogger<RedisProducerService> logger)
    {
        _logger = logger;

        _prefix = configuration.GetRequiredValue("Prefix");
        var numberOfConsumers = configuration.GetValue<int>("NumberOfConsumers");

        _channels = new string[numberOfConsumers];

        for (int i = 0; i < numberOfConsumers; i++)
        {
            _channels[i] = $"{_prefix}{i + 1}";
        }

        var connectionString = configuration.GetConnectionString("Redis");
        _connectionMultiplexer = ConnectionMultiplexer.Connect(connectionString);
    }

    public async Task PublishAsync(ExaminationSpeech examinationSpeech)
    {
        var sub = _connectionMultiplexer.GetSubscriber();


        var json = JsonSerializer.SerializeToUtf8Bytes(examinationSpeech,
            ExaminationSerializationContext.Default.ExaminationSpeech!);

        var channel = _channels[_currentChannelIndex];
        await sub.PublishAsync(channel, json);

        _logger.LogInformation("Producer running at: {time} in queue: {queue}", DateTimeOffset.Now, channel);

        _currentChannelIndex = (_currentChannelIndex + 1) % _channels.Length;
    }
}