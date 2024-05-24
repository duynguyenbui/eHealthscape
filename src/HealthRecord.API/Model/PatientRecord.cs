namespace eHealthscape.HealthRecord.API.Model;

public class PatientRecord
{
    public Guid Id { get; set; }
    public Guid NurseId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Guid PatientId { get; set; }
    public Patient Patient { get; set; } = default!;

    public List<Examination> Examinations { set; get; }

    public List<CareSheet> CareSheets { set; get; }
    
    public List<VitalSign> VitalSigns { set; get; }
}