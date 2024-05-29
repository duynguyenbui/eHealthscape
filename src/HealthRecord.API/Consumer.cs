using System.Text.Json;

namespace eHealthscape.HealthRecord.API;

public class Consumer : BackgroundService
{
    private readonly ILogger<Consumer> _logger;

    private readonly ConnectionMultiplexer _connectionMultiplexer;

    // TODO: Implement a proper message bus and put environment into configuration file 
    private readonly string _channel = "speeches";

    public Consumer(IConfiguration configuration, ILogger<Consumer> logger)
    {
        _logger = logger;

        var connectionString = configuration.GetConnectionString("Redis")!;
        _connectionMultiplexer = ConnectionMultiplexer.Connect(connectionString);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var sub = _connectionMultiplexer.GetSubscriber();

        await sub.SubscribeAsync(_channel, (channel, message) =>
        {
            var speech = JsonSerializer.Deserialize<Speech>(message);
            _logger.LogInformation("Message received in {Channel}: {speech}", channel, speech.Text);
        });
    }
}

public class Speech
{
    public string? UserId { get; set; }
    public string? Text { get; set; }
    public string? PatientId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}