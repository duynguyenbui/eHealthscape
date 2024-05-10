namespace eHealthscape.HealthRecord.API.Infrastructure.Exceptions;

/// <summary>
/// Exception type for app exceptions
/// </summary>
public class HealthRecordException : Exception
{
    public HealthRecordException()
    {
    }

    public HealthRecordException(string message)
        : base(message)
    {
    }

    public HealthRecordException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}