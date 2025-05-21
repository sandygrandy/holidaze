import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getAccessToken from "../helpers/token";
import { API_KEY } from "../api/API_KEY.mjs";
import { defaultVenueDetails } from "../helpers/venueDetails";

function SingleVenuePage() {
  let { id } = useParams();
  const token = getAccessToken();
  const [venueDetails, setVenueDetails] = useState(defaultVenueDetails);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": API_KEY,
            },
          }
        );
        if (response.ok) {
          const res = await response.json();
          setVenueDetails(res.data);
        } else {
          console.error("Failed to fetch venue details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (id) {
      fetchVenueDetails();
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

  console.log(venueDetails);

  return (
    <div className="text-woody-wine">
      <h1 className="text-center py-15">{venueDetails.name}</h1>
      <div className="flex flex-row justify-evenly items-center py-10 px-wrapper">
        <p className="text-medium-p">
          Stars: {venueDetails.rating}
        </p>
        <p className="text-medium-p">
          Max guests: {venueDetails.maxGuests}
        </p>
        <p className="text-medium-p">
          Location: {venueDetails.location.country}
        </p>
        <p className="text-medium-p">
          Starting price: {venueDetails.price}
        </p>
      </div>
      <div className="flex flex-col justify-center px-wrapper">
        <div className="flex flex-row w-full justify-center items-center">
          <div className="px-10">
            <img
              src="/src/icons/left-arrow.png"
              alt="Arrow right"
              className="h-icon-size cursor-pointer"
              onClick={handlePrev}
            />
          </div>
          <div>
            <img
              src={images[currentIndex]?.url}
              alt={images[currentIndex]?.alt || "Venue image"}
              className="w-[70vw] h-[500px] object-cover shadow-lg"
            />
          </div>
          <div className="px-10">
            <img
              src="/src/icons/right-arrow.png"
              alt="Arrow right"
              className="h-icon-size cursor-pointer"
              onClick={handleNext}
            />
          </div>
        </div>
        <div className="px-wrapper">
          <p className="px-wrapper py-15 text-center">
            {venueDetails.description}
          </p>
        </div>
        <div className="flex flex-row justify-evenly px-wrapper">
          <div className="flex flex-col gap-4 items-center py-10">
            <h3>Features</h3>
            <p>Breakfast: {venueDetails.meta.breakfast ? "Included" : "Not included"}</p>
            <p>Parking : {venueDetails.meta.parking ? "Available" : "Not available"}</p>
            <p>Wifi: {venueDetails.meta.wifi ? "Included" : "Not available"}</p>
            <p>Pets: {venueDetails.meta.pets ? "Allowed" : "Not allowed"}</p>
          </div>
          <div className="flex flex-col gap-4 items-center py-10">
            <h3>Location</h3>
            <p>{venueDetails.location.address}</p>
            <p>{venueDetails.location.country}</p>
            <p>{venueDetails.location.city}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-10">
            <button className="primary-button-dark w-1/3">Book now!</button>
        </div>
      </div>
    </div>
  );
}

export default SingleVenuePage;
