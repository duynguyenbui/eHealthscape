namespace eHealthscape.HealthRecord.API.Model;

public class CareSheet
{
    public Guid Id { get; set; }
    public Guid NurseId { get; set; }
    public DateTime IssueAt { get; set; } = DateTime.UtcNow;
    public string ProgressNote { get; set; } = default!;
    public string CareInstruction { get; set; } = default!;

    public Guid PatientRecordId { get; set; }
    public PatientRecord PatientRecord { get; set; } = default!;
}