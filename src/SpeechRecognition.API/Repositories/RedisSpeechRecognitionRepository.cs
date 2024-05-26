using eHealthscape.SpeechRecognition.API.Model;

namespace eHealthscape.SpeechRecognition.API.Repositories;

public class RedisSpeechRecognitionRepository(
    ILogger<RedisSpeechRecognitionRepository> logger,
    IConnectionMultiplexer redis)
    : ISpeechRecognitionRepository
{
    private readonly IDatabase _database = redis.GetDatabase();
    private readonly IServer _server = redis.GetServer(redis.GetEndPoints().First());

    private static RedisKey SpeechKeyPrefix = "/speech/"u8.ToArray();

    private static RedisKey GetSpeechKey(string userId, string patientId) => SpeechKeyPrefix
        .Append(userId)
        .Append("/")
        .Append(patientId);

    public async Task<Speech> SaveSpeechTextAsync(Speech speech)
    {
        var json = JsonSerializer.SerializeToUtf8Bytes(speech, SpeechSerializationContext.Default.Speech);

        var created = await _database.StringSetAsync(GetSpeechKey(speech.UserId, speech.PatientId), json);

        if (!created)
        {
            logger.LogInformation("Problem occurred persisting the item.");
            return null;
        }

        logger.LogInformation("Speech persisted successfully.");
        return await GetSpeechTextAsync(speech.UserId, speech.PatientId);
    }

    public async Task<Speech> GetSpeechTextAsync(string userId, string patientId)
    {
        using var data = await _database.StringGetLeaseAsync(GetSpeechKey(userId, patientId));

        if (data is null || data.Length == 0)
        {
            return null;
        }

        return JsonSerializer.Deserialize(data.Span, SpeechSerializationContext.Default.Speech);
    }

    public async Task<List<Speech>> GetSpeechesByUserIdAsync(string userId)
    {
        var keys = new List<RedisKey>();
        var userKeyPattern = $"/speech/{userId}*";

        await foreach (var key in _server.KeysAsync(pattern: userKeyPattern))
        {
            keys.Add(key);
        }

        var speeches = new List<Speech>();
        foreach (var key in keys)
        {
            var data = await _database.StringGetAsync(key);
            if (!data.IsNullOrEmpty)
            {
                var speech = JsonSerializer.Deserialize(data, SpeechSerializationContext.Default.Speech);
                if (speech != null)
                {
                    speeches.Add(speech);
                }
            }
        }

        return speeches;
    }

    public async Task<List<Speech>> GetSpeechesByPatientIdAsync(string patientId)
    {
        var keys = new List<RedisKey>();
        var patientKeyPattern = $"/speech/*/{patientId}";

        await foreach (var key in _server.KeysAsync(pattern: patientKeyPattern))
        {
            keys.Add(key);
        }

        var speeches = new List<Speech>();
        foreach (var key in keys)
        {
            var data = await _database.StringGetAsync(key);
            if (!data.IsNullOrEmpty)
            {
                var speech = JsonSerializer.Deserialize<Speech>(data, SpeechSerializationContext.Default.Speech);
                if (speech != null)
                {
                    speeches.Add(speech);
                }
            }
        }

        return speeches;
    }
}

[JsonSerializable(typeof(Speech))]
[JsonSourceGenerationOptions(PropertyNameCaseInsensitive = true)]
public partial class SpeechSerializationContext : JsonSerializerContext
{
}