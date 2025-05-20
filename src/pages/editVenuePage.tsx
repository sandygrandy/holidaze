import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../api/API_KEY.mjs";
import { defaultVenueDetails } from "../helpers/venueDetails";
import getAccessToken from "../helpers/token";

function EditVenue() {
  let { id } = useParams();
  const token = getAccessToken();
  const [venueDetails, setVenueDetails] = useState(defaultVenueDetails);
  const navigate = useNavigate();

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

  if (!venueDetails.id)
    return <div className="text-center my-80">Loading venues...</div>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVenueDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "capacity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${venueDetails.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": API_KEY,
          },
          body: JSON.stringify(venueDetails),
        }
      );

      if (response.ok) {
        navigate("/venues");
      } else {
        console.error("Failed to update venue");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveMedia = (index: number) => {
    setVenueDetails((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="venue-details-form">
      <h2 className="mb-4 text-center">Edit Venue</h2>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Venue</legend>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Venue Name"
          value={venueDetails.name}
          onChange={handleInputChange}
          className="w-full mb-3"
          required
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={venueDetails.description}
          onChange={handleInputChange}
          className="w-full h-44"
        />
      </fieldset>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Media</legend>
        <div className="space-y-3 mt-2">
          {Array.isArray(venueDetails.media) &&
            venueDetails.media.map((m, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-2 items-center"
              >
                <input
                  type="url"
                  name={`media.url.${index}`}
                  placeholder="Image URL"
                  value={m.url}
                  onChange={(e) => {
                    const value = e.target.value;
                    setVenueDetails((prev) => {
                      const media = [...prev.media];
                      media[index].url = value;
                      return { ...prev, media };
                    });
                  }}
                />
                <input
                  name={`media.alt.${index}`}
                  placeholder="Alt text"
                  value={m.alt}
                  onChange={(e) => {
                    const value = e.target.value;
                    setVenueDetails((prev) => {
                      const media = [...prev.media];
                      media[index].alt = value;
                      return { ...prev, media };
                    });
                  }}
                />
                {venueDetails.media.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(index)}
                    className="text-red-600 hover:text-red-800 px-2 py-1 rounded border border-red-300 bg-red-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setVenueDetails((prev) => ({
              ...prev,
              media: [...prev.media, { url: "", alt: "" }],
            }))
          }
          className="mt-3 text-blue-600 hover:text-blue-800 px-2 py-1 rounded border border-blue-300 bg-blue-50"
        >
          Add Media
        </button>
      </fieldset>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Details</legend>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={venueDetails.price}
          onChange={handleInputChange}
          className="w-full"
          min={0}
          max={10000}
          step={1}
          required
        />
        <label htmlFor="maxGuests">Max Guests</label>
        <input
          type="number"
          id="maxGuests"
          name="maxGuests"
          value={venueDetails.maxGuests}
          onChange={handleInputChange}
          className="mt-1 block w-full"
          min={0}
          max={100}
          step={1}
          required
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={venueDetails.rating}
          onChange={handleInputChange}
          className="mt-1 block w-full"
          min={0}
          max={5}
          step={1}
          required
        />
      </fieldset>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Facilities</legend>
        <div className="flex flex-wrap gap-4 mt-2">
          {["wifi", "parking", "breakfast", "pets"].map((metaKey) => (
            <div key={metaKey} className="flex items-center">
              <input
                type="checkbox"
                id={metaKey}
                name={metaKey}
                checked={venueDetails.meta[metaKey]}
                onChange={(e) =>
                  setVenueDetails((prevDetails) => ({
                    ...prevDetails,
                    meta: {
                      ...prevDetails.meta,
                      [metaKey]: e.target.checked,
                    },
                  }))
                }
                className="h-4 w-4 "
              />
              <label htmlFor={metaKey} className="ml-2 text-sm text-gray-700">
                {metaKey.charAt(0).toUpperCase() + metaKey.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Location</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <input
            type="text"
            id="address"
            name="address"
            value={venueDetails.location?.address}
            placeholder="Address"
            onChange={(e) =>
              setVenueDetails((prevDetails) => ({
                ...prevDetails,
                location: { ...prevDetails.location, address: e.target.value },
              }))
            }
            className="mt-1 block w-full "
            required
          />
          <input
            type="text"
            id="city"
            name="city"
            value={venueDetails.location?.city}
            placeholder="City"
            onChange={(e) =>
              setVenueDetails((prevDetails) => ({
                ...prevDetails,
                location: { ...prevDetails.location, city: e.target.value },
              }))
            }
            className="mt-1 block w-full "
            required
          />
          <input
            type="text"
            id="zip"
            name="zip"
            value={venueDetails.location?.zip}
            placeholder="Zip Code"
            onChange={(e) =>
              setVenueDetails((prevDetails) => ({
                ...prevDetails,
                location: { ...prevDetails.location, zip: e.target.value },
              }))
            }
            className="mt-1 block w-full "
            required
          />
          <input
            type="text"
            id="country"
            name="country"
            value={venueDetails.location?.country}
            placeholder="Country"
            onChange={(e) =>
              setVenueDetails((prevDetails) => ({
                ...prevDetails,
                location: { ...prevDetails.location, country: e.target.value },
              }))
            }
            className="mt-1 block w-full"
            required
          />
          <input
            type="text"
            id="continent"
            name="continent"
            value={venueDetails.location?.continent}
            placeholder="Continent"
            onChange={(e) =>
              setVenueDetails((prevDetails) => ({
                ...prevDetails,
                location: {
                  ...prevDetails.location,
                  continent: e.target.value,
                },
              }))
            }
            className="mt-1 block w-full "
            required
          />
        </div>
      </fieldset>
      <div>
        <button type="submit" className="w-full primary-button-dark py-2 px-4">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditVenue;
