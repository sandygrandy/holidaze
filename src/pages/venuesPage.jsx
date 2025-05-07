import VenueCard from "../components/venueCard.jsx";

function VenuesPage() {
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

      <div className="grid grid-cols-2">
        <div className="max-w-[375px]">
          <div className="bg-white shadow-lg w-[375px] h-[600px] flex flex-col gap-4 p-4">
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

        <VenueCard />
      </div>
    </div>
  );
}

export default VenuesPage;
