var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();

var app = builder.Build();

app.MapGet("/", async (HttpContext context) =>
{
    context.Response.ContentType = "text/event-stream";

    IAsyncEnumerable<string> chunks = TransformStringAsync(["Hello", "From", "Duy", "Nguyen", "BUI", "3000", "Times"]);

    await foreach (var chunk in chunks)
    {
        await context.Response.WriteAsync($"data: {chunk}\n");
        await context.Response.Body.FlushAsync();
    }

    await context.Response.CompleteAsync();
});

app.Run();

async IAsyncEnumerable<string> TransformStringAsync(IEnumerable<string> integers)
{
    foreach (var n in integers)
    {
        await Task.Delay(500);
        yield return n;
    }
}