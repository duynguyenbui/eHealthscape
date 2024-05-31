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
        [AsParameters] SpeechRecognitionServices services, ExaminationSpeech? speech)
    {
        if (speech == null) return TypedResults.BadRequest("Something went wrong!!");
        
        // TODO: Implement AI for completion
        await services.SpeechRecognitionRepository.SaveSpeechTextAsync(speech);
        
        await services.RedisProducerService.PublishAsync(speech);
        
        return TypedResults.Ok();
    }
}