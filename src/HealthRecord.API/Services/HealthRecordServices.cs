namespace eHealthscape.HealthRecord.API.Services;

public class HealthRecordServices(
    HealthRecordContext context,
    ILogger<HealthRecordServices> logger)
{
    public HealthRecordContext Context { get; } = context;
    public ILogger<HealthRecordServices> Logger { get; } = logger;
}