using System.Security.Claims;

using IdentityModel;

using Identity.API.Data;
using Identity.API.Models;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Serilog;

namespace Identity.API;

public class SeedData
{
    public static void EnsureSeedData(WebApplication app)
    {
        using (var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.Migrate();

            var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var alice = userMgr.FindByNameAsync("alice").Result;
            if (alice == null)
            {
                alice = new ApplicationUser
                {
                    UserName = "alice", Email = "AliceSmith@email.com", EmailConfirmed = true,
                };
                var result = userMgr.CreateAsync(alice, "Pass123$").Result;
                // userMgr.AddToRoleAsync(alice, "Doctor");

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(alice,
                    new Claim[]
                    {
                        new Claim(JwtClaimTypes.Name, "Alice Smith"), new Claim(JwtClaimTypes.GivenName, "Alice"),
                        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                        new Claim(JwtClaimTypes.WebSite, "http://alice.com"),
                    }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                Log.Debug("alice created");
            }
            else
            {
                Log.Debug("alice already exists");
            }

            var bob = userMgr.FindByNameAsync("bob").Result;
            if (bob == null)
            {
                bob = new ApplicationUser { UserName = "bob", Email = "BobSmith@email.com", EmailConfirmed = true };
                var result = userMgr.CreateAsync(bob, "Pass123$").Result;

                // userMgr.AddToRoleAsync(bob, "Nurse");
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(bob,
                    new Claim[]
                    {
                        new Claim(JwtClaimTypes.Name, "Bob Smith"), new Claim(JwtClaimTypes.GivenName, "Bob"),
                        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                        new Claim(JwtClaimTypes.WebSite, "http://bob.com"), new Claim("location", "somewhere")
                    }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                Log.Debug("bob created");
            }
            else
            {
                Log.Debug("bob already exists");
            }
        }
    }

    public static async Task EnsureSeedRole(WebApplication app)
    {
        using (var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.Migrate();

            RoleManager<IdentityRole> roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var doctor = roleManager.FindByNameAsync("Doctor").Result;
            if (doctor == null)
            {
                doctor = new IdentityRole("Doctor");
                var result = roleManager.CreateAsync(doctor).Result;

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                var doctorRole = roleManager.FindByNameAsync("Doctor").Result;
                result = await roleManager.AddClaimAsync(doctorRole, new Claim(JwtClaimTypes.Role, "Doctor"));

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                Log.Debug("Doctor created");
            }
            else
            {
                Log.Debug("Doctor already exists");
            }

            var nurse = roleManager.FindByNameAsync("Nurse").Result;
            if (nurse == null)
            {
                nurse = new IdentityRole("Nurse");
                var result = roleManager.CreateAsync(nurse).Result;

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                var nurseRole = roleManager.FindByNameAsync("Nurse").Result;
                result = await roleManager.AddClaimAsync(nurseRole, new Claim(JwtClaimTypes.Role, "Nurse"));

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                Log.Debug("Nurse created");
            }
            else
            {
                Log.Debug("Nurse already exists");
            }
            
            var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            
            var bob = userMgr.FindByNameAsync("bob").Result;
            if (bob != null)
            {
                await userMgr.AddToRoleAsync(bob, "Nurse");
            }

            var alice = userMgr.FindByNameAsync("alice").Result;
            if (alice != null)
            {
                await userMgr.AddToRoleAsync(alice, "Doctor");
            }
        }
    }
}