namespace eHealthscape.HealthRecord.API.Infrastructure;

public class HealthRecordSeed(IWebHostEnvironment env) : IDbSeeder<DbContext>
{
    public Task SeedAsync(DbContext dbContext)
    {
        return Task.CompletedTask;
    }
}