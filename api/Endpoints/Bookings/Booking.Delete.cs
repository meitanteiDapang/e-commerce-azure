using Ecommerce.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Api.Endpoints;

public static partial class BookingEndpoints
{
    private static async Task<IResult> DeleteBookings(
        AppDbContext db,
        int? bookingId,
        CancellationToken cancellationToken = default
        )
    {
        if (!bookingId.HasValue || bookingId <= 0)
        {
            return Results.BadRequest(new { message = "bookingId is required." });
        }

        var deleted = await db.Bookings
            .Where(booking => booking.Id == bookingId.Value)
            .ExecuteDeleteAsync(cancellationToken);

        if (deleted == 0)
        {
            return Results.NotFound(new { message = "Booking not found." });
        }

        return Results.NoContent();
    }
}
