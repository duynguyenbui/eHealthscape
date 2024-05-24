namespace eHealthscape.HealthRecord.API.Model;

public class Examination
{
    public Guid Id { get; set; }
    public Guid DoctorId { get; set; }
    public DateTime IssueAt { get; set; } = DateTime.UtcNow;
    public string ProgressNote { get; set; } = default!;
    public string MedicalServices { get; set; } = default!;
    public string Prescription { get; set; } = default!;

    public Guid PatientRecordId { get; set; }
    public PatientRecord PatientRecord { get; set; } = default!;
}