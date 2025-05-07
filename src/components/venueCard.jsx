import { fetchVenues } from "../api/venuesApi";

function VenueCard() {
    
    fetchVenues()
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error fetching venues:", error);
        });
        
    return (
        <div className="bg-white shadow-md flex flex-row gap-4 items-center max-h-[500px] max-w-[750px]">
            <div>
                <img src="#" 
                alt="Venue" 
                className="object-cover rounded-t-lg w-[400px] h-[400px]" />
            </div>
            <div className="flex flex-col p-4 gap-6">
                <h5>Venue title</h5>
                <p>Rating:</p>
                <p>Location:</p>
                <button className="primary-button-dark">View</button>
            </div>
        </div>
    )
}

export default VenueCard;