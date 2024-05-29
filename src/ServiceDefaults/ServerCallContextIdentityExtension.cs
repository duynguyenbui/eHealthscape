using System.Security.Claims;

using Microsoft.AspNetCore.Http;

namespace eHealthscape.ServiceDefaults;

public static class ServerCallContextIdentityExtension
{
    public static string? GetUserIdentity(this HttpContext context) => context.User.FindFirst("sub")?.Value;

    public static string? GetUserName(this HttpContext context) =>
        context.User.FindFirst(x => x.Type == ClaimTypes.Name)?.Value;

    public static string? GetRole(this HttpContext context) =>
        context.User.FindFirst("Role")?.Value;
}