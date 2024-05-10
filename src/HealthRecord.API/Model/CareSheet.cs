namespace eHealthscape.HealthRecord.API.Model;

public class CareSheet
{
    public int Id { get; set; }
    public int NurseId { get; set; }
    public DateTime IssueAt { get; set; } = DateTime.Now;
    public string ProgressNote { get; set; } = default!;
    public string CareInstruction { get; set; } = default!;
    
    public Guid PatientRecordId { get; set; }
    public PatientRecord PatientRecord { get; set; }= default!;
}