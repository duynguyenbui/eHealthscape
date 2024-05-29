namespace eHealthscape.HealthRecord.FunctionalTests;

public class HealthRecordApiTests : IClassFixture<HealthRecordApiFixture>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _httpClient;

    public HealthRecordApiTests(HealthRecordApiFixture fixture)
    {
        var handler = new ApiVersionHandler(new QueryStringApiVersionWriter(), new ApiVersion(1.0));

        this._factory = fixture;
        this._httpClient = _factory.CreateDefaultClient(handler);
    }

    [Fact]
    public async Task CalledHealthRecordApiV1_0_ReturnsHealthRecordApiV1_0()
    {
        // Act
        var response = await _httpClient.GetAsync("/api/hello-world");

        // Assert
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();

        // Assert with "Health Record API V1.0"
        Assert.Equal("Hello, world!", body);
    }
}