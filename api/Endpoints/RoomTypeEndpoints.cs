using Microsoft.AspNetCore.Routing;
using Npgsql;

namespace Ecommerce.Api.Endpoints;

public static class RoomTypeEndpoints
{
    public static IEndpointRouteBuilder MapRoomTypeEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/room-types", GetRoomTypes);
        return endpoints;
    }

    private static async Task<IResult> GetRoomTypes(
        NpgsqlDataSource dataSource,
        CancellationToken cancellationToken
    )
    {
        await using var conn = await dataSource.OpenConnectionAsync(cancellationToken);
        await using var cmd = new NpgsqlCommand(
            "SELECT id, price, bed_number, image_url, type_name, available_rooms_number " +
            "FROM room_types ORDER BY id LIMIT 4;",
            conn
        );
        await using var reader = await cmd.ExecuteReaderAsync(cancellationToken);

        var roomTypes = new List<RoomTypeRow>();
        while (await reader.ReadAsync(cancellationToken))
        {
            roomTypes.Add(new RoomTypeRow(
                reader.GetInt32(0),
                reader.GetDecimal(1),
                reader.GetInt32(2),
                reader.GetString(3),
                reader.GetString(4),
                reader.GetInt32(5)
            ));
        }

        return Results.Ok(roomTypes);
    }

    private sealed record RoomTypeRow(
        int Id,
        decimal Price,
        int BedNumber,
        string ImageUrl,
        string TypeName,
        int AvailableRoomsNumber
    );
}
