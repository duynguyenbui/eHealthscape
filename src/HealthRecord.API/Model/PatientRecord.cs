namespace eHealthscape.HealthRecord.API.Model;

public class PatientRecord
{
    public Guid Id { get; set; }
    public Guid NurseId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    
    public Guid PatientId { get; set; }
    public Patient Patient { get; set; } = default!;
}