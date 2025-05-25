import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { defaultVenueDetails } from "../helpers/venueDetails";
import BookingForm from "../components/bookingForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchVenueById } from "../api/venuesApi";


function SingleVenuePage() {
  let { id } = useParams();
  const [venueDetails, setVenueDetails] = useState(defaultVenueDetails);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchVenueById(id, true)
        .then((response) => {
          if (response) {
            setVenueDetails(response.data);
          } else {
            console.error("Failed to fetch venue details");
          }
        })
        .catch((error) => {
          console.error("Error fetching venue details:", error);
        }
    );
    }
  }, [id]);

  const images = venueDetails.media || [];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (!venueDetails.id)
    return <div className="text-center my-80">Loading venues...</div>;

  return (
    <div className="text-woody-wine px-5 lg:px-wrapper">
      <h1 className="text-center pt-10 pb-5">{venueDetails.name}</h1>
      <div className="flex flex-col sm:flex-row justify-evenly items-center py-5">
        <p className="text-medium-p">Stars: {venueDetails.rating}</p>
        <p className="text-medium-p">Max guests: {venueDetails.maxGuests}</p>
        <p className="text-medium-p">
          Location: {venueDetails.location?.country}
        </p>
        <p className="text-medium-p">Starting price: {venueDetails.price}</p>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-center items-center">
          <div className="px-2 md:px-10">
            <img
              src="/icons/left-arrow.png"
              alt="Arrow right"
              className="h-icon-size-mobile lg:h-icon-size cursor-pointer"
              onClick={handlePrev}
            />
          </div>
          <div>
            <img
              src={images[currentIndex]?.url}
              alt={images[currentIndex]?.alt || "Venue image"}
              className="w-[70vw] h-[20vh] sm:h-[30vh] md:w-[70vw] md:h-[50vh] object-cover shadow-lg rounded-lg "
            />
          </div>
          <div className="px-2 md:px-10">
            <img
              src="/icons/right-arrow.png"
              alt="Arrow right"
              className="h-icon-size-mobile lg:h-icon-size cursor-pointer"
              onClick={handleNext}
            />
          </div>
        </div>
        <div>
          <p className="lg:px-wrapper pt-10 pb-5 lg:py-15 text-center">
            {venueDetails.description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly lg:px-wrapper items-center">
          <div className="flex flex-col gap-4 items-center pt-5">
            <h3>Features</h3>
            <p>
              Breakfast:{" "}
              {venueDetails.meta?.breakfast ? "Included" : "Not included"}
            </p>
            <p>
              Parking :{" "}
              {venueDetails.meta?.parking ? "Available" : "Not available"}
            </p>
            <p>Wifi: {venueDetails.meta?.wifi ? "Included" : "Not available"}</p>
            <p>Pets: {venueDetails.meta?.pets ? "Allowed" : "Not allowed"}</p>
          </div>
          <div className="flex flex-col gap-4 items-center pt-5">
            <h3>Location</h3>
            <p>{venueDetails.location?.address}</p>
            <p>{venueDetails.location?.country}</p>
            <p>{venueDetails.location?.city}</p>
          </div>
        <div className="flex flex-col justify-center items-center py-5 lg:py-10">
          <h3>Book your stay</h3>
          <BookingForm
            venueId={id}
            onBookingCreated={(booking) => {
              toast.success(
                `Booking confirmed! Check your email for details.`,
                {
                  position: "top-center",
                  autoClose: 3000,
                }
              );

              console.log("Booking created:", booking);
              setTimeout(() => navigate("/"), 3000);
            }}
            existingBookings={venueDetails.bookings || []}
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default SingleVenuePage;
