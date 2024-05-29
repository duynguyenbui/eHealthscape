using eHealthscape.SpeechRecognition.API.Model;

namespace eHealthscape.SpeechRecognition.API.Repositories;

public interface ISpeechRecognitionRepository
{
    Task<Speech?> SaveSpeechTextAsync(Speech? speech);
    Task<Speech?> GetSpeechTextAsync(string? userId, string? patientId);
    Task<List<Speech>> GetSpeechesByUserIdAsync(string userId);
    Task<List<Speech>> GetSpeechesByPatientIdAsync(string patientId);
}