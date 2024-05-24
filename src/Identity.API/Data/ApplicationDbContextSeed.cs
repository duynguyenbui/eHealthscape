namespace Identity.API.Data;

public class ApplicationDbContextSeed : IDbSeeder<ApplicationDbContext>
{
    public Task SeedAsync(ApplicationDbContext context)
    {
        return Task.CompletedTask;
    }
}