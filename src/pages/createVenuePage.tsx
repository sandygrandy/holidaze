import React from "react";
import { useState } from "react";
import { API_KEY } from "../api/API_KEY.mjs";
import getAccessToken from "../helpers/token";
import { defaultVenueDetails } from "../helpers/venueDetails";

function CreateVenue() {
  const token = getAccessToken();
  const [venueDetails, setVenueDetails] = useState(defaultVenueDetails);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (name.startsWith("meta.")) {
      setVenueDetails((prev) => ({
        ...prev,
        meta: {
          ...prev.meta,
          [name.split(".")[1]]:
            type === "checkbox" && e.target instanceof HTMLInputElement
              ? e.target.checked
              : value,
        },
      }));
    } else if (name.startsWith("location.")) {
      setVenueDetails((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name.split(".")[1]]: type === "number" ? Number(value) : value,
        },
      }));
    } else if (name.startsWith("media.")) {
      const [_, field, index] = name.split(".");
      setVenueDetails((prev) => {
        const media = [...prev.media];
        media[Number(index)][field] = value;
        return { ...prev, media };
      });
    } else {
      setVenueDetails((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleRemoveMedia = (index: number) => {
    setVenueDetails((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(venueDetails),
      });
      if (!res.ok) throw new Error("Failed to create venue");
      setSuccess(true);
      setVenueDetails(defaultVenueDetails);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="venue-details-form">
      <h2 className="mb-4 text-center">Create Venue</h2>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Venue</legend>
        <input
          name="name"
          placeholder="Name"
          value={venueDetails.name}
          onChange={handleChange}
          required
          className="w-full mb-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={venueDetails.description}
          onChange={handleChange}
          required
          className="w-full h-44"
        />
      </fieldset>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Media</legend>
        <div className="space-y-3 mt-2">
          {Array.isArray(venueDetails.media) && venueDetails.media.map((m, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-2 items-center"
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
          name="price"
          id="price"
          type="number"
          value={venueDetails.price}
          onChange={handleChange}
          min={0}
          max={10000}
          step={1}
          required
          className="w-full"
        />
        <label htmlFor="maxGuests">Max guests</label>
        <input
          name="maxGuests"
          id="maxGuests"
          type="number"
          value={venueDetails.maxGuests}
          onChange={handleChange}
          min={0}
          max={100}
          step={1}
          required
          className="w-full"
        />
        <label htmlFor="rating">Rating</label>
        <input
          name="rating"
          id="rating"
          type="number"
          value={venueDetails.rating}
          onChange={handleChange}
          required
          min={0}
          max={5}
          step={1}
          className="w-full"
        />
      </fieldset>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Facilities</legend>
        <div className="flex flex-wrap gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="meta.wifi"
              checked={venueDetails.meta.wifi}
              onChange={handleChange}
            />
            Wifi
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="meta.parking"
              checked={venueDetails.meta.parking}
              onChange={handleChange}
            />
            Parking
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="meta.breakfast"
              checked={venueDetails.meta.breakfast}
              onChange={handleChange}
            />
            Breakfast
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="meta.pets"
              checked={venueDetails.meta.pets}
              onChange={handleChange}
            />
            Pets
          </label>
        </div>
      </fieldset>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Location</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <input
            name="location.address"
            placeholder="Address"
            value={venueDetails.location.address}
            onChange={handleChange}
            className=""
          />
          <input
            name="location.city"
            placeholder="City"
            value={venueDetails.location.city}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="location.zip"
            placeholder="Zip"
            value={venueDetails.location.zip}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="location.country"
            placeholder="Country"
            value={venueDetails.location.country}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="location.continent"
            placeholder="Continent"
            value={venueDetails.location.continent}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={loading}
        className="primary-button-dark w-full text-center"
      >
        {loading ? "Creating..." : "Create Venue"}
      </button>
      {error && (
        <div className="text-red-600 text-center font-medium">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-center font-medium">
          Venue created!
        </div>
      )}
    </form>
  );
}

export default CreateVenue;
