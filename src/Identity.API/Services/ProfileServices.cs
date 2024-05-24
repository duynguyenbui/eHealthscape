using System.Security.Claims;

using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;

using Identity.API.Models;

using IdentityModel;

using Microsoft.AspNetCore.Identity;

namespace Identity.API.Services;

public class ProfileService(UserManager<ApplicationUser> userMgr) : IProfileService
{
    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await userMgr.GetUserAsync(context.Subject);
        if (user != null)
        {
            var roles = await userMgr.GetRolesAsync(user);
            context.IssuedClaims.Add(new Claim(JwtClaimTypes.Role, roles.First()));
            context.IssuedClaims.Add(new Claim(JwtClaimTypes.Name, user.UserName ?? string.Empty));
            context.IssuedClaims.Add(new Claim(JwtClaimTypes.Email, user.Email ?? string.Empty));
        }
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        return Task.CompletedTask;
    }
}