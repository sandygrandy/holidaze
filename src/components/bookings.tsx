import React from "react";
import { useState } from "react";
import { Booking } from "../api/bookingsApi";

type BookingListDropDownProps = {
  booking: Booking;
};
function BookingListDropDown({ booking }: BookingListDropDownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-1/2 m-auto">
      <div className="flex flex-row items-center py-5 justify-evenly bg-white">
        <h5>{booking.venue?.name}</h5>
        <p>
          Dates: {booking.dateFrom} - {booking.dateTo}
        </p>
        <button onClick={() => setOpen((prev) => !prev)}>
          <img src="#" alt="dropdown" />
        </button>
      </div>
      {open && (
        <div className="flex flex-row justify-evenly items-center p-5">
          <div>
            <p>Guests: {booking.guests}</p>
            <p>Booking created: {booking.created}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="secondary-button-dark">Edit Booking</button>
            <button className="primary-button-dark">Delete Booking</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingListDropDown;
