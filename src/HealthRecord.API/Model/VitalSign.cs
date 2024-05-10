namespace eHealthscape.HealthRecord.API.Model;

public class VitalSign
{
    public int Id { get; set; }
    public int Pulse { get; set; }
    public decimal BloodPressure { get; set; }
    public float Temperature { get; set; }
    public int Spo2 { get; set; }
    public int RespirationRate { get; set; }
    public float Height { get; set; }
    public float Weight { get; set; }
    public DateTime MeasureAt { get; set; }

    public Guid PatientRecordId { get; set; }
    public PatientRecord PatientRecord { get; set; } = default!;
}