namespace eHealthscape.SpeechRecognition.API.Model;

public class Speech
{
    public string? UserId { get; set; }
    public string? Text { get; set; }
    public string? PatientId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}