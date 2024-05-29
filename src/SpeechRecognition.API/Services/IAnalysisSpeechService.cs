namespace eHealthscape.SpeechRecognition.API.Services;

public interface IAnalysisSpeechService
{
    /// <summary>Gets whether the AI system is enabled.</summary>
    bool IsEnabled { get; }
    
    Task<string?> GetSuggestionAsync(string text);
}