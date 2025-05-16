import React from "react";
import { useState } from "react";
import { API_KEY } from "../api/API_KEY.mjs";

function CreateVenue() {

  const userData = localStorage.getItem("user");
  JSON.parse(userData!);
  const token = userData ? JSON.parse(userData).accessToken : null;

  const [form, setForm] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (name.startsWith("meta.")) {
      setForm((prev) => ({
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
      setForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name.split(".")[1]]: type === "number" ? Number(value) : value,
        },
      }));
    } else if (name.startsWith("media.")) {
      const [_, field, idx] = name.split(".");
      setForm((prev) => {
        const media = [...prev.media];
        media[Number(idx)][field] = value;
        return { ...prev, media };
      });
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };


  const handleRemoveMedia = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== idx),
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
          "Authorization": `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create venue");
      setSuccess(true);
      setForm({
        name: "",
        description: "",
        media: [{ url: "", alt: "" }],
        price: 0,
        maxGuests: 0,
        rating: 0,
        meta: {
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false,
        },
        location: {
          address: "",
          city: "",
          zip: "",
          country: "",
          continent: "",
          lat: 0,
          lng: 0,
        },
      });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6 my-10"
    >
      <h2 className="text-2xl mb-4 text-center">Create Venue</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <label htmlFor="price">Price</label>
      <input
        name="price"
        id="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        min={0}
        max={10000}
        step={1}
        required
        className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <label htmlFor="maxGuests">Max guests</label>
      <input
        name="maxGuests"
        id="maxGuests"
        type="number"
        placeholder="Max Guests"
        value={form.maxGuests}
        onChange={handleChange}
        min={0}
        max={100}
        step={1}
        required
        className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <label htmlFor="rating">Rating</label>
      <input
        name="rating"
        id="rating"
        type="number"
        placeholder="Rating"
        value={form.rating}
        onChange={handleChange}
        required
        min={0}
        max={5}
        step={1}
        className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Features</legend>
        <div className="flex flex-wrap gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="meta.wifi"
              checked={form.meta.wifi}
              onChange={handleChange}
              className="accent-blue-500"
            />
            Wifi
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="meta.parking"
              checked={form.meta.parking}
              onChange={handleChange}
              className="accent-blue-500"
            />
            Parking
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="meta.breakfast"
              checked={form.meta.breakfast}
              onChange={handleChange}
              className="accent-blue-500"
            />
            Breakfast
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="meta.pets"
              checked={form.meta.pets}
              onChange={handleChange}
              className="accent-blue-500"
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
            value={form.location.address}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="location.city"
            placeholder="City"
            value={form.location.city}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="location.zip"
            placeholder="Zip"
            value={form.location.zip}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="location.country"
            placeholder="Country"
            value={form.location.country}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="location.continent"
            placeholder="Continent"
            value={form.location.continent}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </fieldset>
      <fieldset className="border rounded px-4 py-3 mb-2">
        <legend className="font-semibold">Media</legend>
        <div className="space-y-3 mt-2">
          {form.media.map((m, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-2 items-center"
            >
              <input
                name={`media.url.${idx}`}
                placeholder="Image URL"
                value={m.url}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm((prev) => {
                    const media = [...prev.media];
                    media[idx].url = value;
                    return { ...prev, media };
                  });
                }}
                className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                name={`media.alt.${idx}`}
                placeholder="Alt text"
                value={m.alt}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm((prev) => {
                    const media = [...prev.media];
                    media[idx].alt = value;
                    return { ...prev, media };
                  });
                }}
                className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {form.media.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(idx)}
                  className="text-red-600 hover:text-red-800 px-2 py-1 rounded border border-red-300 bg-red-50"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
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
