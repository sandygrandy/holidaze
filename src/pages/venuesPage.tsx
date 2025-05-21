import React, { useEffect, useState } from "react";
import { VenueCard } from "../components/venueCard";
import { Venue } from "../api/venuesApi";

function VenuesPage() {

  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues?sort=created&sortOrder=desc"
        );
        const res = await response.json();
        if (Array.isArray(res.data)) {
          setVenues(res.data);
        } else {
          setError("Unexpected response format.");
          console.error("An error occured:", res.data);
        }
      } catch (err) {
        setError("Failed to fetch venues.");
        console.error(err);
      }
    };

    fetchVenues();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredVenues = venues.filter(
    (venue) =>
      (venue.name?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
      (venue.location?.address?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-wrapper pb-wrapper">
      <div className="venues-search-bar flex flex-row items-center justify-between">
        <div className="pl-">
          <h1>Venues</h1>
        </div>
        <div className="items-baseline-last">
          <input
            type="text"
            placeholder="Search..."
            className="w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-start">
        <div className="max-w-[350px] min-w-[276px] sticky top-25">
          <div className="bg-white shadow-lg flex flex-col gap-4 p-4">
            <h3>Filter</h3>
            <div>
              <p className="text-medium-p">Price range</p>
              <div className="flex flex-row gap-4 pb-6 items-center">
                <p>Min</p>
                <input
                  type="text"
                  placeholder="Min"
                  className="w-15 h-8 rounded mr-5"
                ></input>
                <p>Max</p>
                <input
                  type="text"
                  placeholder="Max"
                  className="w-15 h-8 rounded"
                ></input>
              </div>
              <div>
                <p className="text-medium-p">Guest capacity</p>
                <div className="flex flex-row gap-4 pb-6 items-center">
                  <p>Min</p>
                  <input
                    type="text"
                    placeholder="Min"
                    className="w-15 h-8 rounded mr-5"
                  ></input>
                  <p>Max</p>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-15 h-8 rounded"
                  ></input>
                </div>
                <div className="flex flex-col gap-2 pb-6">
                  <p className="text-medium-p">Rating</p>
                  <div>
                    <input type="checkbox" value="1" />
                    <label> 1-star</label>
                  </div>
                  <div>
                    <input type="checkbox" value="2" />
                    <label> 2-star</label>
                  </div>
                  <div>
                    <input type="checkbox" value="3" />
                    <label> 3-star</label>
                  </div>
                  <div>
                    <input type="checkbox" value="4" />
                    <label> 4-star</label>
                  </div>
                  <div>
                    <input type="checkbox" value="5" />
                    <label> 5-star</label>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pb-6">
                  <p className="text-medium-p">Services</p>
                  <div>
                    <input type="checkbox" value="Breakfast" />
                    <label>Breakfast</label>
                  </div>
                  <div>
                    <input type="checkbox" value="parking" />
                    <label>Parking</label>
                  </div>
                  <div>
                    <input type="checkbox" value="wifi" />
                    <label>Wifi</label>
                  </div>
                  <div>
                    <input type="checkbox" value="Pets allowed" />
                    <label>Pets allowed</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="p-6 col-span-2">
        <div className="flex flex-col gap-4">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
      </div>

    </div>
  );
}

export default VenuesPage;
