import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchBookingsAtVenue } from "../api/bookingsApi";
import { Booking } from "../api/bookingsApi";
import { formatDateRange } from "../helpers/dateFormatter";
import { deleteVenue, fetchVenuesByProfile, Venue } from "../api/venuesApi";

function ManagerVenuesView() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedVenueBookings, setSelectedVenueBookings] = useState<Booking[]>(
    []
  );
  const [selectedVenueName, setSelectedVenueName] = useState<string>("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.name;

  useEffect(() => {
    async function fetchVenues() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchVenuesByProfile(name)
        setVenues(result.data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    if (name) fetchVenues();
  }, [name]);

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      await deleteVenue(id);
      setVenues((prev) => prev.filter((v) => v.id !== id));
      toast.success("Venue deleted successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  }

  async function handleBookings(id: string, venueName: string) {
    try {
      const bookings = await fetchBookingsAtVenue(id);
      if (!bookings) throw new Error("No bookings found for this venue");
      setSelectedVenueBookings(bookings);
      setSelectedVenueName(venueName);
      setOverlayVisible(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch bookings");
    }
  }

  if (!name) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-woody-wine text-4xl font-bold mb-4">
          Not logged in
        </h1>
        <p className="text-gray-600">Please log in to manage your venues.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-woody-wine text-4xl font-bold my-8">Your Venues</h1>
      {loading && <p>Loading venues...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && venues.length === 0 && (
        <p className="text-gray-600">You have no venues yet.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white rounded shadow p-4 flex flex-col"
          >
            <img
              src={venue.media[0]?.url || "https://via.placeholder.com/400x200"}
              alt={venue.media[0]?.alt || venue.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="text-woody-wine text-xl font-semibold mb-3">
              {venue.name}
            </h3>
            <div className="h-24 overflow-hidden">
              <p className="text-woody-wine mb-2 text-small-p line-clamp-3">
                {venue.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-small-p text-woody-wine">
                Price: ${venue.price}
              </span>
              <span className="text-small-p text-woody-wine">
                Guests: {venue.maxGuests}
              </span>
              <span className="text-small-p text-woody-wine">
                Rating: {venue.rating} ⭐
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs mb-3">
              {venue.meta?.wifi && (
                <span className="bg-neutral-50 px-2 rounded">WiFi</span>
              )}
              {venue.meta?.parking && (
                <span className="bg-neutral-50 px-2 rounded">Parking</span>
              )}
              {venue.meta?.breakfast && (
                <span className="bg-neutral-50 px-2 rounded">Breakfast</span>
              )}
              {venue.meta?.pets && (
                <span className="bg-neutral-50 px-2 rounded">Pets</span>
              )}
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  location.href = `/editVenue/${venue.id}`;
                }}
                className="primary-button-dark w-full"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(venue.id)}
                className="secondary-button-dark w-full"
              >
                Delete
              </button>
            </div>
            <button
              className="secondary-button-light mt-2"
              onClick={() => handleBookings(venue.id, venue.name)}
            >
              View {venue._count?.bookings} bookings
            </button>
          </div>
        ))}
        {overlayVisible && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-6 w-[60vw] max-h-[80vh] overflow-y-auto">
              <h2 className="text-woody-wine text-2xl font-bold mb-4">
                Bookings at {selectedVenueName}
              </h2>
              {selectedVenueBookings.length === 0 ? (
                <p className="text-gray-600">No bookings for this venue.</p>
              ) : (
                <ul className="space-y-2">
                  {selectedVenueBookings.map((booking) => (
                    <li key={booking.id} className="border-b pb-2">
                      <p>
                        <strong>Dates:</strong>{" "}
                        {formatDateRange(booking.dateFrom, booking.dateTo)}
                      </p>
                      <p>
                        <strong>Guests:</strong> {booking.guests}
                      </p>
                      <p>
                        <strong>Booked by:</strong> {booking.customer?.name} (
                        {booking.customer?.email})
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => {
                  setOverlayVisible(false);
                  setSelectedVenueBookings([]);
                  setSelectedVenueName("");
                }}
                className="primary-button-dark mt-6 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagerVenuesView;
