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
    <div className=" bg-white shadow-lg rounded p-4">
      <img
        src={imageUrl}
        alt={venue.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{venue.name}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {venue.description || "No description available."}
      </p>
    </div>
  );
};

