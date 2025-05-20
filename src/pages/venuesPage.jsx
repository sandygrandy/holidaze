import React, { useEffect, useState } from "react";
import { VenueCard } from "../components/venueCard";

function VenuesPage() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues?sort=created&sortOrder=desc"
        );
        const data = await response.json();
        setVenues(data.data);
      } catch (err) {
        setError("Failed to fetch venues.");
        console.error(err);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="px-wrapper pb-wrapper">
      <div className="venues-search-bar flex flex-row items-center justify-between">
        <div>
          <h2>Venues</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-300 px-5 py-3 m-5 rounded shadow-md"
          />
          <button type="submit" className="primary-button-dark shadow-md">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="max-w-[375px]">
          <div className="bg-white shadow-lg w-auto h-auto flex flex-col gap-4 p-4">
            <h5>Filter</h5>
            <div>
              <p>Price range</p>
              <div className="flex flex-row gap-4 pb-6">
                <p>Min</p>
                <input
                  type="text"
                  placeholder="Min"
                  className="bg-gray-200 w-[60px] rounded mr-5"
                ></input>
                <p>Max</p>
                <input
                  type="text"
                  placeholder="Max"
                  className="bg-gray-200 w-[60px] rounded"
                ></input>
              </div>
              <div>
                <p>Guest capacity</p>
                <div className="flex flex-row gap-4 pb-6">
                  <p>Min</p>
                  <input
                    type="text"
                    placeholder="Min"
                    className="bg-gray-200 w-[60px] rounded mr-5"
                  ></input>
                  <p>Max</p>
                  <input
                    type="text"
                    placeholder="Max"
                    className="bg-gray-200 w-[60px] rounded"
                  ></input>
                </div>
                <div className="flex flex-col gap-2 pb-6">
                  <p>Rating</p>
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
                  <p>Services</p>
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
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
      </div>

    </div>
  );
}

export default VenuesPage;
