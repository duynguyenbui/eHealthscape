namespace eHealthscape.SpeechRecognition.API.Services;

public class AnalysisSpeechService : IAnalysisSpeechService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<AnalysisSpeechService> _logger;
    private readonly IOpenAIService? _aiService;

    public AnalysisSpeechService(IConfiguration configuration, ILogger<AnalysisSpeechService> logger,
        IOpenAIService aiService)
    {
        _configuration = configuration;
        _logger = logger;

        if (_configuration.GetSection("AI").Exists())
        {
            _aiService = aiService;
        }
        else
        {
            _aiService = null;
        }

        IsEnabled = _aiService != null;
    }

    public bool IsEnabled { get; }

    public async Task<string?> GetSuggestionAsync(string text)
    {
        if (!IsEnabled)
        {
            _logger.LogCritical("AI Service Unavailable");
            return "AI Service is not enabled";
        }

        List<Message> messages = new List<Message>
        {
            Message.Create(ChatRoleType.System,
                "You are an intelligent assistant. You always provide well-reasoned answers that are both correct and helpful. You work in the medical industry."),
            Message.Create(ChatRoleType.User, text)
        };

        var response = await _aiService.Chat.Get(messages, o =>
        {
            o.MaxTokens = 1000;
        });

        return response.Result?.Choices[0].Message.Content;
    }
}