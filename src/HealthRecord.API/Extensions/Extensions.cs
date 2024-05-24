using eHealthscape.HealthRecord.API.Infrastructure;

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
    }
}