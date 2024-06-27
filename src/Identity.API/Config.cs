using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace Identity.API;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[] { new IdentityResources.OpenId(), new IdentityResources.Profile(), };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[] { new("healthrecords", "Health Resource Access"), new("speech", "Speech Resource Access") };

    public static IEnumerable<Client> Clients(IConfiguration configuration) =>
        new Client[]
        {
            new()
            {
                ClientId = "healthrecordsswaggerui",
                ClientName = "HealthRecord Swagger UI",
                AllowedGrantTypes = GrantTypes.Implicit,
                AllowAccessTokensViaBrowser = true,
                RedirectUris = { $"{configuration["HealthRecordApiClient"]}/swagger/oauth2-redirect.html" },
                PostLogoutRedirectUris = { $"{configuration["HealthRecordApiClient"]}/swagger/" },
                AlwaysIncludeUserClaimsInIdToken = true,
                AllowedScopes = { "healthrecords" }
            },
            new()
            {
                ClientId = "speechswaggerui",
                ClientName = "Speech Swagger UI",
                AllowedGrantTypes = GrantTypes.Implicit,
                AllowAccessTokensViaBrowser = true,
                RedirectUris = { $"{configuration["SpeechApiClient"]}/swagger/oauth2-redirect.html" },
                PostLogoutRedirectUris = { $"{configuration["SpeechApiClient"]}/swagger/" },
                AlwaysIncludeUserClaimsInIdToken = true,
                AllowedScopes = { "speech" }
            },
            new()
            {
                ClientId = "webapp",
                ClientName = "webApp",
                ClientSecrets = { new Secret("secret".Sha256()) },
                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                RequirePkce = false,
                RedirectUris = { configuration["WebAppClient"] + "/api/auth/callback/id-server" },
                AllowOfflineAccess = true,
                AllowedScopes = { "openid", "profile", "healthrecords", "speech" },
                AccessTokenLifetime = 3600 * 24 * 30, // 30 days
                AlwaysIncludeUserClaimsInIdToken = true,
            }
        };
}