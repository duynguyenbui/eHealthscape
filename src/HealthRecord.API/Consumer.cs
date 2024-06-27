using System.Text.Json;

namespace eHealthscape.HealthRecord.API;

#pragma warning disable CS0618
public class Consumer : BackgroundService
{
    private readonly ILogger<Consumer> _logger;

    private readonly ConnectionMultiplexer _connectionMultiplexer;

    private IServiceScopeFactory _serviceScopeFactory;

    private readonly string _channel = "speeches";

    public Consumer(IConfiguration configuration, ILogger<Consumer> logger, IServiceScopeFactory serviceScopeFactory)
    {
        _logger = logger;
        _serviceScopeFactory = serviceScopeFactory;

        var connectionString = configuration.GetConnectionString("Redis")!;
        _connectionMultiplexer = ConnectionMultiplexer.Connect(connectionString);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var sub = _connectionMultiplexer.GetSubscriber();

        await sub.SubscribeAsync(_channel, async (channel, message) =>
        {
            try
            {
                var speech = JsonSerializer.Deserialize<ExaminationSpeech>(message!);
                if (speech == null)
                {
                    _logger.LogWarning("Received a null message in {Channel}", channel);
                    return;
                }

                _logger.LogInformation("Message received in {Channel}: {Speech}", channel, speech.ProgressNote);

                if (string.IsNullOrEmpty(speech.UserId) || string.IsNullOrEmpty(speech.PatientRecordId))
                {
                    _logger.LogWarning("Invalid message data: UserId or PatientRecordId is null or empty.");
                    return;
                }

                using var scope = _serviceScopeFactory.CreateScope();
                var services = scope.ServiceProvider.GetRequiredService<HealthRecordContext>();

                var patientRecord = await services.PatientRecords.FindAsync(Guid.Parse(speech.PatientRecordId));

                if (patientRecord == null)
                {
                    _logger.LogWarning("Patient record not found for ID: {PatientRecordId}", speech.PatientRecordId);
                    return;
                }

                var examination = new Examination
                {
                    ProgressNote = speech.ProgressNote,
                    MedicalServices = speech.MedicalServices,
                    Prescription = speech.Prescription,
                    PatientRecordId = Guid.Parse(speech.PatientRecordId),
                    IssueAt = speech.IssueAt,
                    PatientRecord = patientRecord,
                    DoctorId = Guid.Parse(speech.UserId)
                };

                await services.Examinations.AddAsync(examination, stoppingToken);
                await services.SaveChangesAsync(stoppingToken);

                _logger.LogInformation("Examination saved successfully for PatientRecordId: {PatientRecordId}",
                    speech.PatientRecordId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing message in {Channel}", channel);
            }
        });
    }
}

public class ExaminationSpeech
{
    public string? UserId { get; set; } // Equal to Doctor ID

    public string ProgressNote { get; set; } = default!;
    public string MedicalServices { get; set; } = default!;
    public string Prescription { get; set; } = default!;
    public string PatientRecordId { get; set; }

    public DateTime IssueAt { get; set; } = DateTime.UtcNow;
}