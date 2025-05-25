import React, { use, useState } from "react";
import { createBooking } from "../api/bookingsApi";
import { Booking } from "../api/bookingsApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  venueId: string | undefined;
  onBookingCreated: (booking: Booking) => void;
  existingBookings: Booking[] | null;
}



const BookingForm: React.FC<BookingFormProps> = ({
  venueId,
  onBookingCreated,
  existingBookings
}) => {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateFrom || !dateTo || !guests || !venueId) {
      setError("All fields are required.");
      return;
    }

    interface BookingInput {
      dateFrom: string;
      dateTo: string;
      guests: number;
      venueId: string | undefined;
    }

    const bookingData: BookingInput = {
      dateFrom: dateFrom?.toISOString() || "",
      dateTo: dateTo?.toString() || "",
      guests,
      venueId,
    };

    try {
      const response = await createBooking(
        bookingData as unknown as Booking
      );
      if (response) {
        onBookingCreated(response.data);
        setError("");
        setDateFrom(null);
        setDateTo(null);
        setGuests(1);
      } else {
        setError("Failed to create booking.");
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("An error occurred while creating the booking.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-5 bg-white rounded shadow-md"
    >
      <DatePicker
        selected={dateFrom}
        placeholderText=" Date from:"
        showIcon
        onChange={(date: Date | null) => setDateFrom(date)}
        minDate={new Date()}
        excludeDateIntervals={existingBookings?.map((booking) => {
            return {
              start: new Date(booking.dateFrom),
              end: new Date(booking.dateTo),
            };
          })}
      />
      <DatePicker
        selected={dateTo}
        placeholderText=" Date To:"
        showIcon
        onChange={(date: Date | null) => setDateTo(date)}
        minDate={dateFrom ? new Date(dateFrom.getTime() + 24 * 60 * 60 * 1000) : new Date()}
        excludeDateIntervals={existingBookings?.map((booking) => {
          return {
            start: new Date(booking.dateFrom),
            end: new Date(booking.dateTo),
          };
        })}
      />
      <label htmlFor="guests">Guests:</label>
      <input
        type="number"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        placeholder="Guests"
        min="1"
      />

      <button type="submit" className="secondary-button-dark">
        Create Booking
      </button>
    </form>
  );
};

export default BookingForm;
