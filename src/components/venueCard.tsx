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
    <div className=" bg-white shadow-lg rounded p-4 flex flex-row gap-5">
      <div>
        <img
          src={imageUrl}
          alt={venue.name}
          className="h-[300px] w-[500px] object-cover rounded"
        />
      </div>
      <div className="flex flex-col justify-around">
        <h2 className="text-lg font-bold mt-2">{venue.name}</h2>
        <p className="text-sm mt-1 text-woody-wine">
          Location: {venue.location?.address}, {venue.location?.city},{" "}
          {venue.location?.country}
        </p>
        <p className="text-sm mt-1 text-woody-wine">
          Max Guests: {venue.maxGuests}
        </p>
        <p className="text-sm mt-1 text-woody-wine">Rating: {venue.rating}</p>
        <p className="text-medium-p  text-woody-wine underline">Price: {venue.price}kr</p>
        <button 
          onClick={() => window.location.href = `/venue/${venue.id}`}
          className="primary-button-dark w-[150px]">
          View more
        </button>
      </div>
    </div>
  );
};
