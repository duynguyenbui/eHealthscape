using System.Text;

using Asp.Versioning.ApiExplorer;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace eHealthscape.ServiceDefaults;

internal sealed class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
{
    private readonly IApiVersionDescriptionProvider _provider;
    private readonly IConfiguration _configuration;

    public ConfigureSwaggerOptions(IApiVersionDescriptionProvider provider, IConfiguration configuration)
    {
        _provider = provider;
        _configuration = configuration;
    }

    public void Configure(SwaggerGenOptions options)
    {
        foreach (var description in _provider.ApiVersionDescriptions)
        {
            options.SwaggerDoc(description.GroupName, CreateInfoForApiVersion(description));
        }

        // TODO: Configure Authorization
    }

    private OpenApiInfo CreateInfoForApiVersion(ApiVersionDescription description)
    {
        // {
        //   "OpenApi": {
        //     "Document": {
        //         "Title": ..
        //         "Version": ..
        //         "Description": ..
        //     }
        //   }
        // }
        var openApi = _configuration.GetSection("OpenApi");
        var document = openApi.GetRequiredSection("Document");

        var info = new OpenApiInfo
        {
            Title = document.GetRequiredValue("Title"),
            Version = description.ApiVersion.ToString(),
            Description = BuildDescription(description, document.GetRequiredValue("Description"))
        };

        return info;
    }

    private static string BuildDescription(ApiVersionDescription api, string description)
    {
        var text = new StringBuilder(description);

        if (api.IsDeprecated)
        {
            if (text.Length > 0)
            {
                if (text[^1] != '.')
                {
                    text.Append('.');
                }

                text.Append(' ');
            }

            text.Append("This API version has been deprecated.");
        }

        if (api.SunsetPolicy is { } policy)
        {
            if (policy.Date is { } when)
            {
                if (text.Length > 0)
                {
                    text.Append(' ');
                }

                text.Append("The API will be sunset on ")
                    .Append(when.Date.ToShortDateString())
                    .Append('.');
            }

            if (policy.HasLinks)
            {
                text.AppendLine();

                var rendered = false;

                foreach (var link in policy.Links.Where(l => l.Type == "text/html"))
                {
                    if (!rendered)
                    {
                        text.Append("<h4>Links</h4><ul>");
                        rendered = true;
                    }

                    text.Append("<li><a href=\"");
                    text.Append(link.LinkTarget.OriginalString);
                    text.Append("\">");
                    text.Append(
                        StringSegment.IsNullOrEmpty(link.Title)
                            ? link.LinkTarget.OriginalString
                            : link.Title.ToString());
                    text.Append("</a></li>");
                }

                if (rendered)
                {
                    text.Append("</ul>");
                }
            }
        }

        return text.ToString();
    }
}