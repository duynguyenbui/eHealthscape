namespace eHealthscape.SpeechRecognition.API.Model;

public class ExaminationSpeech
{
    public string? UserId { get; set; } // Equal to Doctor ID
    public string ProgressNote { get; set; } = default!;
    public string MedicalServices { get; set; } = default!;
    public string Prescription { get; set; } = default!;
    public string PatientRecordId { get; set; }
    public DateTime IssueAt { get; set; } = DateTime.UtcNow;
}