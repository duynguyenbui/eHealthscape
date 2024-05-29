using Microsoft.AspNetCore.Http.HttpResults;

namespace eHealthscape.SpeechRecognition.API.Apis;

public static class SpeechRecognitionApi
{
    public static RouteGroupBuilder MapSpeechRecognitionV1(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("api").HasApiVersion(1.0);

        api.MapPost("/speech-completion", SpeechCompletion);
        return api;
    }

    public static async Task<Results<Ok, BadRequest<string>>> SpeechCompletion(
        [AsParameters] SpeechRecognitionServices services, Speech? speech)
    {
        if (speech.Text == null) return TypedResults.BadRequest("Missing speech text");

        // TODO: Completion Speech
        await services.RedisProducerService.PublishAsync(speech);

        await services.SpeechRecognitionRepository.SaveSpeechTextAsync(speech);

        return TypedResults.Ok();
    }
}