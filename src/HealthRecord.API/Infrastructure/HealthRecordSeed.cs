namespace eHealthscape.HealthRecord.API.Infrastructure;

public class HealthRecordSeed(IWebHostEnvironment env) : IDbSeeder<HealthRecordContext>
{
    public Task SeedAsync(HealthRecordContext context)
    {
        if (env.IsDevelopment())
        {
            // TODO: Add seed data
            return Task.CompletedTask;
        }

        return Task.CompletedTask;
    }
}