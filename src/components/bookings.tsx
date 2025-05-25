import React from "react";
import { useState } from "react";
import { Booking } from "../api/bookingsApi";
import { formatDateRange, formatDate } from "../helpers/dateFormatter";
import { deleteBooking } from "../api/bookingsApi";


type BookingCardProps = {
  booking: Booking;
};

function BookingCard({ booking }: BookingCardProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = (booking: Booking) => async () => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(booking.id);
        window.location.reload(); // Reload the page to reflect changes
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 m-auto mb-2 rounded shadow-md">
      <div className="flex flex-row items-center py-5 justify-evenly bg-white">
        <div>
        <h5>{booking.venue?.name}</h5>
        <p>
          Dates: {formatDateRange(booking.dateFrom, booking.dateTo)}
        </p>
        </div>
        <div>
        <button onClick={() => setOpen((prev) => !prev)}>
          <img 
          src="../src/icons/arrow-down.png" 
          className={`w-5 h-5 ${open ? "rotate-180" : ""}`}
          alt="dropdown" />
        </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-row justify-evenly items-center p-5">
          <div>
            <p>Guests: {booking.guests}</p>
            <p>Booking created: {formatDate(booking.created)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="secondary-button-dark">Edit Booking</button>
            <button onClick={handleDelete(booking)}
            className="primary-button-dark">Delete Booking</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingCard;
