using Identity.API;
using Identity.API.Data;

using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up");

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddMigration<ApplicationDbContext>();

    builder.Host.UseSerilog((ctx, lc) => lc
        .WriteTo.Console(
            outputTemplate:
            "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
        .Enrich.FromLogContext()
        .ReadFrom.Configuration(ctx.Configuration));


    var app = builder
        .ConfigureServices()
        .ConfigurePipeline();


    // this seeding is only for the template to bootstrap the DB and users.
    // in production, you will likely want a different approach.

    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        if (dbContext.Users.Any() == false)
        {
            Log.Information("Seeding database...");
            SeedData.EnsureSeedData(app);

            Log.Information("Done seeding database. Exiting.");

            await SeedData.EnsureSeedRole(app);
            return;
        }
    }


    app.Run();
}
catch (Exception ex) when (ex is not HostAbortedException)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}