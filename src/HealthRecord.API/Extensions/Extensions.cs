public static class Extensions
{
    /// <summary>
    /// Adds the necessary application services to the specified IHostApplicationBuilder.
    /// </summary>
    /// <param name="builder">The IHostApplicationBuilder to add services to.</param>
    public static void AddApplicationServices(this IHostApplicationBuilder builder)
    {
        builder.Services.AddDbContext<HealthRecordContext>(opts =>
            opts.UseNpgsql(builder.Configuration.GetConnectionString("Database")));

        // REVIEW: This is done for development ease but shouldn't be here in production
        builder.Services.AddMigration<HealthRecordContext, HealthRecordSeed>();

        builder.AddDefaultAuthentication();

        builder.Services.AddOpenTelemetry()
            .WithMetrics(providerBuilder =>
            {
                providerBuilder.AddPrometheusExporter();
                providerBuilder.AddMeter("Microsoft.AspNetCore.Hosting", "Microsoft.AspNetCore.Server.Kestrel");
                providerBuilder.AddView("http.server.request.duration",
                    new ExplicitBucketHistogramConfiguration
                    {
                        Boundaries = [0, 0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10]
                    });
            });
    }
}