namespace eHealthscape.SpeechRecognition.API.Grpc;

public class SpeechService(ISpeechRecognitionRepository repository, ILogger<SpeechService> logger)
    : SpeechRecognitionService.SpeechRecognitionServiceBase
{
    private readonly ISpeechRecognitionRepository _repository = repository;
    private readonly ILogger<SpeechService> _logger = logger;

    public override Task<SaveSpeechTextResponse> SaveSpeechText(SaveSpeechTextRequest request,
        ServerCallContext context)
    {
        return base.SaveSpeechText(request, context);
    }

    public override Task<GetSpeechTextResponse> GetSpeechText(GetSpeechTextRequest request, ServerCallContext context)
    {
        return base.GetSpeechText(request, context);
    }

    public override Task<GetSpeechesResponse> GetSpeechesByUserId(GetSpeechesByUserIdRequest request,
        ServerCallContext context)
    {
        return base.GetSpeechesByUserId(request, context);
    }

    public override Task<GetSpeechesResponse> GetSpeechesByPatientId(GetSpeechesByPatientIdRequest request,
        ServerCallContext context)
    {
        return base.GetSpeechesByPatientId(request, context);
    }
}