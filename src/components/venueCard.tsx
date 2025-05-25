import { Venue } from "../api/venuesApi";
import React from "react";

interface Props {
  venue: Venue;
}

export const VenueCard: React.FC<Props> = ({ venue }) => {
  const imageUrl =
    venue.media?.[0]?.url ||
    "https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk=";

  return (
    <div className=" bg-white shadow-lg rounded p-5 flex flex-col sm:flex-row items-start gap-4 lg:gap-10 lg:items-center lg:flex-row w-[85vw]">
      <div className="m-auto sm:m-0">
        <img
          src={imageUrl}
          alt={venue.name}
          className="h-[20vh] sm:w-[40vw] sm:h-[30vh] lg:w-[40vw] object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col overflow-hidden text-woody-wine gap-2 m-auto lg:m-0">
        <h3 className="text-lg font-bold mt-2">{venue.name}</h3>
        <p className="text-small-p mt-1">
          Location: {venue.location?.address}, {venue.location?.city},{" "}
          {venue.location?.country}
        </p>
        <p className="text-small-p mt-1">
          Max Guests: {venue.maxGuests}
        </p>
        <p className="text-small-p mt-1">Rating: {venue.rating}</p>
        <p className="text-medium-p  underline">Price: {venue.price}kr</p>
        <button 
          onClick={() => window.location.href = `/venue/${venue.id}`}
          className="primary-button-dark w-[150px]">
          View more
        </button>
      </div>
    </div>
  );
};
