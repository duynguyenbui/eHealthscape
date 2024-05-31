namespace eHealthscape.SpeechRecognition.API.Repositories;

public class RedisSpeechRecognitionRepository(
    ILogger<RedisSpeechRecognitionRepository> logger,
    IConnectionMultiplexer redis)
    : ISpeechRecognitionRepository
{
    private readonly IDatabase _database = redis.GetDatabase();
    private readonly IServer _server = redis.GetServer(redis.GetEndPoints().First());

    private static RedisKey SpeechKeyPrefix = "/speech/"u8.ToArray();

    private static RedisKey GetSpeechKey(string? userId, string? patientId) => SpeechKeyPrefix
        .Append(userId)
        .Append("/")
        .Append(patientId);

    public async Task<ExaminationSpeech?> SaveSpeechTextAsync(ExaminationSpeech? examination)
    {
        var json = JsonSerializer.SerializeToUtf8Bytes(examination,
            ExaminationSerializationContext.Default.ExaminationSpeech!);

        var created =
            await _database.StringSetAsync(GetSpeechKey(examination?.UserId, examination?.PatientRecordId), json);

        if (!created)
        {
            logger.LogInformation("Problem occurred persisting the item.");
            return null;
        }

        logger.LogInformation("ExaminationSpeech persisted successfully.");
        return await GetSpeechTextAsync(examination.UserId, examination.PatientRecordId);
    }

    public async Task<ExaminationSpeech?> GetSpeechTextAsync(string? userId, string? patientId)
    {
        using var data = await _database.StringGetLeaseAsync(GetSpeechKey(userId, patientId));

        if (data is null || data.Length == 0)
        {
            return null;
        }

        return JsonSerializer.Deserialize(data.Span, ExaminationSerializationContext.Default.ExaminationSpeech);
    }

    public async Task<List<ExaminationSpeech>> GetSpeechesByUserIdAsync(string userId)
    {
        var keys = new List<RedisKey>();
        var userKeyPattern = $"/speech/{userId}*";

        await foreach (var key in _server.KeysAsync(pattern: userKeyPattern))
        {
            keys.Add(key);
        }

        var examinationSpeeches = new List<ExaminationSpeech>();
        foreach (var key in keys)
        {
            var data = await _database.StringGetAsync(key);
            if (!data.IsNullOrEmpty)
            {
                var examinationSpeech =
                    JsonSerializer.Deserialize(data, ExaminationSerializationContext.Default.ExaminationSpeech);
                if (examinationSpeech != null)
                {
                    examinationSpeeches.Add(examinationSpeech);
                }
            }
        }

        return examinationSpeeches;
    }

    public async Task<List<ExaminationSpeech>> GetSpeechesByPatientIdAsync(string patientId)
    {
        var keys = new List<RedisKey>();
        var patientKeyPattern = $"/speech/*/{patientId}";

        await foreach (var key in _server.KeysAsync(pattern: patientKeyPattern))
        {
            keys.Add(key);
        }

        var speeches = new List<ExaminationSpeech>();
        foreach (var key in keys)
        {
            var data = await _database.StringGetAsync(key);
            if (!data.IsNullOrEmpty)
            {
                var speech =
                    JsonSerializer.Deserialize(data, ExaminationSerializationContext.Default.ExaminationSpeech);
                if (speech != null)
                {
                    speeches.Add(speech);
                }
            }
        }

        return speeches;
    }
}

[JsonSerializable(typeof(ExaminationSpeech))]
[JsonSourceGenerationOptions(PropertyNameCaseInsensitive = true)]
public partial class ExaminationSerializationContext : JsonSerializerContext;