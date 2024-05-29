using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace Identity.API;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[] { new IdentityResources.OpenId(), new IdentityResources.Profile(), };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[] { new("healthrecords"), new("speech") };

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
            // new()
            // {
            //     ClientId = "postman",
            //     ClientName = "Postman",
            //     AllowedScopes =
            //     {
            //         IdentityServerConstants.StandardScopes.Profile,
            //         IdentityServerConstants.StandardScopes.OpenId,
            //         "healthrecords"
            //     },
            //     AlwaysIncludeUserClaimsInIdToken = true,
            //     RedirectUris = { "https://www.getpostman.com/oauth2/callback" },
            //     ClientSecrets = new[] { new Secret("NotASecret".Sha256()) },
            //     AllowedGrantTypes = { GrantType.ResourceOwnerPassword }
            // },
            new()
            {
                ClientId = "webapp",
                ClientName = "WebApp",
                ClientSecrets = { new Secret("secret".Sha256()) },
                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                AllowAccessTokensViaBrowser = false,
                RequirePkce = false,
                RedirectUris = { configuration["WebAppClient"] + "/api/auth/callback/id-server" },
                AllowOfflineAccess = true,
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.OpenId,
                    "healthrecords",
                    "speech"
                },
                AccessTokenLifetime = 3600 * 24 * 30, // 30 days
                IdentityTokenLifetime = 3600 * 24 * 30, // 30 days
                AlwaysIncludeUserClaimsInIdToken = true,
                AccessTokenType = AccessTokenType.Jwt,
                PostLogoutRedirectUris = { configuration["WebAppClient"]! }
            }
        };
}