namespace eHealthscape.SpeechRecognition.API.Services;

public class SpeechRecognitionServices
{
    public SpeechRecognitionServices(RedisProducerService redisProducerService,
        ISpeechRecognitionRepository speechRecognitionRepository)
    {
        RedisProducerService = redisProducerService;
        SpeechRecognitionRepository = speechRecognitionRepository;
    }

    public RedisProducerService RedisProducerService { get; }
    public ISpeechRecognitionRepository SpeechRecognitionRepository { get; }
}