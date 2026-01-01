using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Ecommerce.Api.Admin;

public static class CheckAdminTokenEndpoints
{
    public static IEndpointRouteBuilder MapCheckAdminTokenEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/admin/checkAdminToken", GetCheckAdminToken)
            .RequireAuthorization(new AuthorizeAttribute { Roles = "admin" });
        return endpoints;
    }

    private static IResult GetCheckAdminToken()
    {
        return Results.Ok(new
        {
            message = "happy"
        });
    }
}
