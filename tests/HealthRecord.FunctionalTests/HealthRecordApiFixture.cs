using WebMotions.Fake.Authentication.JwtBearer;

namespace eHealthscape.HealthRecord.FunctionalTests;

public class HealthRecordApiFixture : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgreSqlContainer = new PostgreSqlBuilder()
        .WithUsername("postgres")
        .WithPassword("postgrespw")
        .WithImage("postgres:latest")
        .Build();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                     typeof(DbContextOptions<HealthRecordContext>));

            services.Remove(dbContextDescriptor!);

            services.AddDbContext<HealthRecordContext>(optionsBuilder =>
            {
                optionsBuilder.UseNpgsql(_postgreSqlContainer.GetConnectionString());
            });

            services.AddAuthentication(FakeJwtBearerDefaults.AuthenticationScheme)
                .AddFakeJwtBearer(opt => opt.BearerValueType = FakeJwtBearerBearerValueType.Jwt);
        });

        builder.UseEnvironment("Development");
    }

    public async Task InitializeAsync() => await _postgreSqlContainer.StartAsync();

    Task IAsyncLifetime.DisposeAsync() => _postgreSqlContainer.DisposeAsync().AsTask();
}