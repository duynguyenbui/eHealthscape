namespace eHealthscape.SpeechRecognition.API.Repositories;

public interface ISpeechRecognitionRepository
{
    Task<ExaminationSpeech?> SaveSpeechTextAsync(ExaminationSpeech? speech);
    Task<ExaminationSpeech?> GetSpeechTextAsync(string? userId, string? patientId);
    Task<List<ExaminationSpeech>> GetSpeechesByUserIdAsync(string userId);
    Task<List<ExaminationSpeech>> GetSpeechesByPatientIdAsync(string patientId);
}