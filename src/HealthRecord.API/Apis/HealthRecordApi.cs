namespace eHealthscape.HealthRecord.API.Apis;

public static class HealthRecordApi
{
    // Maps the Health Record V1 endpoint route. Handles the GET request for the Health Record API V1.0 and logs the activity.
    public static IEndpointRouteBuilder MapHealthRecordV1(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("api/healthrecord").HasApiVersion(1.0);
        
        api.MapGet("/",  ([AsParameters] HealthRecordServices services) =>
        {
            services.Logger.LogInformation("Called API route 'api/healthrecord'");
            return "Health Record API V1.0";
        });

        return app;
    }
}